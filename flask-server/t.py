import requests as r

def signup_request():
    
    payload = {'username':'kyutestpotato','password':'potatoesaremostpowerful'}

    post_response = r.post('http://127.0.0.1:5000/auth/signup', json={'username':'kyutest','password':'potatoesaremostpowerful'})


    return post_response

def login_request():

    payload = {'username':'kyutestpotato','password':'potatoesaremostpowerful'}

    post_response = r.post('http://127.0.0.1:5000/auth/login', json=payload)

    try:
        post_response=post_response.json()
        access_token = post_response['access_token']
        refresh_token = post_response['refresh_token']
        return access_token
    except:
        return post_response


def games_post_request(access_token):
    url = 'http://127.0.0.1:5000/games/games'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }

    # Assuming you need to send some data in the request body, modify the payload accordingly
    payload = {
        'winner': 'w',
        'moves': 'e4.e5/d4.exd4/Qxd4.kc6/Qd1#'
    }

    response = r.post(url, headers=headers, json=payload)

    print("Response Status Code:", response.status_code)
    print("Response Content:")
    print(response.json())  # Assuming the response is in JSON format

def games_get_request(access_token):
    url = 'http://127.0.0.1:5000/games/games'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }

    response = r.get(url, headers=headers)

    print("Response Status Code:", response.status_code)
    # print("Response Content:", response.json())
    return response

signup_request()
token = login_request()
response = games_get_request(token)


