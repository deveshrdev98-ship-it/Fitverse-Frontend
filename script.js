// ===============================
// AUTH STATE
// ===============================
const auth = JSON.parse(localStorage.getItem("auth"));
const loginBtn = document.getElementById("loginBtn");
const avatar = document.getElementById("profileAvatar");
const avatarText = document.getElementById("avatarText");

// ===============================
// NAVBAR STATE (SHOW AVATAR)
// ===============================
if (auth && auth.loggedIn) {
  if (loginBtn) loginBtn.style.display = "none";
  if (avatar) avatar.style.display = "flex";

  if (avatarText) {
    avatarText.textContent =
      auth.name?.charAt(0).toUpperCase() || "U";
  }

  if (avatar) {
    avatar.onclick = () => {
      window.location.href =
        auth.role === "coach"
          ? "coach-dashboard.html"
          : "user-dashboard.html";
    };
  }
}

// ===============================
// PROTECTED LINKS
// ===============================
document.querySelectorAll(".protected").forEach(item => {
  item.addEventListener("click", () => {
    const redirect = item.dataset.redirect;

    if (!auth || !auth.loggedIn) {
      localStorage.setItem("postLoginRedirect", redirect);
      window.location.href = "login.html";
    } else {
      window.location.href = redirect;
    }
  });
});

// ===============================
// LOGIN FORM HANDLER
// ===============================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const role = document.getElementById("role").value;
    const name =
      document.getElementById("username")?.value || "User";

    if (!role) {
      alert("Please select role");
      return;
    }

    // Save Auth
    localStorage.setItem(
      "auth",
      JSON.stringify({
        loggedIn: true,
        role: role,
        name: name,
        coachHired: false
      })
    );

    // Check if redirected from protected page
    const redirect = localStorage.getItem("postLoginRedirect");
    localStorage.removeItem("postLoginRedirect");

    // Role Based Redirect
    window.location.href =
      redirect ||
      (role === "coach"
        ? "coach-dashboard.html"
        : "user-dashboard.html");
  });
}

// ===============================
// LOGOUT FUNCTION (OPTIONAL)
// ===============================
function logout() {
  localStorage.removeItem("auth");
  window.location.href = "index.html";
}
