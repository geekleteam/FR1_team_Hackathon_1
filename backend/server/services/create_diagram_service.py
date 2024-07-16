import json
import anthropic


SYSTEM_PROMPT = """
You are system design expert. Your task is to generate microservice architecture following user requirements.
You will receive a list of questions and answers as the system context in JSON format.
[{"question": "<context question>", "answer": "<user desired context>"}]
The architecture might include 
1. UI Clients such as webapp, mobile app for actors
2. API Gateway depending on the complexity of the system
3. Services such as user service, product service, order service, payment service, etc. depending on the functionality
4. Database such as SQL, NoSQL, etc. Think about database for each service or shared database
5. Caching such as Redis, Memcached, etc. 
6. Message broker such as Kafka, RabbitMQ, etc.

Strictly response with the following JSON format:
{
      "nodes": [
        {
          "id": "nodeId",
          "type": "service",
          "position": {
            "x": 0,
            "y": 0
          },
          "data": {
            "icon": "emoji",
            "label": "Node Label"
          },
          "measured": {
            "width": 100,
            "height": 50
          }
        },
        ...
      ],
      "edges": [
        {
          "id": "edgeId",
          "source": "sourceNodeId",
          "target": "targetNodeId"
        },
        ...
      ]
    }

If you cannot generate the architecture due to missing or misleading information, please response with the following JSON format:
{
    "error": "Cannot generate architecture",
    "reason": "<reason>"
}
"""


class CreateDiagramService():
    def __init__(self):
        self.model = 'claude-3-haiku-20240307'
        self.llm = anthropic.Anthropic()

    def generate_diagram(self, requirements, temperture=0):
        client = self.llm
        message = client.messages.create(
            model=self.model,
            max_tokens=2048,
            system=SYSTEM_PROMPT,
            temperature=temperture,
            messages=[
                {
                    "role": "user",
                    "content": [{
                        "type": "text",
                        "text": json.dumps(requirements)
                    }]
                }
            ]
        )
        answer = message.content[0].text
        try:
            json.loads(answer)
        except:
            raise ValueError("Internal server error. Please try again.")
        return answer
