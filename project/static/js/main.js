/**
 * EduStream Student Management System - Client Side Scripting
 */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Auto-dismiss Alert Messages
    // Select all alerts inside the flash container and set a timer to fade them out
    const alerts = document.querySelectorAll('.alert-container .alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            // Use Bootstrap's Alert instance to close it smoothly
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000); // 5 seconds
    });

    // 2. Setup Delete Confirmation Modal Dynamically
    const deleteModal = document.getElementById('deleteConfirmModal');
    if (deleteModal) {
        deleteModal.addEventListener('show.bs.modal', function(event) {
            // Button that triggered the modal
            const button = event.relatedTarget;
            
            // Extract info from data-id and data-name attributes
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const displayId = button.getAttribute('data-student-id');
            
            // Get sub-elements inside the modal
            const modalStudentName = deleteModal.querySelector('#modal-student-name');
            const modalStudentId = deleteModal.querySelector('#modal-student-id');
            const deleteForm = deleteModal.querySelector('#delete-form');
            
            // Update the text and form action target
            if (modalStudentName) modalStudentName.textContent = name;
            if (modalStudentId) modalStudentId.textContent = displayId;
            if (deleteForm) {
                deleteForm.setAttribute('action', `/students/delete/${id}`);
            }
        });
    }

    // 3. Bootstrap 5 Form Custom Client-Side Validation
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
    
    // Loop over them and prevent submission on invalid inputs
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});
