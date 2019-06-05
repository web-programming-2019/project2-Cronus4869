
import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

content = ''
count = 0


@app.route("/")
def index():
    return render_template("index.html", content=content)


@socketio.on("submit content")
def subname(getcontent):
    global content
    content = getcontent
    emit("getcontent", content, broadcast=True)


@socketio.on("new room")
def buildnew():
    global count
    count = count + 1
    url = "http://127.0.0.1:5000/" + "room/" + str(count)
    param = {
        "url": url,
        "count": count
    }
    emit("build room", param, broadcast=True)


@app.route("/room/<int:count>")
def room(count):
    return render_template("index.html", content=content)
