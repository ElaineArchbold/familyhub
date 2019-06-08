/** 
* checks if page has an element with this id before launching the POST request, 
* prevents errors in the console on pages that do not contain this element.
* suggested by fellow student Seán Murphy
**/

if (document.querySelector('#new-account-form')) {      

  const newAccountForm = document.querySelector('#new-account-form');

  newAccountForm.addEventListener('submit', (event) => {
    // prevents default behaviour of submit button to refresh page
    event.preventDefault();
    
    const username = document.querySelector('#newUsername').value;
    const email = document.querySelector('#newEmailInput').value;
    const password = document.querySelector('#newPasswordInput').value;
    
    const data = {
      email: email,
      password: password,
      username: username,
    }
    
    fetch('/newaccount', {
      method: 'POST',
      cors: '*same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {

      if (data.emailExists || data.userExists) {
        userExistsModal(data.emailExists, data.userExists)
      } else {
        // if response confirms this is not an existing account, new account is created and confirm account modal is activated
        confirmAccountModal(username);
      }
    })
    .catch(err => console.log(err));
    
  });
}

// activation code for modals

$('#closeUserExistsModal').click(function() {
  userExistsModal();
})

function confirmAccountModal(username) {
  $('#alertHeading').text('Welcome to Family Hub ' + username + '!')
  $('#newUserConfirmModal').addClass('active');
}

/**
 * @param {bool} emailExists 
 * @param {bool} userExists 
 * userExistsModal takes booleans sent from python on if the user or email
 * already exists in the database. Responds with a modal message to give the
 * user the appropriate feedback so they know what to do next.
 */

function userExistsModal(emailExists, userExists) {
  if (emailExists && userExists) {
    $('#alertHeading').text('Hello again');
    $('#alertMessage').text('This account is already registered to Family Hub');
    $('#logInBtn').removeClass('d-none');
  } else if (emailExists) {
    $('#alertHeading').text('Hello again');
    $('#alertMessage').text('This email is already registered to Family Hub');
    $('#logInBtn').removeClass('d-none');
  } else if (userExists) {
    $('#alertHeading').text('Sorry');
    $('#alertMessage').text('This username is already in use, please choose another');
    $('#logInBtn').addClass('d-none');
  }
  $('#userExistsModal').toggleClass('active');
}


if (document.querySelector('#login-form')) {      

  const loginForm = document.querySelector('#login-form');

  loginForm.addEventListener('submit', (event) => {
    // prevents default behaviour of submit button to refresh page
    event.preventDefault();
    
    const loginInput = document.querySelector('#loginInput').value;
    const password = document.querySelector('#loginPassword').value;
    
    const data = {
      loginInput: loginInput,
      password: password
    }
    
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if (data.userMatch == false) {
        // if no user match respond with alert
        alert('no user account with this username or email address. Create account? Y/N');
      }
      else {
        if (data.passwordCorrect) {
          // if user match and password match, launch logged in modal
          openLoggedInModal(data.username);
        }
        else {
          // if user match but no password match, respond with alert
          alert('incorrect password, try again');
        }
      }
    })
    .catch(err => console.log(err));
    
  });
}



// works with css to slow carousels movement down https://stackoverflow.com/questions/17332431/how-can-i-control-the-speed-that-bootstrap-carousel-slides-in-items/18633703 */
jQuery.fn.carousel.Constructor.TRANSITION_DURATION = 2000;

// CREDIT: code for floating buttons taken from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp 
window.onscroll = function() {scrollFunction()};


// makes floating buttons for search and go to top visible once user starts scrolling.
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    $("#to-top-btn").addClass('active');
    $("#search-btn").addClass('active');
  } else {
    $("#to-top-btn").removeClass('active');
    $("#search-btn").removeClass('active');
  }
}

$('#to-top-btn').click(function() {
    topFunction();
});

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

$('#search-btn').click(function() {
    openSearch();
});

$('#search-modal-submit-button').click(function() {
    openSearch();
});

$('#delete-button').click(function() {
  openDeleteWarningModal();
});

$('#delete-modal-submit-button').click(function() {
  openDeleteWarningModal();
});

// when user clicks on search icon the search modal adds the active class, 
// adding css to opacity: 1; 
function openSearch() {
  $("#search-modal").toggleClass('active');
}

function openDeleteWarningModal() {
  $('#delete-warning-modal').toggleClass('active');
}

function openLoggedInModal(username) {
  $('#welcomeMessage').text('Welcome ' + username + '.');
  $('#loggedInModal').addClass('active');
}

// datepicker function code written by fellow student Sean Murphy, 
// who gave it to me to demonstrate how to get it working
['#eventFilterDatepickerSm', 
'#eventFilterDatepickerLg', 
'#start', 
'#end',
'#date'].forEach(datepick => {
    $(datepick).datepicker({ 
    autoclose: true, 
  	todayHighlight: true,
  	uiLibrary: 'bootstrap4'
	});
});

['#monStart', 
'#monEnd',
'#tueStart', 
'#tueEnd',
'#wedStart', 
'#wedEnd',
'#thuStart', 
'#thuEnd',
'#friStart', 
'#friEnd',
'#satStart', 
'#satEnd',
'#sunStart', 
'#sunEnd',].forEach(timepick => {
    $(timepick).timepicker({ 
    autoclose: true, 
  	uiLibrary: 'bootstrap4'
	});
});