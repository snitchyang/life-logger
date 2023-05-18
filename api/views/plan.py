from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Plan
from api.serializers import PlanSerializer


class PlanList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request: Request):
        user = request.user
        response = PlanSerializer(Plan.objects.filter(user=user).order_by('-due'), many=True).data
        return Response(response, status=200)


class PlanAdd(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):
        user = request.user
        data = request.data
        due = data.get('due')
        content = data.get('content')
        Plan.objects.update_or_create(content=content, user=user, due=due, finished=False)
        return Response({'message': 'success'}, status=200)

    def put(self, request: Request):
        data = request.data
        id = data.get('id')
        due = data.get('due')
        content = data.get('content')
        finished = data.get('finished')
        plan: Plan = Plan.objects.get(id=id)
        plan.due = due
        plan.content = content
        plan.finished = finished
        plan.save()
        return Response({'message': 'success'}, status=200)
