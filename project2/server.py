import os
import requests
import random
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


class ServerData():
    updates = {'users': {},
               'groups': {}}

    @staticmethod
    def add_new_user_if_available(username, color, status):
        if username not in ServerData.updates['users'].keys():
            ServerData.updates['users'][username] = {
                'username': username, 'color': color, 'status': status}
            print(ServerData.updates['users'][username])
            return True
        else:
            return False

    @staticmethod
    def add_group_if_available(group_name_key, group_name, group_color, group_icon):
        if group_name_key not in ServerData.updates['groups'].keys():
            ServerData.updates['groups'][group_name_key] = {'groupName': group_name,
                                                            "groupColor": group_color,
                                                            "groupIcon": group_icon,
                                                            'messages': ''}
            print(ServerData.updates['groups'][group_name_key])
            return True
        else:
            return False

    @staticmethod
    def on_message(group_name, message):
        print('group ', group_name)
        ServerData.updates['groups'][group_name]['messages'] += message

    @staticmethod
    def populateApp():
        colors = ['#a9dc76', '#ffd766', '#78dce8',
                  '#ab9df2', '#ff6087', '#fb9767']
        groupNames = ['TalkingShit', 'onlyFriends', 'quarantiners',
                      'AltijdThuis', 'talkTalkTalk', 'MigosandMigas']
        peopleName = ['Maria', 'James', 'Kate', 'John',
                      'Peter', 'Samantha', 'Eduard', 'Cath']
        status = [True, False]

        for name in groupNames:
            icon = random.randint(1, 54)
            color = random.choice(colors)
            ServerData.updates['groups'][f'{name}_div'] = {
                'groupName': name, "groupColor": color, 'groupIcon': icon, 'messages': ''}

        for name in peopleName:
            userStatus = random.choice(status)
            color = random.choice(colors)
            ServerData.updates['users'][name] = {'username': name, "color": color, 'status': userStatus}


ServerData.populateApp()


class ChatRoom():
    def __init__(self, group_name, group_color, icon):
        self.group_name = group_name
        self.color = group_color
        self.icon = icon
        self.messages = []


class SocketEvents ():
    Connect = 'connect'
    SendUserName = 'send_username'
    Message = 'message'
    SendGroupName = 'send_group_name'
    RequestUpdates = 'request_updates'
    NewUser = 'new_user'
    ChangeOfStatus = 'change_of_status'
    Disconect = 'disconect'


@app.route("/")
def index():
    return render_template("index.html")


@socketio.on(SocketEvents.Connect)
def on_connect():
    print("User Connected")


@socketio.on(SocketEvents.ChangeOfStatus)
def status_online(data):
    emit(SocketEvents.ChangeOfStatus, data, broadcast=True)
    if not data['status']:
        emit(SocketEvents.Disconect, data,  broadcast=True)


@socketio.on(SocketEvents.RequestUpdates)
def on_request_updates():
    emit(SocketEvents.RequestUpdates, ServerData.updates)


@socketio.on(SocketEvents.Message)
def on_message(data):
    ServerData.on_message(data['group'], data['message'])
    emit(SocketEvents.Message, data, broadcast=True)


@socketio.on(SocketEvents.SendUserName)
def on_new_user(data):
    if ServerData.add_new_user_if_available(data['username'], data['color'], data['status']):
        data['available'] = True
        emit(SocketEvents.SendUserName, data)
    else:
        data['available'] = False
        emit(SocketEvents.SendUserName, data)

    emit(SocketEvents.NewUser, data, broadcast=True)


@socketio.on(SocketEvents.SendGroupName)
def create_new_group(data):
    groupName = f"{data['groupName']}_div"

    if ServerData.add_group_if_available(groupName, data['groupName'], data['groupColor'], data['groupIcon']):
        data['available'] = True
        emit(SocketEvents.SendGroupName, data, broadcast=True)

    else:
        data['available'] = False
        emit(SocketEvents.SendGroupName, data, broadcast=True)


if __name__ == "__main__":
    app.run()
