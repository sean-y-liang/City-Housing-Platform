function signup() {
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const fName = document.getElementById("fName").value;
    const lName = document.getElementById("lName").value;

    fetch('/Signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    }