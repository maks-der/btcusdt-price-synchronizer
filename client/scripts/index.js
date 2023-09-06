(() => {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        login(email, password);
      } else {
        alert("Please fill in all fields.");
      }
    });
  });

})
();
