import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

name = ''


@app.route("/")
def index():
    return render_template("index.html", name=name)


@socketio.on("submit name")
def subname(getname):
    global name
    name = getname
    emit("getname", name, broadcast=True)
