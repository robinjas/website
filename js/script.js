document.addEventListener('DOMContentLoaded', function () {
    let email = document.getElementById('email');
    let confirmEmail = document.getElementById('confirmEmail');
    let form = document.getElementById('contactForm');
    let feedback = document.createElement('p');
    feedback.style.color = 'red';
    let isFormValid = true; // Flag to track form validation state

    form.addEventListener('submit', function (event) {
        // Assume form is valid at the start of validation
        isFormValid = true;

        if (email.value !== confirmEmail.value) {
            feedback.textContent = 'Emails do not match!';
            email.parentNode.insertBefore(feedback, email.nextSibling);
            isFormValid = false; // Set flag to false if emails don't match
            event.preventDefault();
        } else {
            feedback.textContent = ''; // Clear feedback if emails match
        }

        if (!isFormValid) {
            // If form is not valid, prevent form submission logic
            event.preventDefault();
            return; // Exit the function early
        }

        // Prevent the default form submission if custom logic is to be executed
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObject = {};
        formData.forEach((value, key) => { formDataObject[key] = value; });

        fetch('http://localhost:8000/submit-form/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })
            .then(response => {
                if (response.ok) {
                    console.log("Form submitted successfully");
                    form.reset();  // Reset the form upon successful submission
                    feedback.textContent = ''; // Optionally clear feedback message
                } else {
                    console.error("Submission failed");
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});
