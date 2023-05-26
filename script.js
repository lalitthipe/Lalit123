// Function to send AJAX request
function sendRequest(url, method, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          callback(null, xhr.responseText);
        } else {
          callback(xhr.status);
        }
      }
    };
    xhr.send(JSON.stringify(data));
  }
  
  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
  
    // Get the form data
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    // Create an object with the user data
    var user = {
      name: name,
      email: email,
      password: password
    };
  
    // Send the user data to the server
    sendRequest('/register', 'POST', user, function(error, response) {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Response:', response);
  
        // Store the user data in an array or local storage
        var users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
  
        // Redirect to the new page
        window.location.href = 'user-list.html';
      }
    });
  }
  
  // Attach form submission event listener
  var form = document.getElementById('registration-form');
  form.addEventListener('submit', handleSubmit);
  