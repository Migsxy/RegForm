(function () {
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
  
})();
function chkfName() {
var myfname = document.getElementById("fname");
var pos = myfname.value.search(/^[A-Z][a-z]+$/);

if (pos != 0) {
    fname.style.borderColor = "red";
    return false;
} else
    return true;
}

