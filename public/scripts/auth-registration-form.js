// USER FIRST NAME VALIDATION
if (document.getElementById('first-name')) {

  const nameRegex = /[^\w]/;
  const firstNameInput = document.getElementById('first-name');
  const firstNameError = document.getElementById('first-name-error');

  const nameValidation = () => {

    try {
      if (nameRegex.test(firstNameInput.value)) throw 'The username can only contain Latin letters, numbers and underscore.';
      else if (firstNameInput.value.length < 3) throw 'The username should be at least 3 characters long.';
      else if (firstNameInput.value.length > 24) throw 'The username should not exceed 24 characters.';
      else firstNameError.textContent = ''; 
    } catch (error) {
      firstNameError.textContent = error;
    }
  };

  firstNameInput.addEventListener('input', nameValidation);
}

// USER LAST NAME VALIDATION
if (document.getElementById('last-name')) {

  const nameRegex = /[^\w]/;
  const lastNameInput = document.getElementById('last-name');
  const lastNameError = document.getElementById('last-name-error');

  const nameValidation = () => {

    try {
      if (nameRegex.test(lastNameInput.value)) throw 'The username can only contain Latin letters, numbers and underscore.';
      else if (lastNameInput.value.length < 3) throw 'The username should be at least 3 characters long.';
      else if (lastNameInput.value.length > 24) throw 'The username should not exceed 24 characters.';
      else lastNameError.textContent = '';
    } catch (error) {
      lastNameError.textContent = error;
    }
  };

  lastNameInput.addEventListener('input', nameValidation);
}


// USER EMAIL VALIDATION
if (document.getElementById('user-email')) {

  const emailRegex = /^([\w]+[.|-]{0,1}[\w]+)+@([\w]+-{0,1}[\w]+\.)+[a-zA-Z]{2,3}$/i;
  const userEmailInput = document.getElementById('user-email');
  const userEmailError = document.getElementById('user-email-error');

  const emailValidation = () => {

    try {
      
      if (userEmailInput.value == '') userEmailError.textContent = '';
      else if (!emailRegex.test(userEmailInput.value)) throw 'That\'s an invalid email.';
      else if (emailRegex.test(userEmailInput.value)) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
          if (xhttp.status == 200 && xhttp.readyState == 4) {
            if (JSON.parse(xhttp.responseText)) userEmailError.textContent = 'Email address already taken.';
            else userEmailError.textContent = '';
          }
        }
        xhttp.open('GET', `/registration-get-user-email?userEmail=${userEmailInput.value}`, true);
        xhttp.send();
      }
    } catch (error) {
      userEmailError.textContent = error;
    }
  };

  userEmailInput.addEventListener('input', emailValidation);
}


// USER PASSWORD VALIDATION
if (document.getElementById('user-pass')) {
  const userPassInput = document.getElementById('user-pass');
  const userPassParagraph = document.getElementById('user-pass-error');
  // password requirements list items
  const passRequirements = document.getElementById('password-requirements');
  const passLength = document.getElementById('password-length');
  const passLetters = document.getElementById('password-letters');
  const passSymbols = document.getElementById('password-symbols');
  const passAlfaNumSymbols = document.getElementById('password-alfa-num');

  let lengthRule, lettersRule, symbolsRule, alfaNumericRule;

  const displayPassRequirements = () => {
    if (userPassInput.value === '') passRequirements.style.display = 'none';
    else if (lengthRule && lettersRule && symbolsRule && alfaNumericRule) setTimeout(() => {passRequirements.style.display = 'none';}, 1000);
    else passRequirements.style.display = 'block';
  };

  const passValidation = () => {
    // length validation
    if (userPassInput.value.trim().length >= 8) {
      passLength.style.color = 'green';
      lengthRule = true;
    } else {
      passLength.style.color = 'black';
      lengthRule = false;
    }
    // both lower and upper case validation
    if (/(?=.*[A-Z])(?=.*[a-z])/.test(userPassInput.value)) {
      passLetters.style.color = 'green';
      lettersRule = true;
    } else {
      passLetters.style.color = 'black';
      lettersRule = false;
    }
    // number and symbol validation
    if (/(?=.*[0-9_])/.test(userPassInput.value)) {
      passSymbols.style.color = 'green';
      symbolsRule = true;
    } else {
      passSymbols.style.color = 'black';
      symbolsRule = false;
    }
    // alfanumeric symbols validation
    if (/[^\w]/.test(userPassInput.value)) {
      passAlfaNumSymbols.style.color = 'black';
      alfaNumericRule = false;
    } else {
      passAlfaNumSymbols.style.color = 'green';
      alfaNumericRule = true;
    }

    displayPassRequirements();
    passConfValidation();
    // unset password error
    userPassParagraph.textContent = '';
  };

  userPassInput.addEventListener('input', passValidation);

  // confirmed pass validation
  const userPassConfInput = document.getElementById('pass-conf');
  const userPassConfParagraph = document.getElementById('pass-conf-error');
  
  const passConfValidation = () => {
    if (userPassConfInput.value.length > 0) {
      if (userPassInput.value === userPassConfInput.value) userPassConfParagraph.textContent = '';
      else userPassConfParagraph.textContent = 'Passwords are not the same.';
    } else {
      userPassConfParagraph.textContent = '';
    }
  };
  
  userPassConfInput.addEventListener('input', passConfValidation);
}