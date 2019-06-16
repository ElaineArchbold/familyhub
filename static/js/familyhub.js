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

    showLoading();

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
        hideLoading();
        if (data.emailExists || data.userExists) {
          userExistsModal(data.emailExists, data.userExists)
        } else {
          confirmAccountModal(username);
        }
      })
      .catch(err => console.log(err));
  });
}

// activation code for modals
$('#closeUserExistsModal').click(function () {
  userExistsModal();
})

/**
 * Constructs welcome message for new account with their username included
 * @param {string} username 
 */

function confirmAccountModal(username) {
  $('#alertHeading').text('Welcome to Family Hub ' + username + '!')
  $('#newUserConfirmModal').addClass('active');
}

/**
 * userExistsModal takes booleans sent from python on if the user or email
 * already exists in the database. Responds with a modal message to give the
 * user the appropriate feedback so they know what to do next.
 * @param {bool} emailExists 
 * @param {bool} userExists 
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

/**
 * takes input from the login from and passes it to Flask to check against the database.
 * When the data has been checked and responses return from Flask, the function then 
 * responds to the user in the browser depending on what the response
 */

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
    showLoading();
    fetch('/login', {
        method: 'POST',
        cors: '*same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        hideLoading();
        if (data.userMatch == false) {
          let message = 'no user match';
          alertModal(message);
        } else if (data.passwordCorrect == false) {
          let message = 'no password match';
          alertModal(message);
        } else if (data.passwordCorrect) {
          openLoggedInModal(data.username);
        }
      })
      .catch(err => console.log(err));

  });
}

if (document.querySelector('#edit-account-form')) {

  const selector = document.querySelector('#edit-account-form');
  selector.addEventListener('submit', (e) => {
    e.preventDefault();
    let formId = e.target.id
    console.log(formId);
    checkAndUpdate(formId);
  });
}

function checkAndUpdate(item) {

    key = item.slice(0,5);
    console.log(key);

    const oldInput = document.querySelector('#'+ key + 'Old').value;
    const newInput = document.querySelector('#'+ key + 'New').value;
    const whichForm = key;

    const data = {
      whichForm: whichForm,
      oldInput: oldInput,
      newInput: newInput
    }

    let sessionUser = '<%= Session["user"] %>';
    fetchUrl = '/settings/' + sessionUser

    showLoading();
    fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        hideLoading();

        if (key == 'email' && data.updated) {
          alertModal('email updated')
        } else if (key == 'email' && !data.updated) {
          alertModal('email incorrect')
        } else if (key == 'pass' && data.updated) {
          alertModal('password updated')
        } else if (key == 'pass' && !data.updated) {
          alertModal('password incorrect')
        }
      })
      .catch(err => console.log(err));

}

/**
 * This function takes a string and constructs the contents 
 * of the alert modal to match the needs for this use.
 * @param {string} message 
 */
function alertModal(message, date1, date2) {
  const heading = $('#alertHeading');
  const message1 = $('#alertMessage');
  const message2 = $('#alertMessageLine2');

  switch (message) {
    case 'no user match':
      heading.text('Sorry');
      message1.text('No account with this username or email address.\n Please try again.');
      break;
    case 'no password match':
      heading.text('Incorrect password');
      message1.text('Please try again.');
      break;
    case 'times match':
      heading.text('Error');
      message1.text('Your start and finish times cannot be the same.');
      break;
    case 'start end times wrong':
      heading.text('Error');
      message1.text('You selected an earlier finish time than the start time.');
      break;
    case 'dates match':
      heading.text('Error');
      message1.text('Your start and finish dates cannot be the same.');
      break;
    case 'start end dates wrong':
      heading.text('Error');
      message1.text('You input a finish date ' + date2);
      message2.text('that is before your start date ' + date1);
      break;
    case 'passwords must not match':
      heading.text('Error');
      message1.text('These passwords are the same.');
      break;
    case 'emails must not match':
      heading.text('Error');
      message1.text('These emails are the same.');
      break;
    case 'email updated':
      heading.text('Success');
      message1.text('Your email has been successfully updated.');
      break;
    case 'password updated':
      heading.text('Success');
      message1.text('Your password has been successfully updated.');
      break;
    case 'email incorrect':
      heading.text('Error');
      message1.text('Current email is incorrect.');
      break;
    case 'password incorrect':
      heading.text('Error');
      message1.text('Current password is incorrect.');
      break;
    case 'no share':
      heading.text('Sorry');
      message1.text("You can't share this page in preview mode.");
      message2.text('Once you have published it, the share links will work');
      break;
    case 'event published':
      heading.text('Published!');
      message1.text("Your event has been published to Family Hub");
      break;
    default:
      break;
  }
  $('#alertModal').toggleClass('active');
}

$('#alertModalClose').click(function (e) {
  e.preventDefault();
  alertModal();
})

