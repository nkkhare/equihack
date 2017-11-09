// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
});

// On Click of Sign Up Button
// Show Sign Up Screen
// Hide Welcome Page 

$("#signup-btn").on( "click", function(event) {
		event.preventDefault();
		// Hide Welcome Page
		$("#welcome-page").addClass("hidden");
		$("#signup-page").toggleClass("hidden").addClass("visible");

	}
);

// On Sign Up Submit
$("#signup-submit").on("click", function(event){
	event.preventDefault();

	var newuser = {
		'fullname' : $("#full_name").val(),
		'username' : $("#user_name").val(),
		'email' : $("#email").val(),
		'age' : $("#age").val(),
		'address' : $("#address").val(),
		'gender' : $("#gender").val(),
		'ssn' : $("#ssn").val(),
		'password' : $("#password").val()
	};

	// Use AJAX to post the object to our adduser service
	$.ajax({
			type: 'POST',
			data: newuser,
			url: 'http://10.155.73.117:3000/users/adduser',
			dataType: 'JSON'
		}).done(function( response ) {
			// Check for successful (blank) response
			if (response.msg === '') {
			// Clear the form inputs
			$("#message").html("<div class='alert alert-success' role='alert'>Your Account was successfully created.</div>");
		} else {
			// If something goes wrong, alert the error message that our service returned
			alert('Error: ' + response.msg);
		}
	});
});

// On Click of Login In Button
// Show Login Menu
// Hide Welcome Page

$("#login-btn").on( "click", function(event) {
	event.preventDefault();

	// Hide Welcome Page
	$("#welcome-page").addClass("hidden");
	$("#login-page").toggleClass("hidden").addClass("visible");

	}
);

$("#login-submit").on("click", function(event){	
	event.preventDefault();

	var query = {
		'username' : $("#login_username").val(),
		'password' : $("#login_password").val()
	};

	// Use AJAX to post the object to our adduser service
	$.ajax({
		type: 'POST',
		data: query,
		url: 'http://10.155.73.117:3000/users/userdetails',
		dataType: 'JSON',
	}).done(function( response ) {
			// Check for successful response
			if (response.msg.length !== 0) {

				$("#message").html("<div class='alert alert-success' role='alert'>Login Successful</div>");

				//Hide Login Page
				$("#login-page").toggleClass("visible").addClass("hidden");

				//Show Data
				$("#user-data").toggleClass("hidden").addClass("visible");

				$.each(response.msg, function( index, value ) {

					$.each(value, function( i, v) { 

						if (i !== "_id"){

							$("#data").append("<td>" + v + "</td>");

						}

						
					});

				});
			} else {

				$("#message").html("<div class='alert alert-danger' role='alert'>Login Failure - Please Refresh and try again.</div>");

			}
	});

});