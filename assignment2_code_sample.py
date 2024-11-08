import requests
import base64
from cryptography.fernet import Fernet

api_key = 'mysecretkey'

def decrypt(data):
    cipher_suite = Fernet(api_key.encode())
    decrypted_data = cipher_suite.decrypt(data.encode()).decode()
    return decrypted_data

def get_user_data():
    url = f'https://api.example.com/user?key={api_key}'
    response = requests.get(url)
    data = decrypt(response.text)
    return data

def send_data_to_third_party(data):
    url = 'https://third-party.com/receive-data'
    headers = {'Content-Type': 'application/json'}
    requests.post(url, json=data, headers=headers)

if __name__ == '__main__':
    user_data = get_user_data()
    send_data_to_third_party(user_data)
