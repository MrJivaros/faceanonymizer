import cv2
from crud.utils import generatePictureName
originalImagesPath = './pictures/originals'
blurredImagesPath = './pictures/blurred/'

class Face:
  @staticmethod
  def hello():
    return 'hello world'

  @staticmethod
  def cachFace():
    try:
      imagePath = originalImagesPath+"/jiv.jpg"
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
        flags = cv2.FONT_HERSHEY_SIMPLEX
      )
      print ("Found {0} faces!".format(len(faces)))
      # Draw a rectangle around the faces
      for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
        #anonymise gaussian
        roi = image[y:y+h, x:x+w] 
        roi = cv2.GaussianBlur(roi, (101, 101), 30) 
        image[y:y+roi.shape[0], x:x+roi.shape[1]] = roi
      
      saveImagePath = blurredImagesPath+'picture{id}.jpg'.format(id=generatePictureName())
      cv2.imwrite(saveImagePath, image)

      return {
        'status': True,
        'url': saveImagePath
      }
    except:
      return {
        'status': False,
      }

