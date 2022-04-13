from flask import request, jsonify
from config.config import app
from crud.face import Face

@app.route('/face', methods=['GET'])
def getImage():
    return jsonify(Face.hello())

@app.route('/cache', methods=['GET'])
def face():
    return jsonify(Face.cachFace())

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port="8086")
