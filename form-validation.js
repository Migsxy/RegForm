(function () {
  function setInputValidity(input, message) {
    input.setCustomValidity(message || '');

    if (message) {
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  }

  window.initializePhoneValidation = function (form, phoneInput) {
    const phonePattern = /^\d{11}$/;

    function validatePhone() {
      const value = phoneInput.value.trim();
      const cleanedValue = value.replace(/[^0-9]/g, '');

      if (cleanedValue.length > 0 && cleanedValue.length !== 11) {
        phoneInput.setCustomValidity('Please enter an 11-digit phone number.');
      } else {
        phoneInput.setCustomValidity('');
      }
    }

    phoneInput.addEventListener('input', function () {
      const sanitizedValue = phoneInput.value.replace(/\D/g, '');
      phoneInput.value = sanitizedValue;
      validatePhone();
    });

    form.addEventListener('submit', function (event) {
      validatePhone();

      if (!phonePattern.test(phoneInput.value.replace(/\D/g, ''))) {
        event.preventDefault();
        phoneInput.reportValidity();
      }
    });

    validatePhone();
  };

  window.initializePasswordConfirmation = function (form, passwordInput, confirmInput, errorElement) {
    const submitButton = form.querySelector('button[type="submit"]');

    function validatePasswordMatch() {
      const passwordValue = passwordInput.value;
      const confirmValue = confirmInput.value;

      if (!passwordValue && !confirmValue) {
        errorElement.textContent = '';
        if (submitButton) {
          submitButton.disabled = true;
        }
        return;
      }

      if (passwordValue.length < 8 || confirmValue.length < 8) {
        errorElement.textContent = 'Password must be at least 8 characters.';
        if (submitButton) {
          submitButton.disabled = true;
        }
        return;
      }

      if (passwordValue !== confirmValue) {
        errorElement.textContent = 'Passwords do not match.';
        if (submitButton) {
          submitButton.disabled = true;
        }
        return;
      }

      errorElement.textContent = '';
      if (submitButton) {
        submitButton.disabled = false;
      }
    }

    passwordInput.addEventListener('input', validatePasswordMatch);
    confirmInput.addEventListener('input', validatePasswordMatch);

    form.addEventListener('submit', function (event) {
      validatePasswordMatch();

      if (passwordInput.value !== confirmInput.value || passwordInput.value.length < 8) {
        event.preventDefault();
      }
    });

    validatePasswordMatch();
  };

  window.initializeNameAndZipValidation = function (form) {
    const firstNameInput = form.querySelector('#fname');
    const lastNameInput = form.querySelector('#lname');
    const zipInput = form.querySelector('#zip');

    function validateName(input, label) {
      const value = input.value.trim();
      const isValid = /^[A-Za-z ]+$/.test(value) && value.length > 0;

      if (!isValid) {
        setInputValidity(input, `${label} can only contain letters and spaces.`);
        return false;
      }

      setInputValidity(input, '');
      return true;
    }

    function validateZip(input) {
      const value = input.value.trim();
      const isValid = /^\d{4}$/.test(value);

      if (!isValid) {
        setInputValidity(input, 'Zip code must contain exactly 4 numbers.');
        return false;
      }

      setInputValidity(input, '');
      return true;
    }

    if (firstNameInput) {
      firstNameInput.addEventListener('input', function () {
        firstNameInput.value = firstNameInput.value.replace(/[^A-Za-z ]/g, '');
        validateName(firstNameInput, 'First name');
      });
    }

    if (lastNameInput) {
      lastNameInput.addEventListener('input', function () {
        lastNameInput.value = lastNameInput.value.replace(/[^A-Za-z ]/g, '');
        validateName(lastNameInput, 'Last name');
      });
    }

    if (zipInput) {
      zipInput.addEventListener('input', function () {
        zipInput.value = zipInput.value.replace(/\D/g, '').slice(0, 4);
        validateZip(zipInput);
      });
    }

    form.addEventListener('submit', function (event) {
      let isValid = true;

      if (firstNameInput && !validateName(firstNameInput, 'First name')) {
        isValid = false;
      }

      if (lastNameInput && !validateName(lastNameInput, 'Last name')) {
        isValid = false;
      }

      if (zipInput && !validateZip(zipInput)) {
        isValid = false;
      }

      if (!isValid) {
        event.preventDefault();
        if (firstNameInput && firstNameInput.validationMessage) {
          firstNameInput.reportValidity();
        } else if (lastNameInput && lastNameInput.validationMessage) {
          lastNameInput.reportValidity();
        } else if (zipInput && zipInput.validationMessage) {
          zipInput.reportValidity();
        }
      }
    });
  };
})();

