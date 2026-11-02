(() => {
  "use strict";

  const nameForm = document.getElementById("name-form");
  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("name-error");
  const nameScreen = document.getElementById("name-screen");
  const messageScreen = document.getElementById("message-screen");
  const personName = document.getElementById("person-name");
  const restart = document.getElementById("restart");

  function cleanName(value) {
    return value
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[<>]/g, "")
      .slice(0, 40);
  }

  function showMessage(name) {
    personName.textContent = name;
    nameScreen.classList.remove("active");
    messageScreen.classList.add("active");
    messageScreen.setAttribute("aria-hidden", "false");
    nameScreen.setAttribute("aria-hidden", "true");
    window.setTimeout(() => restart.focus(), 50);
  }

  nameForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = cleanName(nameInput.value);

    if (!name) {
      nameError.textContent = "Te rog, introdu-ți numele.";
      nameInput.focus();
      return;
    }

    nameError.textContent = "";
    showMessage(name);
  });

  nameInput.addEventListener("input", () => {
    if (nameError.textContent) nameError.textContent = "";
  });

  restart.addEventListener("click", () => {
    messageScreen.classList.remove("active");
    nameScreen.classList.add("active");
    messageScreen.setAttribute("aria-hidden", "true");
    nameScreen.setAttribute("aria-hidden", "false");
    nameInput.value = "";
    nameError.textContent = "";
    nameInput.focus();
  });

  // Keep the experience friendly when users use the browser back button.
  window.addEventListener("pageshow", () => {
    nameInput.focus({ preventScroll: true });
  });
})();
