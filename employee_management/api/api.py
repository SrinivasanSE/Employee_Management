from flask import Flask, request,jsonify
from datetime import date
from flask_mysqldb import MySQL
from passlib.hash import sha256_crypt
import random

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'seenu@123' # your password
app.config['MYSQL_DB'] = 'employee_db'

mysql = MySQL(app)

def generate_emp_id():
    random_id = random.randint(1000001, 9999999)
    cur = mysql.connection.cursor()
    val = cur.execute(f"SELECT * FROM employee_tab WHERE emp_id={random_id}")
    cur.close()
    if val > 0:
        generate_emp_id()
    elif val == 0:
        return random_id


@app.route("/add_employee", methods=['POST'])
def add_employee_to_db():
    if request.method == 'POST':
        try:
            employee = request.get_json()
            emp_id = generate_emp_id()
            name = employee['name']
            gender = employee['gender']
            address = employee['address']
            dob = employee['dob']
            mobile = employee['mobile']
            email = employee['email']
            role = 'Employee'
            if name == "":
                return jsonify({
                    "status": "error",
                    "msg": "Name field could not be empty."
                }), 200
            elif address == "":
                return jsonify({
                    "status": "error",
                    "msg": "Address field could not be empty."
                }), 200
            elif dob == "":
                return jsonify({
                    "status": "error",
                    "msg": "DOB field could not be empty."
                }), 200
            elif mobile == "":
                return jsonify({
                    "status": "error",
                    "msg": "Mobile field could not be empty."
                }), 200
            elif email == "":
                return jsonify({
                    "status": "error",
                    "msg": "Email field could not be empty."
                }), 200
            else:
                actual_password = str(dob[0:2]+dob[3:5]+dob[6:10])
                password = sha256_crypt.hash(actual_password)
                cur = mysql.connection.cursor()
                cur.execute("INSERT INTO employee_tab(emp_id, name, gender, address, dob, mobile, email, role, password) "
                            "VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s);", (emp_id, name, gender, address, dob, mobile, email, role, password))
                mysql.connection.commit()
                cur.close()
            return jsonify({
                "status":"Employee successfully added",
                "data":employee
            }), 200
        except mysql.connection.DataError as err:
            return jsonify({
                "status": "error",
                "msg": "Entered data is too long."
            }), 200
        except mysql.connection.IntegrityError as err:
            return jsonify({
                "status": "error",
                "msg": "Email id already present in database."
            }), 200


@app.route("/search_employee", methods = ['POST'])
def search_employee():
    if request.method == "POST":
        data=request.get_json()
        search_by = data["search_by"]
        search_item = data["search_item"]
        cur = mysql.connection.cursor()
        val = cur.execute("SELECT * FROM emp")
        emp_data = cur.fetchall()
        cur.close()
        lst = []
        if search_by.lower() == "Name".lower():
            for emp in emp_data:
                if emp[2][0].lower() == search_item.lower():
                    lst.append(emp)
        elif search_by.lower() == "Employee Id".lower():
            for emp in emp_data:
                if emp[1] == search_item:
                    lst.append(emp)
                    break
        elif search_by.lower() == "Age".lower():
            for emp in emp_data:
                age = 0
                day = int(emp[5][0:2])
                month = int(emp[5][3:5])
                year = int(emp[5][6:])
                today = date.today()
                if today.year > year:
                    if today.month > month:
                        age = today.year - year
                    elif today.month == month:
                        if today.day > day:
                            age = today.year - year
                        else:
                            age = today.year - year -1
                    else:
                        age = today.year - year - 1
                    print(age)
                if age == int(search_item):
                    lst.append(emp)
        return jsonify({
            "status":"success",
            "data":lst,
        }),200


@app.route("/get_all_employees", methods = ['GET'])
def show_employee():
    cur = mysql.connection.cursor()
    val = cur.execute("SELECT * FROM employee_tab WHERE role!='HR'")
    emp_data = cur.fetchall()
    employees_data=[]
    for emp in emp_data:
        data = {'emp_id':emp[0], 'name':emp[1], 'gender': emp[2], 'address': emp[3], 
                        'dob': emp[4], 'mobile': emp[5], 'email': emp[6], 'role': emp[7]}
        employees_data.append(data.copy())
    cur.close()
    return jsonify({
            "status":"success",
            "data":employees_data,
        }),200





