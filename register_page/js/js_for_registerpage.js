function check_pass() {
    
    if (document.getElementById('pass').value ==
            document.getElementById('re_pass').value) {
        document.getElementById('signup').disabled = false;
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Password Matching';
    } else {
        document.getElementById('signup').disabled = true;
        document.getElementById('message').style.color = 'Red';
        document.getElementById('message').innerHTML = 'Password not matching';
    }
}