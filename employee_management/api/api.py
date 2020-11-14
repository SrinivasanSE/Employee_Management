from flask import Flask,jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/addemployee",methods=['POST'])
def addemployee():
    return {
        "status":"success"
    }

@app.route("/getemployees",methods=["GET"])
def getAllEmployees():
   return jsonify({"data": "Hello World"})


if __name__=="__main__":
    app.run(debug=True)
