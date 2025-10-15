const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const footerLink = document.getElementById('footer-link');
    const toggleLink = document.getElementById('toggle-link');
    const passwordInput = document.getElementById('signup-password');
    const passwordStrength = document.getElementById('password-strength');
    const passwordStrengthBar = document.getElementById('password-strength-bar');

    function switchToLogin() {
      loginTab.classList.add('active');
      signupTab.classList.remove('active');
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      footerLink.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-link">Sign up</a>';
      document.getElementById('toggle-link').addEventListener('click', handleToggleClick);
    }

    function switchToSignup() {
      signupTab.classList.add('active');
      loginTab.classList.remove('active');
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      footerLink.innerHTML = 'Already have an account? <a href="#" id="toggle-link">Sign in</a>';
      document.getElementById('toggle-link').addEventListener('click', handleToggleClick);
    }

    function handleToggleClick(e) {
      e.preventDefault();
      if (loginForm.classList.contains('hidden')) {
        switchToLogin();
      } else {
        switchToSignup();
      }
    }

    loginTab.addEventListener('click', switchToLogin);
    signupTab.addEventListener('click', switchToSignup);
    toggleLink.addEventListener('click', handleToggleClick);

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
      const password = this.value;
      
      if (password.length === 0) {
        passwordStrength.classList.remove('show');
        return;
      }

      passwordStrength.classList.add('show');
      
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      if (/[^a-zA-Z\d]/.test(password)) strength++;

      passwordStrengthBar.className = 'password-strength-bar';
      if (strength <= 1) {
        passwordStrengthBar.classList.add('weak');
      } else if (strength <= 3) {
        passwordStrengthBar.classList.add('medium');
      } else {
        passwordStrengthBar.classList.add('strong');
      }
    });

    // Login form handler
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const message = document.getElementById('login-message');

      if (!email || !password) {
        message.textContent = 'Please fill in all fields';
        message.className = 'message error';
        return;
      }

      // Simulate login (replace with actual authentication)
      message.textContent = 'Logging in...';
      message.className = 'message';
      
      setTimeout(() => {
        message.textContent = 'Login successful!';
        message.className = 'message success';
        // Redirect to app
        setTimeout(() => {
          window.location.href = 'main.html';
        }, 1000);
      }, 1000);
    });

    // Signup form handler
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;
      const message = document.getElementById('signup-message');

      if (!email || !password || !confirm) {
        message.textContent = 'Please fill in all fields';
        message.className = 'message error';
        return;
      }

      if (password !== confirm) {
        message.textContent = 'Passwords do not match';
        message.className = 'message error';
        return;
      }

      if (password.length < 8) {
        message.textContent = 'Password must be at least 8 characters';
        message.className = 'message error';
        return;
      }

      // Simulate signup (replace with actual registration)
      message.textContent = 'Creating account...';
      message.className = 'message';
      
      setTimeout(() => {
        message.textContent = 'Account created successfully!';
        message.className = 'message success';
        // Redirect to app
        setTimeout(() => {
          window.location.href = 'main.html';
        }, 1000);
      }, 1000);
    });