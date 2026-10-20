const API_URL = "http://localhost:8080/api/auth/login";

const loginView = document.getElementById("login-view");
const welcomeView = document.getElementById("welcome-view");
const form = document.getElementById("login-form");
const errorEl = document.getElementById("error");
const submitBtn = document.getElementById("submit-btn");
const welcomeName = document.getElementById("welcome-name");

function showWelcome(username) {
  welcomeName.textContent = username;
  loginView.hidden = true;
  welcomeView.hidden = false;
}

function showLogin() {
  welcomeView.hidden = true;
  loginView.hidden = false;
  form.reset();
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorEl.hidden = true;
  submitBtn.disabled = true;

  const body = {
    username: document.getElementById("username").value.trim(),
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("username", data.username);
      showWelcome(data.username);
    } else {
      showError(data.message || "Erreur de connexion");
    }
  } catch (err) {
    showError("Impossible de joindre le serveur. Le backend est-il démarré ?");
  } finally {
    submitBtn.disabled = false;
  }
});

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("username");
  showLogin();
});

// Au chargement : si deja connecte, on affiche directement l'accueil
const saved = localStorage.getItem("username");
if (saved) showWelcome(saved);
