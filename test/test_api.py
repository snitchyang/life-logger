from locust import *


class ApiTaskSet(TaskSet):
    @task
    def search_by_key(self):
        self.client.get('/api/diaries')


class ApiUser(HttpUser):
    def on_start(self):
        self.client.headers = {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg1MjYyMDc5LCJpYXQiOjE2ODQzOTgwNzksImp0aSI6IjJmM2M0YjQwYmQxMjQ3YWM5NDYzOTEzYmM3ZDkzMGUxIiwidXNlcl9pZCI6MX0.flEiduoqcf57fYZJvCz98N9eQrJCtTxFjjxfWMnaaJA'
        }

    tasks = [ApiTaskSet]
    host = 'http://124.221.102.250:8000'
    # host = 'http://localhost:8000'