/**
 * Function takes username for this user passed from the 
 * database and constructs a welcome message with it, then
 * activates the modal so it can be seen.
 * 
 * BUG FIX: this function also uses the username variable to construct the nessasary 
 * urls for the login page modal. As the modal exists on the page before the user is
 * logged in. the usual session user variable could not be used to create these links 
 * @param {string} username 
 */

function openLoggedInModal(username) {
  let name = capFirst(username);
  $("#accountUrl").attr("href", `/editor/account/${username}`)
  $("#newEventUrl").attr("href", `/editor/${username}/add-new-event`)
  $("#newActivityUrl").attr("href", `/editor/${username}/add-new-activity`)
  $('#welcomeMessage').text('Welcome ' + name + '.');
  $('#loggedInModal').addClass('active');
}

/**
 * Function takes a string and capitalizes the first letter.
 * Code credit: https://paulund.co.uk/how-to-capitalize-the-first-letter-of-a-string-in-javascript
 * @param {string} string 
 */

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
 * works with css to slow carousels movement down 
 * Credit: https://stackoverflow.com/questions/17332431/how-can-i-control-the-speed-that-bootstrap-carousel-slides-in-items/18633703 
 */
jQuery.fn.carousel.Constructor.TRANSITION_DURATION = 2000;

// CREDIT: code for floating buttons taken from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp 
window.onscroll = function () {
  scrollFunction();
};

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

$('#to-top-btn').click(function () {
  topFunction();
});

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

$('#search-btn').click(function () {
  openSearch();
});

$('#search-modal-submit-button').click(function () {
  openSearch();
});

// when user clicks on search icon the search modal adds the active class, 
// adding css to opacity: 1; 
function openSearch() {
  $("#search-modal").toggleClass('active');
}

$('#delete-button').click(function () {
  openDeleteWarningModal();
});

$('#delete-modal-submit-button').click(function () {
  openDeleteWarningModal();
});

function openDeleteWarningModal() {
  $('#delete-warning-modal').toggleClass('active');
}


// datepicker function code written by fellow student Sean Murphy, 
// who gave it to me to demonstrate how to get it working
['#eventFilterDatepickerSm',
  '#eventFilterDatepickerLg',
  '#start',
  '#end',
  '#date'
].forEach(datepick => {
  $(datepick).datepicker({
    autoclose: true,
    todayHighlight: true,
    uiLibrary: 'bootstrap4',
    format: 'dd/mm/yyyy',
    todayBtn: "linked",
    language: "it",
  });
});


['#monStart', '#monEnd', '#tueStart', '#tueEnd', '#wedStart', '#wedEnd', '#thuStart',
  '#thuEnd', '#friStart', '#friEnd', '#satStart', '#satEnd', '#sunStart', '#sunEnd',
].forEach(timepick => {
  $(timepick).timepicker({
    autoclose: true,
    uiLibrary: 'bootstrap4'
  });
});


/**
 * Spinner animation. 
 */

function showLoading() {
  document.getElementById("spinner-wrapper").style = "visibility: visible";
}

function hideLoading() {
  document.getElementById("spinner-wrapper").style = "visibility: hidden";
}

/**
 * toggle disabled/required attributes on elements when on/off switch clicked
 */

$('#isFree').click(function () {
  let $from = $('#from');

  if ($from.attr('required')) {
    $from.attr('disabled', '').removeAttr('required');
    $from.val('0');
  } else {
    $from.attr('required', '').removeAttr('disabled');
  }
})

/* to activate fields to input start / end times for days only when that day is clicked */

$(".click-days-js").click(function () {
  let day = this.id;
  activateTimes($('#' + day + 'Start'), $('#' + day + 'End'), $('.' + day + '-times'));
});


function activateTimes($start, $end, $times) {
  if ($start.attr('required')) {
    $start.attr('disabled', '').removeAttr('required').val('');
    $end.attr('disabled', '').removeAttr('required').val('');
    $times.each(function () {
      $(this).removeClass('active');
    })
  } else {
    $start.attr('required', '').removeAttr('disabled');
    $end.attr('required', '').removeAttr('disabled');
    $times.each(function () {
      $(this).addClass('active');
    })
  }
}

/**
 * activates functions to count and 
 * compare date input and time input values
 * and return alert modals for incorrect input
 */
$('input.compare-js').change(function () {

  let dayId = this.id;
  let day = dayId.substring(0, 3);

  if (day === 'sta' || day === 'end') {
    if (countTwo('.compare-date-js')) {
      compareDates("date");
    }
  } else if (countTimes(day)) {
    compareTimes(day);
  }

})

/**
 * Returns true if both fields to be compared have been filled in
 * @param {string} day 
 */

