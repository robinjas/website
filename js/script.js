document.addEventListener('DOMContentLoaded', function () {
    let email = document.getElementById('email');
    let confirmEmail = document.getElementById('confirmEmail');
    let form = document.getElementById('contactForm');
    let feedback = document.createElement('p');
    feedback.style.color = 'red';

    form.addEventListener('submit', function (event) {
        if (email.value !== confirmEmail.value) {
            feedback.textContent = 'Emails do not match!';
            email.parentNode.insertBefore(feedback, email.nextSibling);
            event.preventDefault();
        } else {
            feedback.textContent = ''; // Clear feedback if emails match
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this);
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
