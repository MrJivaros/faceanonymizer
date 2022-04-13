import os
from flask import Flask
from flask_cors import CORS

UPLOAD_FOLDER = './pictures/originals'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'mp4', 'avi'])
DOWNLOAD_FOLDER = './static'

app = Flask(__name__,)
app._static_folder = './static'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_FOLDER
# app.config['USE_X_SENDFILE'] = True


app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={
    r'/*': {
        'origins': '*'
    }
})
