
# Create your views here.
# Import the session_data dictionary from consumers
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt

from phase1 import models

import json

@csrf_exempt
def chat_with_history(request):
    if request.method == 'POST':
        llmModels = models.LLMChats()
        data = json.loads(request.body)
        response = llmModels.handle_chat_with_history(data['prompt'], request.headers.get('session_id'))
        return JsonResponse({'response': response})
    else:
        return HttpResponseBadRequest()