import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)
print(dir(socketio))

@app.route("/")
def index():
    return render_template("new.html") 

@socketio.on('connect')
def on_connect():
    print("User Connected")

@socketio.on('disconect')
def on_connect():
    print("User Disconnected")

@socketio.on('message')
def on_message(data):
    print("received: " , data['message'])
    emit('message', data, broadcast=True) 

@socketio.on('change_username')
def on_message(data):
    print("NewUsername: " , data['new_username'])

if __name__ == "__main__":
    app.run()
