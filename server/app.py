from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configure MySQL connection
db = pymysql.connect(host='localhost',
                    user='root',
                    password='',
                    database='attendance',
                    cursorclass=pymysql.cursors.DictCursor)

# Routes

@app.route('/student', methods=['GET'])
def get_students():
    cursor = db.cursor()
    cursor.execute("SELECT * FROM student_info ORDER BY student_info_id DESC")
    students = cursor.fetchall()
    cursor.close()
    return jsonify(students)

@app.route('/attendance', methods=['GET'])
def get_attendance():
    cursor = db.cursor()
    cursor.execute("""
        SELECT student_info.student_info_id, student_info.name, student_info.course, student_info.year, timein.transaction, timein.date
        FROM student_info
        JOIN timein ON timein.student_info_id = student_info.student_info_id
        ORDER BY timein.timein_id DESC
    """)
    attendance = cursor.fetchall()
    cursor.close()
    return jsonify(attendance)

@app.route('/submit/<int:id>', methods=['GET'])
def get_student_by_id(id):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM student_info WHERE student_info_id = %s", (id,))
    student = cursor.fetchone()
    cursor.close()
    return jsonify(student)

@app.route('/edit/<int:id>', methods=['PUT'])
def edit_student(id):
    data = request.json
    cursor = db.cursor()
    cursor.execute("""
        UPDATE student_info 
        SET name = %s, year = %s, course = %s, department = %s
        WHERE student_info_id = %s
    """, (data['name'], data['year'], data['course'], data['department'], id))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Student updated successfully'})

@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_student(id):
    cursor = db.cursor()
    cursor.execute("DELETE FROM timein WHERE student_info_id = %s", (id,))
    db.commit()
    cursor.execute("DELETE FROM student_info WHERE student_info_id = %s", (id,))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Student deleted successfully'})

@app.route('/add', methods=['POST'])
def add_student():
    data = request.json
    cursor = db.cursor()
    cursor.execute("""
        INSERT INTO student_info (name, year, course, department)
        VALUES (%s, %s, %s, %s)
    """, (data['name'], data['year'], data['course'], data['department']))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Student added successfully'})

@app.route('/create', methods=['POST'])
def create_timein():
    data = request.json
    cursor = db.cursor()
    cursor.execute("""
        INSERT INTO timein (student_info_id, transaction, date)
        VALUES (%s, %s, %s)
    """, (data['student_info_id'], data['transaction'], data['date']))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Timein created successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    cursor = db.cursor()
    cursor.execute("SELECT * FROM login WHERE email = %s AND password = %s", (data['email'], data['password']))
    user = cursor.fetchone()
    cursor.close()
    if user:
        return jsonify({'Status': 'Success'})
    else:
        return jsonify({'Message': 'No Record Existed'})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
