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
            feedback.textContent = '';
        }
    });
});
