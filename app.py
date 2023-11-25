from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
import json

import time
from matplotlib import pyplot as plt
from scipy.spatial import distance
from imutils import face_utils
import imutils 
import dlib
import cv2

app = Flask(__name__)

@app.route("/hi",methods=['GET'])
def hello():
    return "Hello World!"

image_path = "/Users/pfsv/Desktop/JJ코딩페스티벌/pic/"
@app.route('/image', methods=['POST'])
def upload_file(file = None):
    token = json.loads(request.get_data(), encoding='utf-8')
    #token = request.post['token']

    # Get the file from the form
    if 'image' not in request.files:
        return 'No image file part'

    image = request.files['image']

    if image.filename == '':
        return 'No selected image file'

    # Handle the token and the uploaded image file as needed
    # For now, just print them as an example
    print(f'Token: {token}')
    if token == 1:
        first_eye = EAR(image)
        threshold = 0.3 * first_eye
        return 'wh'
    else:
        if EAR(image) < threshold:
            return "sleepy"
            


thresh = 0.25
frame_check = 20
detect = dlib.get_frontal_face_detector()
predict = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]


def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

def EAR(image):
    cap = cv2.VideoCapture(image)
    ret, frame=cap.read()
    frame = imutils.resize(frame, width=450)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    subjects = detect(gray, 0)
    for subject in subjects:
        shape = predict(gray, subject)
        shape = face_utils.shape_to_np(shape) #converting to NumPy Array
        leftEye = shape[lStart:lEnd]
        rightEye = shape[rStart:rEnd]
		#print("leftEYE: ",leftEye.shape)
		#print("rightEYE: ",rightEye)
        leftEAR = eye_aspect_ratio(leftEye)
        rightEAR = eye_aspect_ratio(rightEye)
		
		#print(rightEAR)
		#print(leftEAR)
		#plt.imshow(frame)

        ear = (leftEAR + rightEAR) / 2.0
        leftEyeHull = cv2.convexHull(leftEye)
        rightEyeHull = cv2.convexHull(rightEye)
        cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
        cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)
		#plt.imshow(frame) # IMAGE
        result = (leftEAR + rightEAR) / 2
        return result

# Token , IMAGE








if __name__ == "__main__":
    app.run(host = '127.0.0.1', port=8080)
