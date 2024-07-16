import os
import re
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage

from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

from langchain_anthropic import ChatAnthropic

import json 
load_dotenv()

base_prompt = """You are an AI assistant tasked with analyzing conversations about technology stacks and converting them into a structured JSON format. Follow these guidelines:

1. Listen for mentions of technologies, frameworks, and tools throughout the conversation.

2. Categorize each technology into one of three arrays: "Fast", "Cheap", or "Fast & a tiny bit expensive".

3. For each technology, evaluate and assign values for the following properties:
   - name: The name of the technology (string)
   - performance: Whether it's known for high performance (boolean)
   - easeOfUse: Whether it's considered easy to use (boolean)
   - scalability: Whether it's easily scalable (boolean)
   - ecosystem: Size of its ecosystem (string: "Small", "Moderate", "Large", "Very Large")
   - learningCurve: Difficulty to learn (string: "Low", "Moderate", "High")
   - costEfficiency: Cost-effectiveness (string: "Low", "Moderate", "High", "Very High")

4. If information for a property is not explicitly mentioned, use your knowledge to make a best guess.

5. Structure the output as a JSON object with three arrays: "Fast", "Cheap", and "Fast & a tiny bit expensive".

6. Include at least 3-5 technologies in each category, ensuring a diverse representation of backend, frontend, and database technologies.

Example output structure:

```json
{
  "Fast": [
    { "name": "Node.js", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Large", "learningCurve": "Moderate", "costEfficiency": "High" },
    { "name": "Express.js", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Large", "learningCurve": "Low", "costEfficiency": "High" },
    { "name": "MongoDB", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Large", "learningCurve": "Low", "costEfficiency": "Moderate" }
  ],
  "Cheap": [
    // Similar structure for cheap technologies
  ],
  "Fast & a tiny bit expensive": [
    // Similar structure for fast but slightly more expensive technologies
  ]
}
```"""

# TODO: add this line to prompt - the type of users they are targeting, the type of devices they are targeting, the type of data they are working with, the type of security they need, the type of scalability they need, the type of performance they need

# TODO: implement simple chat history to keep track of the conversation
class LLMChats:
    # store the chat history in memory
    # TODO: implement a way to store the chat history in a database
    store = {}

    def __init__(self):
        self.model = None
        # 
        self.model = ChatOpenAI(
            model="gpt-4o",
            max_tokens=512
        )

        self.modelAnthropic = ChatAnthropic(
            model="claude-3-opus-20240229",
            max_tokens=512
        )

        if os.getenv("MODEL") == "anthropic":
            self.with_message_history = RunnableWithMessageHistory(self.modelAnthropic, self.get_session_history)
        else:
            self.with_message_history = RunnableWithMessageHistory(self.model, self.get_session_history)
    
    def handle_chat_with_history(self: object, prompt: str, sessionId: str = None):
        if sessionId is None:
            return "Session ID is required to use history feature."
        
        print(f"Session ID: {sessionId}")

        if sessionId not in self.store:
            self.store[sessionId] = {"history": ChatMessageHistory(), "profile": {}}

        # example final response
        # ```json\n{\n    \"founder\": {\n        \"developer_skillset\": \"intermediate\",\n        \"programming_language_proficiency\": \"java\",\n        \"budget\": \"high\",\n        \"type_of_project\": \"mobile and web application\"\n    },\n    \"technology_stack\": {\n        \"frontend\": \"react\",\n        \"backend\": \"spring boot\",\n        \"database\": \"postgresql\",\n        \"cloud_provider\": \"aws\",\n        \"mobile\": \"react native\",\n        \"security\": \"jwt\"\n    }\n}\n```

        # To ask another tech stack options
        # Use this prompt --> "give another option of technology stack"
        
        response = self.with_message_history.invoke([
            HumanMessage(content=base_prompt),
            AIMessage(content="sure! let's get started."),
            HumanMessage(content=prompt),
        ], config={"configurable": {"session_id": sessionId}})

        # parsing final answer into a clean json
        if "```json" in response.content:
            try: # try to validate json
                # Regex to find the string between ```json\n and \n```
                pattern = r"```json\n(.+?)\n```"
                match = re.search(pattern, response.content, re.DOTALL)
                cleaned_string = match.group(1)
                jsonObj = json.loads(cleaned_string)
                return json.dumps(jsonObj)
            except:
                return response.content
        
        return response.content

    def get_session_history(self, session_id: str) -> BaseChatMessageHistory:
        return self.store[session_id]["history"] if session_id in self.store else ChatMessageHistory()