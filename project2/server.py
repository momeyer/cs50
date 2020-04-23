import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)
print(dir(socketio))

class User():
    def __init__(self, username, color):
        self.username = username
        self.color = color

    def __str__(self):
        return f"User-username: {self.username}\nUser-color: {self.color}"

# username => User
userInfo = {}


# group_name => ChatRoom
groups = {}

class ChatRoom():
    def __init__(self, group_name):
        self.group_name = group_name
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

@socketio.on('message')
def on_message(data):
    username = data['username']
    message = data['message']
    color = userInfo[username].color
    data['color'] = color
    groups[data['group']].messages.append(data)
    emit('message', data, broadcast=True)


@socketio.on('change_username')
def on_message(data):
    user = User(data['username'], data['color'])
    userInfo[user.username] = user
    print("received user: ", user)

# TODO send confirmation if username is valid

@socketio.on('create_new_group')
def create_new_group(data):
    newGroup = ChatRoom(data['group_name'])
    groups[newGroup.group_name] = newGroup
    emit('announce', data, broadcast=True)
    print("received group: ", newGroup)

if __name__ == "__main__":
    app.run()
