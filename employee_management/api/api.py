from flask import Flask, request,jsonify;
from flask_mysqldb import MySQL
from datetime import date

app = Flask(_name_)
#Config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
#Provide your MySQL password below.
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'temp_db'

mysql = MySQL(app)



@app.route("/add_employee", methods = ['POST'])
def add_employee_to_db():
    if request.method == 'POST':
        employee=request.get_json()
        emp_id = employee['emp_id']
        name = employee['name']
        gender = employee['gender']
        address = employee['address']
        dob = employee['dob']
        mobile = employee['mobile']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO emp(emp_id, name, gender, address, dob, mobile) values(%s, %s, %s, %s, %s, %s);", (emp_id, name, gender, address, dob, mobile))
        mysql.connection.commit()
        cur.close()
        return jsonify({
            "status":"Employee successfully added",
            "data":employee
        }),200


@app.route("/search_employee", methods = ['GET', 'POST'])
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


@app.route("/show_employee", methods = ['GET'])
def show_employee():
    cur = mysql.connection.cursor()
    val = cur.execute("SELECT * FROM emp")
    emp_data = cur.fetchall()
    cur.close()
    return jsonify({
            "status":"success",
            "data":emp_data,
        }),200



@app.route(f"/delete_employee/id/<id>")
def delete_employee(id):
    cur = mysql.connection.cursor()
    cur.execute(f"DELETE FROM emp WHERE id={id};")
    mysql.connection.commit()
    cur.close()
    return jsonify({
            "status":"success",
            "data":"employee deleted successfully"
            
        }),200


@app.route("/update_employee/id/<id>", methods = ['GET', 'POST'])
def update_employee(id):
    cur = mysql.connection.cursor()
    val = cur.execute(f"SELECT * FROM emp WHERE id={id};")
    emp_data = cur.fetchone()
    cur.close()
    if request.method == 'POST':
        data=request.get_json()
        emp_id = data['emp_id']
        name = data['name']
        gender = data['gender']
        address = data['address']
        dob = data['dob']
        mobile = data['mobile']
        cur = mysql.connection.cursor()
        cur.execute(f"UPDATE emp SET emp_id=%s, name=%s, gender=%s, address=%s, dob=%s, mobile=%s  WHERE id={id};", (emp_id, name, gender, address, dob, mobile))
        mysql.connection.commit()
        cur.close()
       return jsonify({
            "status":"success",
            "data":"Employee details updated successfully",
        }),200

    


if _name_ == '_main_':
    app.run(debug=True)