@app.route("/employee/<emp_id>", methods = ['GET', 'PUT','DELETE'])
def employee_operation(emp_id):
    if request.method== 'GET':
        cur = mysql.connection.cursor()
        val = cur.execute(f"SELECT * FROM employee_tab WHERE emp_id={emp_id};")
        emp_data = cur.fetchone()
        cur.close()
        if val == 0:
            return jsonify({
                "status": "error",
                "msg": "Employee not found."
            }), 200
        else:
            return jsonify({
                "status": "success",
                "data": {'emp_id':emp_data[0], 'name':emp_data[1], 'gender': emp_data[2], 'address': emp_data[3], 
                        'dob': emp_data[4], 'mobile': emp_data[5], 'email': emp_data[6], 'role': emp_data[7]},
            }), 200

    elif request.method == 'PUT':
        try:
            data = request.get_json()
            name = data['name']
            gender = data['gender']
            address = data['address']
            dob = data['dob']
            mobile = data['mobile']
            email = data['email']
            if name == "":
                return jsonify({
                    "status": "error",
                    "msg": "Name field could not be empty."
                }), 200
            elif address == "":
                return jsonify({
                    "status": "error",
                    "msg": "Address field could not be empty."
                }), 200
            elif dob == "":
                return jsonify({
                    "status": "error",
                    "msg": "DOB field could not be empty."
                }), 200
            elif mobile == "":
                return jsonify({
                    "status": "error",
                    "msg": "Mobile field could not be empty."
                }), 200
            elif email == "":
                return jsonify({
                    "status": "error",
                    "msg": "Email field could not be empty."
                }), 200
            else:
                actual_password = str(dob[0:2]+dob[3:5]+dob[6:10])
                password = sha256_crypt.hash(actual_password) #encrypt is deprecated
                cur = mysql.connection.cursor()
                val = cur.execute(f"UPDATE employee_tab SET name=%s, gender=%s, address=%s, dob=%s, mobile=%s, email=%s, password=%s"
                            f"WHERE emp_id={emp_id};", (name, gender, address, dob, mobile, email, password))
                mysql.connection.commit()
                cur.close()
                if val == 0:
                    return jsonify({
                        "status": "error",
                        "msg": "Employee not found."
                    }), 200
                else:
                    return jsonify({
                        "status": "success",
                        "msg": "Employee details updated successfully",
                    }), 200
        except mysql.connection.DataError as err:
            return jsonify({
                "status": "error",
                "msg": "Entered data is too long."
            }), 200

    elif request.method == 'DELETE':
        cur = mysql.connection.cursor()
        val = cur.execute(f"DELETE FROM employee_tab WHERE emp_id={emp_id};")
        mysql.connection.commit()
        cur.close()
        if val == 0:
            return jsonify({
                "status": "error",
                "msg": "Employee not found."
            }), 200
        else:
            return jsonify({
                "status":"success",
                "msg": "Employee deleted successfully"
            }),200

@app.route("/authenticate_user",methods=["POST"])
def authenticate_user():
    user_detail=request.get_json()
    email=user_detail["email"]
    passwordEntered=user_detail['password']
    print(email,passwordEntered)
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM employee_tab WHERE email = %s', (email,))
    user = cur.fetchone()
    print(user)
    cur.close()
    if user:
        print(user[7])
        if user[7]!="HR":
            return jsonify({
                "status":"success",
                "msg":"User is not authorized",
                "data":user,
            }),200
        passwordInDb=user[-1]
        isUser = sha256_crypt.verify(passwordEntered,passwordInDb)
        if(isUser):
            return jsonify({
                "status":"success",
                "msg":"User is authenticated",
                "data":user,
            }),200
        else:
             return jsonify({
                "status":"error",
                "msg":"Wrong password",
                "data":user,
            }),200
    return jsonify({
                "status":"error",
                "msg":"email doesn't exist",
            }),200

   

if __name__ == '__main__':
    app.run(debug=True)