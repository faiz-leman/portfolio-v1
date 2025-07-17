document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnSpinner = submitBtn.querySelector(".btn-spinner");
  const alertMessage = document.getElementById("alertMessage");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("Form submission started at:", new Date().toISOString());

    showLoadingState();

    const formData = new FormData(contactForm);

    const formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] =
        key === "email" ? "***@***.***" : value ? "PROVIDED" : "EMPTY";
    }
    console.log("Form data being sent:", formDataObject);

    fetch("https://email-notification.fwh.is/php/email.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("Response received:", {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries()),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response.text();
      })
      .then((text) => {
        console.log("Raw response text:", text);

        try {
          const data = JSON.parse(text);
          console.log("Parsed JSON response:", data);

          hideLoadingState();

          if (data.success) {
            console.log("Form submission successful");
            showAlert(
              "success",
              "Thank you! Your message has been sent successfully."
            );
            contactForm.reset();
          } else {
            console.log("Form submission failed:", data.message);
            showAlert(
              "danger",
              data.message || "Something went wrong. Please try again."
            );
          }
        } catch (parseError) {
          console.error("JSON parsing failed:", parseError);
          console.error("Response was not valid JSON:", text);
          hideLoadingState();
          showAlert("danger", "Server response error. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Fetch error details:", {
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        });

        hideLoadingState();
        showAlert(
          "danger",
          "Network error. Please check your connection and try again."
        );
      });
  });

  function showLoadingState() {
    console.log("Showing loading state");
    submitBtn.disabled = true;
    btnText.classList.add("d-none");
    btnSpinner.classList.remove("d-none");
    alertMessage.classList.add("d-none");
  }

  function hideLoadingState() {
    console.log("Hiding loading state");
    submitBtn.disabled = false;
    btnText.classList.remove("d-none");
    btnSpinner.classList.add("d-none");
  }

  function showAlert(type, message) {
    console.log(`Showing ${type} alert:`, message);
    alertMessage.className = `alert alert-${type} mt-3`;
    alertMessage.textContent = message;
    alertMessage.classList.remove("d-none");

    if (type === "success") {
      setTimeout(() => {
        alertMessage.classList.add("d-none");
        console.log("Success alert auto-hidden");
      }, 5000);
    }
  }
});
