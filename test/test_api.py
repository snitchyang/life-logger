from locust import *


class ApiTaskSet(TaskSet):
    @task
    def search_by_key(self):
        self.client.get('/api/tags')


class ApiUser(HttpUser):
    def on_start(self):
        self.client.headers = {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3ODU4OTY0LCJpYXQiOjE2ODY5OTQ5NjQsImp0aSI6IjkzNTg0MWFhMjVhYTRhZWJiZjhjNTBhMGU2OWUzYjM3IiwidXNlcl9pZCI6MX0.jZKCypshF3HbrLBidTv2e3O9TYLYqlb-qGWsliXylJU'
        }

    tasks = [ApiTaskSet]
    host = 'http://124.221.102.250:8000'
    # host = 'http://localhost:8000'
