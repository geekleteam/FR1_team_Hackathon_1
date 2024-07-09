import os
import re
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage

from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

import json 
load_dotenv()

base_prompt = """you are an expert IT consultants, you have been hired by a startup founder to help them with bootstraping their IT infrastructure.
You are tasked to provide a set of options of technologies stack that they should used. You have to ask the founder a series of questions to gather the information you need to provide a solution.
The founder is a non-technical person, so you have to ask the questions in a way that is easy for them to understand. You have to ask the founder about
their developer skillset, programming language proficiency, budget that they have, the type of project they are working on. 

You should ask the questions one by one, and wait for the founder to answer before asking the next question. Each time the founder answers a question, you should store the information in a variable with concise name.

You should start the conversation casually, and ask the founder about their background, their interests, and their goals. Then you can start asking the list of questions above.

If all question has been answered, then you should not response with a text, you must response in a string with a JSON format containing the information you gathered from the founder and second object containing the technology stack that you recommend. If user asked you for another option of technology stack, you should use previous information gathered to provide another option of technology stack and return as JSON format.
with JSON format template as follows:
{
    "founder": {
        "developer_skillset": "beginner",
        "programming_language_proficiency": "python",
        "budget": "low",
        "type_of_project": "web"
    },
    "technology_stack": {
        "frontend": { 
            "framework": "react",
            "programming_language": "javascript",
            "description": "React is a popular frontend framework that is easy to learn and use. It is a good choice for beginner developers."
        },
        "backend": {
            "framework": "django",
            "programming_language": "python",
            "description": "Django is a popular backend framework for Python that is easy to learn and use. It is a good choice for beginner developers."
        },
        "database": { 
            "database_name": "postgresql",
            "database_type": "SQL",
            "description": "PostgreSQL is a popular SQL database that aim for scalability and reliability. It is a good choice for advance developers."
        },
        "cloud_provider": { 
            "provider_name": "aws",
            "description": "AWS is a popular cloud provider that is easy to use and has a lot of features, although be careful with the cost. It is a good choice for beginner developers."
        },
        "security": {
            "framework": "jwt",
            "description": "JWT is a popular security framework that is easy to use and has a lot of features. It is a good choice for beginner developers."
        }
    }
}
"""

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