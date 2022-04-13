from flask import request, jsonify, send_from_directory, url_for, send_file, render_template
from flask_cors import cross_origin
from config.config import app, UPLOAD_FOLDER
from crud.face import Face
from werkzeug.utils import secure_filename
import os


@app.route('/', methods=['GET'])
def getImage():
    return send_from_directory('../static/images', 'moi.jpg',)


@app.route('/cache', methods=['GET'])
def face():
    return jsonify(Face.cachFace())


@app.route('/saveimage', methods=['POST'])
@cross_origin()
def fileUpload():
    target = os.path.join(UPLOAD_FOLDER)
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)
    print(url_for('static', filename='moi.jpg'))
    return jsonify({
        'url': 'jivaris.com'
    })


@app.route('/get-image/<image_name>',  methods=['GET'])
def staticFiles(image_name):
    print('################# path')
    root_dir = os.path.dirname(os.getcwd())
    print(root_dir)
    return send_from_directory('./static/images', image_name, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port="8086")
