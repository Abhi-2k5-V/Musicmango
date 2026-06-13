import unittest
import os
import sqlite3
from datetime import datetime

# Configure application for testing before importing
import database
from app import app, validate_student_data

class StudentManagementSystemTests(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        """Set database to a test database and initialize it."""
        # Override the database file in database module to avoid clobbering production data
        cls.original_db = database.DATABASE
        database.DATABASE = 'students_test.db'
        cls.db_path = database.DATABASE
        
    @classmethod
    def tearDownClass(cls):
        """Restore database and cleanup test file."""
        database.DATABASE = cls.original_db
        if os.path.exists(cls.db_path):
            os.remove(cls.db_path)

    def setUp(self):
        """Setup client and reset database for each test."""
        # Ensure fresh tables
        conn = database.get_db_connection()
        conn.execute("DROP TABLE IF EXISTS students;")
        conn.commit()
        conn.close()
        
        # Initialize database tables
        database.init_db()
        
        # Setup Flask test client
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        self.client = app.test_client()

    def test_database_init(self):
        """Test database table initialization."""
        conn = database.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='students';")
        table_exists = cursor.fetchone()
        conn.close()
        self.assertIsNotNone(table_exists)

    def test_input_validation(self):
        """Test the validation function with various inputs."""
        # Valid input
        valid_data = {
            'name': 'Alice Smith',
            'email': 'alice.smith@university.edu',
            'phone': '1234567890',
            'course': 'Computer Science',
            'dob': '2000-01-15',
            'address': '123 University Ave, Boston, MA'
        }
        errors = validate_student_data(valid_data)
        self.assertEqual(len(errors), 0, f"Expected no validation errors, got: {errors}")

        # Invalid Email
        invalid_data = valid_data.copy()
        invalid_data['email'] = 'bad_email'
        errors = validate_student_data(invalid_data)
        self.assertIn('email', errors)

        # Invalid Name (too short)
        invalid_data = valid_data.copy()
        invalid_data['name'] = 'A'
        errors = validate_student_data(invalid_data)
        self.assertIn('name', errors)

        # Invalid DOB (future date)
        invalid_data = valid_data.copy()
        invalid_data['dob'] = '2099-12-31'
        errors = validate_student_data(invalid_data)
        self.assertIn('dob', errors)

        # Invalid Phone
        invalid_data = valid_data.copy()
        invalid_data['phone'] = '123'
        errors = validate_student_data(invalid_data)
        self.assertIn('phone', errors)

    def test_student_crud_operations(self):
        """Test full CRUD cycle using the database helpers."""
        # 1. Insert (Create)
        success = database.insert_student(
            name='Bob Jones',
            email='bob.jones@college.edu',
            phone='+1 (555) 987-6543',
            course='Information Technology',
            dob='1999-05-20',
            address='456 College Rd, Austin, TX'
        )
        self.assertTrue(success)

        # Retrieve all to verify insertion
        students = database.get_all_students()
        self.assertEqual(len(students), 1)
        student = students[0]
        self.assertEqual(student['name'], 'Bob Jones')
        self.assertEqual(student['course'], 'Information Technology')
        self.assertTrue(student['student_id'].startswith(f"STU-{datetime.now().year}-"))
        
        # Save ID for later
        student_pk_id = student['id']

        # 2. Get by ID (Read)
        retrieved_student = database.get_student_by_id(student_pk_id)
        self.assertIsNotNone(retrieved_student)
        self.assertEqual(retrieved_student['email'], 'bob.jones@college.edu')

        # 3. Update (Update)
        update_success = database.update_student(
            id=student_pk_id,
            name='Bob R. Jones',
            email='bob.jones@newdomain.com',
            phone='9876543210',
            course='Software Engineering',
            dob='1999-05-20',
            address='789 New Address St, Dallas, TX'
        )
        self.assertTrue(update_success)
        
        # Verify update
        updated_student = database.get_student_by_id(student_pk_id)
        self.assertEqual(updated_student['name'], 'Bob R. Jones')
        self.assertEqual(updated_student['email'], 'bob.jones@newdomain.com')
        self.assertEqual(updated_student['course'], 'Software Engineering')

        # 4. Search Filter
        # Search match
        search_results = database.get_all_students(search_query='Dallas')
        self.assertEqual(len(search_results), 1)
        # Search mismatch
        no_results = database.get_all_students(search_query='NonExistentStudent')
        self.assertEqual(len(no_results), 0)

        # 5. Delete (Delete)
        delete_success = database.delete_student(student_pk_id)
        self.assertTrue(delete_success)
        
        # Verify deletion
        deleted_student = database.get_student_by_id(student_pk_id)
        self.assertIsNone(deleted_student)
        self.assertEqual(len(database.get_all_students()), 0)

    def test_routes(self):
        """Test HTTP routes respond and redirect correctly."""
        # Get dashboard (empty state)
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'No student records exist', response.data)

        # Add Student via POST
        post_data = {
            'name': 'Charlie Miller',
            'email': 'charlie@web.com',
            'phone': '8887776666',
            'course': 'Data Science & Analytics',
            'dob': '2001-11-30',
            'address': '555 Data Way, Seattle, WA'
        }
        response = self.client.post('/students/add', data=post_data, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Student record added successfully!', response.data)
        self.assertIn(b'Charlie Miller', response.data)

        # Add Student with validation error
        bad_post_data = post_data.copy()
        bad_post_data['email'] = 'not-an-email'
        response = self.client.post('/students/add', data=bad_post_data, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Please correct the errors below and submit again.', response.data)

        # Get list of students
        students = database.get_all_students()
        student_id = students[0]['id']

        # Edit Student via GET
        response = self.client.get(f'/students/edit/{student_id}')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Edit Student Profile', response.data)

        # Edit Student via POST
        edit_data = post_data.copy()
        edit_data['name'] = 'Charlie Updated'
        response = self.client.post(f'/students/edit/{student_id}', data=edit_data, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Student record updated successfully!', response.data)
        self.assertIn(b'Charlie Updated', response.data)

        # Delete Student via POST
        response = self.client.post(f'/students/delete/{student_id}', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Student record deleted successfully!', response.data)

        # Try deleting non-existent student
        response = self.client.post('/students/delete/9999', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Failed to delete student record.', response.data)

        # Test 404 Route
        response = self.client.get('/invalid-route-name-1234')
        self.assertEqual(response.status_code, 404)
        self.assertIn(b'404', response.data)

if __name__ == '__main__':
    unittest.main()
