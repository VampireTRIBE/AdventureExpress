(() => {
  "use strict";
  const forms = document.querySelectorAll(".f-validate");

  for (const form of forms) {
    const fields = form.querySelectorAll("input, textarea");

    // Save original placeholders
    fields.forEach((field) => {
      if (!field.dataset.placeholder) {
        field.dataset.placeholder = field.placeholder;
      }

      // Clear placeholder when user focuses
      field.addEventListener("focus", () => {
        field.placeholder = field.dataset.placeholder;
      });

      // Live validation on typing
      field.addEventListener("input", () => {
        if (!field.checkValidity()) {
          field.placeholder = field.validationMessage;
          field.classList.add("invalid");
          field.classList.remove("valid");
        } else {
          field.placeholder = field.dataset.placeholder;
          field.classList.add("valid");
          field.classList.remove("invalid");
        }
      });

      // Validate on blur
      field.addEventListener("blur", () => {
        if (!field.checkValidity()) {
          field.placeholder = field.validationMessage;
          field.classList.add("invalid");
          field.classList.remove("valid");
        } else {
          field.placeholder = field.dataset.placeholder;
          field.classList.add("valid");
          field.classList.remove("invalid");
        }
      });
    });

    // Submit handler
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          fields.forEach((field) => {
            if (!field.checkValidity()) {
              field.value = "";
              field.placeholder = field.validationMessage;
              field.classList.add("invalid");
              field.classList.remove("valid");
            } else {
              field.placeholder = field.dataset.placeholder;
              field.classList.add("valid");
              field.classList.remove("invalid");
            }
          });
        }

        form.classList.add("was-validated");
      },
      false
    );
  }
})();
