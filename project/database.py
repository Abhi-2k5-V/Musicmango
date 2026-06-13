import sqlite3
import os
from datetime import datetime

DATABASE = 'students.db'

def get_db_connection():
    """Create and return a database connection."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database using schema.sql."""
    # Ensure the DB file exists or is created
    conn = get_db_connection()
    with open('schema.sql', 'r') as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()

def generate_student_id():
    """Generate a unique Student ID: STU-YYYY-XXXX."""
    current_year = datetime.now().year
    prefix = f"STU-{current_year}-"
    
    conn = get_db_connection()
    cursor = conn.cursor()
    # Find the most recently added student ID for the current year
    cursor.execute(
        "SELECT student_id FROM students WHERE student_id LIKE ? ORDER BY id DESC LIMIT 1",
        (f"{prefix}%",)
    )
    row = cursor.fetchone()
    conn.close()
    
    if row:
        last_id = row['student_id']
        try:
            # Extract the sequence number (the last 4 digits)
            last_seq = int(last_id.split('-')[-1])
            new_seq = last_seq + 1
        except (ValueError, IndexError):
            new_seq = 1
    else:
        new_seq = 1
        
    return f"{prefix}{new_seq:04d}"

def get_all_students(search_query=None):
    """Retrieve all students, optionally filtered by a search query."""
    conn = get_db_connection()
    cursor = conn.cursor()
    if search_query:
        # Search by ID, Name, Email, Course, Phone, or Address
        like_query = f"%{search_query}%"
        cursor.execute(
            """
            SELECT * FROM students 
            WHERE student_id LIKE ? 
               OR name LIKE ? 
               OR email LIKE ? 
               OR course LIKE ? 
               OR phone LIKE ?
               OR address LIKE ?
            ORDER BY id DESC
            """,
            (like_query, like_query, like_query, like_query, like_query, like_query)
        )
    else:
        cursor.execute("SELECT * FROM students ORDER BY id DESC")
    students = cursor.fetchall()
    conn.close()
    return students

def get_student_by_id(id):
    """Retrieve a single student by their internal database integer id."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students WHERE id = ?", (id,))
    student = cursor.fetchone()
    conn.close()
    return student

def insert_student(name, email, phone, course, dob, address):
    """Insert a new student with an auto-generated student ID."""
    student_id = generate_student_id()
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO students (student_id, name, email, phone, course, dob, address)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (student_id, name, email, phone, course, dob, address)
        )
        conn.commit()
        success = True
    except sqlite3.IntegrityError:
        # In case of rare race condition or duplicate student_id key constraint violation
        success = False
    finally:
        conn.close()
    return success

def update_student(id, name, email, phone, course, dob, address):
    """Update an existing student's details."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            UPDATE students 
            SET name = ?, email = ?, phone = ?, course = ?, dob = ?, address = ?
            WHERE id = ?
            """,
            (name, email, phone, course, dob, address, id)
        )
        conn.commit()
        success = cursor.rowcount > 0
    except sqlite3.Error:
        success = False
    finally:
        conn.close()
    return success

def delete_student(id):
    """Delete a student record by ID."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM students WHERE id = ?", (id,))
        conn.commit()
        success = cursor.rowcount > 0
    except sqlite3.Error:
        success = False
    finally:
        conn.close()
    return success

def get_dashboard_stats():
    """Retrieve aggregated stats for the dashboard dashboard."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Total students count
    cursor.execute("SELECT COUNT(*) FROM students")
    total_students = cursor.fetchone()[0]
    
    # Total unique courses
    cursor.execute("SELECT COUNT(DISTINCT course) FROM students")
    total_courses = cursor.fetchone()[0]
    
    # Top course (most enrolled course)
    cursor.execute("SELECT course, COUNT(*) as count FROM students GROUP BY course ORDER BY count DESC LIMIT 1")
    top_course_row = cursor.fetchone()
    top_course = top_course_row['course'] if top_course_row else "N/A"
    top_course_count = top_course_row['count'] if top_course_row else 0
    
    conn.close()
    return {
        'total_students': total_students,
        'total_courses': total_courses,
        'top_course': top_course,
        'top_course_count': top_course_count
    }
