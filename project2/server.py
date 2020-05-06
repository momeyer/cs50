import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)
# print(dir(socketio))


class User():
    def __init__(self, username, color):
        self.username = username
        self.color = color

    def __str__(self):
        return f"User-username: {self.username}\nUser-color: {self.color}"


updates = {}

updates['users'] = {}
updates['groups'] = {}

updates['groups']['group1_div'] = {
            'groupName':'group1', "groupColor": '#ffd766', 'groupIcon': '15', 'messages': 'group1'}
updates['groups']['group2_div'] = {
            'groupName':'group2', "groupColor": '#ab9df2', 'groupIcon': '20', 'messages': 'group1'}
updates['groups']['group3_div'] = {
            'groupName':'group3', "groupColor": '#fb9767', 'groupIcon': '4', 'messages': 'group1'}

updates['users']['fulano'] = {
            'username':'fulano', "color": '#a9dc76'}
updates['users']['ciclano'] = {
            'username':'ciclano', "color": '#ffd766'}
updates['users']['beltrano'] = {
            'username':'beltrano', "color": '#78dce8'}
updates['users']['another'] = {
            'username':'another', "color": '#ab9df2'}
updates['users']['onemore'] = {
            'username':'onemore', "color": '#ff6087'}
updates['users']['oooops'] = {
            'username':'oooops', "color": '#fb9767'}

print(updates)


class ChatRoom():
    def __init__(self, group_name, group_color, icon):
        self.group_name = group_name
        self.color = group_color
        self.icon = icon
        self.messages = []


@app.route("/")
def index():
    return render_template("index.html")


@socketio.on('connect')
def on_connect():
    print("User Connected")


@socketio.on('disconect')
def on_connect():
    print("User Disconnected")


@socketio.on('request_updates')
def on_request_updates():
    print('request_updates')
    emit('request_updates', updates)


@socketio.on('message')
def on_message(data):
    updates['groups'][data['group']]['messages'] += data['message']
    print('messages: ', updates['groups'][data['group']]['messages'])
    emit('message', data, broadcast=True)


@socketio.on('send_username')
def on_message(data):

    if data['username'] not in updates['users'].keys():
        data['available'] = True
        updates['users'][data['username']] = {
            'username': data['username'], 'color': data['color']}
        print("received user: ", data)

    emit('send_username', data)


@socketio.on('send_group_name')
def create_new_group(data):
    groupName = f"{data['groupName']}_div"
    if groupName not in updates['groups'].keys():
        data['available'] = True
        updates['groups'][groupName] = {
            'groupName': data['groupName'], "groupColor": data['groupColor'], "groupIcon": data['groupIcon'], 'messages': ''}

    emit('send_group_name', data, broadcast=True)


if __name__ == "__main__":
    app.run()
