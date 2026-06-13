import re
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash
import database

app = Flask(__name__)
# Using a secret key for session/flashed messages
app.secret_key = 'super-secret-student-management-key-for-dev'

# List of courses for populate the select dropdown in templates
COURSES = [
    'Computer Science',
    'Data Science & Analytics',
    'Software Engineering',
    'Information Technology',
    'Business Administration',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Digital Marketing'
]

def validate_student_data(data):
    """Validate student input data."""
    errors = {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()
    course = data.get('course', '').strip()
    dob = data.get('dob', '').strip()
    address = data.get('address', '').strip()

    # Name validation
    if not name:
        errors['name'] = 'Name is required.'
    elif len(name) < 2:
        errors['name'] = 'Name must be at least 2 characters long.'
    elif not re.match(r"^[a-zA-Z\s'.]+$", name):
        errors['name'] = 'Name should only contain letters, spaces, dots, or single quotes.'

    # Email validation
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not email:
        errors['email'] = 'Email is required.'
    elif not re.match(email_regex, email):
        errors['email'] = 'Enter a valid email address (e.g. name@domain.com).'

    # Phone validation
    if not phone:
        errors['phone'] = 'Phone number is required.'
    elif not re.match(r'^\+?[0-9\s\-()]{7,18}$', phone):
        errors['phone'] = 'Enter a valid phone number (7 to 18 digits, spaces, hyphens, or parentheses allowed).'

    # Course validation
    if not course:
        errors['course'] = 'Please select a course.'
    elif course not in COURSES and len(course.strip()) < 2:
        errors['course'] = 'Please select a valid course or enter a descriptive name.'

    # Date of Birth validation
    if not dob:
        errors['dob'] = 'Date of birth is required.'
    else:
        try:
            parsed_date = datetime.strptime(dob, '%Y-%m-%d')
            # Check if DOB is in the future
            if parsed_date > datetime.now():
                errors['dob'] = 'Date of birth cannot be in the future.'
            # Check if student is unrealistically old (e.g., > 120 years)
            elif (datetime.now() - parsed_date).days / 365.25 > 120:
                errors['dob'] = 'Please enter a valid birth year.'
        except ValueError:
            errors['dob'] = 'Date of birth must be a valid date in YYYY-MM-DD format.'

    # Address validation
    if not address:
        errors['address'] = 'Address is required.'
    elif len(address) < 5:
        errors['address'] = 'Address must be at least 5 characters long.'

    return errors

@app.route('/')
@app.route('/students')
def index():
    """Dashboard displaying students list, search results, and statistics."""
    search_query = request.args.get('search', '').strip()
    students = database.get_all_students(search_query)
    stats = database.get_dashboard_stats()
    return render_template(
        'index.html',
        students=students,
        stats=stats,
        search_query=search_query
    )

@app.route('/students/add', methods=['GET', 'POST'])
def add_student():
    """Add a new student record."""
    if request.method == 'POST':
        # Get data from request
        data = {
            'name': request.form.get('name'),
            'email': request.form.get('email'),
            'phone': request.form.get('phone'),
            'course': request.form.get('course'),
            'dob': request.form.get('dob'),
            'address': request.form.get('address')
        }
        
        errors = validate_student_data(data)
        
        if not errors:
            success = database.insert_student(
                name=data['name'].strip(),
                email=data['email'].strip(),
                phone=data['phone'].strip(),
                course=data['course'].strip(),
                dob=data['dob'],
                address=data['address'].strip()
            )
            if success:
                flash('Student record added successfully!', 'success')
                return redirect(url_for('index'))
            else:
                flash('An error occurred. Database insert failed. The email or Student ID might already exist.', 'danger')
        else:
            flash('Please correct the errors below and submit again.', 'danger')
            
        # Re-render with existing data and validation errors to provide a smooth UX
        return render_template('add.html', student=data, errors=errors, courses=COURSES)
        
    return render_template('add.html', student={}, errors={}, courses=COURSES)

@app.route('/students/edit/<int:id>', methods=['GET', 'POST'])
def edit_student(id):
    """Edit an existing student record."""
    student_record = database.get_student_by_id(id)
    if not student_record:
        flash(f'Student with ID {id} was not found.', 'warning')
        return redirect(url_for('index'))
        
    # Convert sqlite3.Row to dict for rendering ease
    student_data = dict(student_record)
    
    if request.method == 'POST':
        # Read new form submissions
        data = {
            'name': request.form.get('name'),
            'email': request.form.get('email'),
            'phone': request.form.get('phone'),
            'course': request.form.get('course'),
            'dob': request.form.get('dob'),
            'address': request.form.get('address')
        }
        
        errors = validate_student_data(data)
        
        if not errors:
            success = database.update_student(
                id=id,
                name=data['name'].strip(),
                email=data['email'].strip(),
                phone=data['phone'].strip(),
                course=data['course'].strip(),
                dob=data['dob'],
                address=data['address'].strip()
            )
            if success:
                flash('Student record updated successfully!', 'success')
                return redirect(url_for('index'))
            else:
                flash('No updates were made, or database update failed.', 'warning')
                return redirect(url_for('index'))
        else:
            flash('Please correct the errors below and submit again.', 'danger')
            
        # Preserve Student ID from database for display in view, and merge fields
        data['student_id'] = student_data['student_id']
        data['id'] = id
        return render_template('edit.html', student=data, errors=errors, courses=COURSES)
        
    return render_template('edit.html', student=student_data, errors={}, courses=COURSES)

@app.route('/students/delete/<int:id>', methods=['POST'])
def delete_student(id):
    """Delete a student record."""
    success = database.delete_student(id)
    if success:
        flash('Student record deleted successfully!', 'success')
    else:
        flash('Failed to delete student record. It may not exist.', 'danger')
    return redirect(url_for('index'))

@app.errorhandler(404)
def page_not_found(e):
    """Custom 404 page."""
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    """Custom 500 page."""
    return render_template('500.html'), 500

if __name__ == '__main__':
    # Initialize DB on startup
    database.init_db()
    # Run application
    app.run(debug=True, host='0.0.0.0', port=5000)
