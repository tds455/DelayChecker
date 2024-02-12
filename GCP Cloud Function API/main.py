import requests
import functions_framework
import os
import json

def main(request):
    # Validate Request
    if request.method != 'GET':
        return 'Method not allowed', 405

    # Get API key from GCP environment variable
    apikey = os.environ.get("apikey", "")
    # Ensure API key is not empty
    if not apikey:
        return 'API key needs updating', 400
    
    # Extract parameters from original request
    original_params = request.args
    
    # Add apikey to Dictionary
    arguments = {'key': apikey}

    # Add request arguments to Dictionary with apikey
    for item in original_params.items():
        arguments[item[0]] = item[1]

    # Call Aviation Edge API
    response = make_request(arguments)

    # Return response to frontend
    # Add Access-Control-Allow-Origin Header for CORS purposes
    return response.json(), 200, {"Access-Control-Allow-Origin": "*"}

@functions_framework.http
def make_request(parameters):
    url = "https://aviation-edge.com/v2/public/flightsHistory?"
    # Add apikey and parameters to forwarded api request
    response = requests.get(url, params=parameters)
    return response

