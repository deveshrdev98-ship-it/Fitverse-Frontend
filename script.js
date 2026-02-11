// ===============================
// GET AUTH FUNCTION (Always fresh)
// ===============================
function getAuth() {
  return JSON.parse(localStorage.getItem("auth"));
}

// ===============================
// NAVBAR LOGIC
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth();

  const loginBtn = document.getElementById("loginBtn");
  const avatar = document.getElementById("profileAvatar");
  const avatarText = document.getElementById("avatarText");

  if (auth && auth.loggedIn) {
    if (loginBtn) loginBtn.style.display = "none";
    if (avatar) avatar.style.display = "flex";

    if (avatarText) {
      avatarText.textContent =
        auth.name?.charAt(0).toUpperCase() || "U";
    }

    if (avatar) {
      avatar.addEventListener("click", () => {
        const updatedAuth = getAuth();

        if (!updatedAuth) return;

        if (updatedAuth.role === "coach") {
          window.location.href = "coach-dashboard.html";
        } else {
          window.location.href = "user-dashboard.html";
        }
      });
    }
  }

  // ===============================
  // PROTECTED BUTTONS
  // ===============================
  document.querySelectorAll(".protected").forEach(btn => {
    btn.addEventListener("click", () => {
      const redirect = btn.dataset.redirect;
      const currentAuth = getAuth();

      if (!currentAuth || !currentAuth.loggedIn) {
        localStorage.setItem("postLoginRedirect", redirect);
        window.location.href = "login.html";
      } else {
        window.location.href = redirect;
      }
    });
  });

  // ===============================
  // LOGIN FORM
  // ===============================
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();

      const role = document.getElementById("role").value;
      const name =
        document.getElementById("username")?.value || "User";

      if (!role) {
        alert("Select role");
        return;
      }

      localStorage.setItem(
        "auth",
        JSON.stringify({
          loggedIn: true,
          role: role,
          name: name
        })
      );

      const redirect = localStorage.getItem("postLoginRedirect");
      localStorage.removeItem("postLoginRedirect");

      if (redirect) {
        window.location.href = redirect;
      } else {
        if (role === "coach") {
          window.location.href = "coach-dashboard.html";
        } else {
          window.location.href = "user-dashboard.html";
        }
      }
    });
  }
});

// ===============================
// LOGOUT FUNCTION
// ===============================
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
