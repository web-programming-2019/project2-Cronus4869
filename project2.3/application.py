import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

content = ''
count = 0
num = []


@app.route("/")
def index():
    num.append(0)
    return render_template("index.html", content=content)


@socketio.on("submit content")
def subname(getcontent):
    global content
    content = getcontent
    p = 0
    num[p] = num[p] + 1
    conpara = {
        "content": content,
        "num": num[0]
    }
    emit("getcontent", conpara, broadcast=True)


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
