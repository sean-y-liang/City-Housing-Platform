function login() {
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    fetch('/Login-Student', {
        method: 'POST', bodyheaders: {
            'content-Type': 'application/json',
        },
        body: JSON. stringify({
            phone: phone,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Successfully log in.');
        } else{
            alert('Fail to log in' + data.message);
        }
    })
    .catch((error) => {
        console.error('Login request fail:', error);
    });
}