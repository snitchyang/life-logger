from locust import *


class ApiTaskSet(TaskSet):
    @task
    def search_by_key(self):
        for i in range(10):
            self.client.get('/api/tags')


class ApiUser(HttpUser):
    def on_start(self):
        self.client.headers = {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2NTAwMzE2LCJpYXQiOjE2ODU2MzYzMTYsImp0aSI6ImZkOGZiODYzNGRiZTQwNTBhMjk1N2I5ZGNhZjQ0MWQ3IiwidXNlcl9pZCI6MX0.Ljzgku88Dmr3CfgPxy2_N8sSw4zi6RqDky4w6hZ7qfY'
        }

    tasks = [ApiTaskSet]
    host = 'http://124.221.102.250:8000'
    # host = 'http://localhost:8000'