function countTwo(key) {
  let count = 0;
  let selector = $(key);

  selector.each(function () {
    if ($(this).val().length > 0) {
      count += 1;
    }
  });

  if (count == 2) {
    return true;
  } else {
    return false;
  }
}

/**
 * Returns true if both start and end fields for a specific
 * day of the week have been filled in
 * @param {string} day 
 */

function countTimes(day) {
  let count = 0;
  let selector = $('.compare-'+ day +'-js');

  selector.each(function(){
    if ($(this).val().length > 0 ) {
      count += 1;
    } 
  });

  if (count == 2) {
    return true;
  } else {
    return false;
  }
}

/**
 * Function uses day value string to construct array of the two times input and compares 
 * them to see if the user selected end time the same as or before the start time. 
 * If incorrect input the end time is deleted so user cannot submit form with incorrect data
 * @param {string} day 
 */

function compareTimes(day) {

  let times = [];
  input = $('.compare-' + day + '-js');
  dayId = $('#' + day + 'End');

  input.each(function () {
    let time = $(this).val();
    times.push(time);
  })

  first = times[0].split(':').map(Number);
  second = times[1].split(':').map(Number);

  if ((first[0] === second[0]) && (first[1] === second[1])) {
    alertModal("times match");
    dayId.val('');
  } else if ((first[0] > second[0]) || ((first[0] === second[0]) && (first[1] > second[1]))) {
    alertModal("start end times wrong");
    dayId.val('');
  }

}

/**
 * Function constructs an array of the two dates input and compares 
 * them to see if the user selected end date the same as or before the start date. 
 * If incorrect input the end date is deleted so user cannot submit form with incorrect data
 */

function compareDates() {
  let dates = [];
  input = $('.compare-date-js');

  input.each(function () {
    let date = $(this).val();
    dates.push(date);
  })

  first = dates[0].split('/').map(Number);
  second = dates[1].split('/').map(Number);

  if (first[0] === second[0] && first[1] === second[1] && first[2] === second[2]) {
    alertModal('dates match');
    $('#end').val('');
  } else if (first[2] > second[2] ||
    first[2] === second[2] && first[1] > second[1] ||
    first[2] === second[2] && first[1] === second[1] && first[0] > second[0]) {
    alertModal('start end dates wrong', dates[0], dates[1]);
    $('#end').val('');
  }
}

/**
 * Function to make sure at least one checkbox is selected for categories, 
 * age range and indoor/outdoor in add/edit forms
 */

let selectors = ['#timesInput :', '.in-out-js:', '.age-range-js:', '.categories :'];
$(selectors).each(function (i) {
  let checkboxGroup = $(selectors[i] + 'checkbox[required]');
  checkboxGroup.change(function () {
    if (checkboxGroup.is(':checked')) {
      checkboxGroup.removeAttr('required');
    } else {
      checkboxGroup.attr('required', 'required');
    }
  });
})

$('.submit-js').click(function () {
  let $from = $('#from');

  if (!$from.attr('required')) {
    $from.attr('required', '').removeAttr('disabled');
    $from.val('0');
  }
})

$(".collapse-link").click(function () {
  $(this).children('i').toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
})

/**
 * function for settings page where users can change their email address and/or password in the database
 * settings page has two fields each for making this change. First field to add the current email or password, 
 * and second field to add the replacement. This function activates and disables the relevant fields so the form
 * cannot be sent with only one of the two fields filled in, but deactivates the required attribute on a pair
 * of fields if both are emptied. 
 */

inputClasses = [".email-input-js", ".password-input-js"]
$(inputClasses).each(function (i) {
  $(inputClasses[i]).change(function () {

    if (countTwo(inputClasses[i])) {
      input = $(inputClasses[i]);
      values = []
      input.each(function () {
        let val = $(this).val();
        values.push(val);
      })

      if (values[0] === values[1] && inputClasses[i] === ".email-input-js") {
        alertModal("emails must not match");
        $('#emailNew').val('');
      } else if (values[0] === values[1] && inputClasses[i] === ".password-input-js") {
        alertModal("passwords must not match");
        $('#passNew').val('');
      }
    }
  })
})

function noValues(key) {
  let count = 0;
  let selector = $(key);

  selector.each(function () {
    if ($(this).val().length > 0) {
      count += 1;
    }
  });

  if (count === 0) {
    return true;
  } else {
    return false;
  }
}

if (document.querySelector('#social-share-icons')) {
  addShareButtonLinks();
}

function addShareButtonLinks(){
  let link = window.location.href

  $('#sharePageFb').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + link);
  $('#sharePageTwitter').attr('href', 'https://twitter.com/home?status=' + link);
  $('#sharePageEmail').attr('href', 'mailto:?&subject=&body=' + link);
}

$(".no-share").click(function() {
  alertModal('no share');
})

$('#closeNotice').click(function() {
  $('.hide').addClass('hidden')
})
