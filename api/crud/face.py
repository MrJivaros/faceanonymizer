import os
from pickle import TRUE
from config.config import UPLOAD_FOLDER
import cv2
from flask import jsonify, request, url_for
from crud.utils import generatePictureName
originalImagesPath = './pictures/originals/'
blurredImagesPath = './pictures/blurred/'
from werkzeug.utils import secure_filename


class Face:
    @staticmethod
    def hello():
        return 'hello world'

    def saveImage(self):
      target = os.path.join(UPLOAD_FOLDER)
      if not os.path.isdir(target):
          os.mkdir(target)
      file = request.files['file']
      originName = secure_filename(file.filename)
      type = originName.split('.')[1]
      print("################### type")
      print(type)
      filename = f'picture-{generatePictureName()}.{type}'
      destination = "/".join([target, filename])
      file.save(destination)
      return filename

    @staticmethod
    def faceanonymizer():
      filename =  Face().saveImage()
      caheFaceResponse = Face().cachFace(filename)
      return caheFaceResponse

    def cachFace(self, filename):
        try:
            imagePath = originalImagesPath+filename
            print(imagePath)
            cascPath = "./config/haarcascade_frontalface_default.xml"
            faceCascade = cv2.CascadeClassifier(cascPath)
            image = cv2.imread(imagePath)
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            # Detect faces in the image
            faces = faceCascade.detectMultiScale(
                gray,
                scaleFactor=1.2,
                minNeighbors=5,
                minSize=(30, 30),
                flags=cv2.FONT_HERSHEY_SIMPLEX
            )
            print("Found {0} faces!".format(len(faces)))
            # Draw a rectangle around the faces
            for (x, y, w, h) in faces:
                cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
                # anonymise gaussian
                roi = image[y:y+h, x:x+w]
                roi = cv2.GaussianBlur(roi, (101, 101), 30)
                image[y:y+roi.shape[0], x:x+roi.shape[1]] = roi

            saveImagePath = blurredImagesPath + filename
            cv2.imwrite(saveImagePath, image)

            return {
              'status': True,
              'path':filename
            }
        except:
            return {
              'status':False,
              'path': ''
            }
