// ===== AUTH STATE =====
const auth = JSON.parse(localStorage.getItem("auth"));
const loginBtn = document.getElementById("loginBtn");
const avatar = document.getElementById("profileAvatar");
const avatarText = document.getElementById("avatarText");

// ===== NAVBAR STATE =====
if (auth && auth.loggedIn) {
  loginBtn.style.display = "none";
  avatar.style.display = "flex";
  avatarText.textContent = auth.name?.charAt(0).toUpperCase() || "U";

  avatar.onclick = () => {
    window.location.href =
      auth.role === "coach"
        ? "coach-dashboard.html"
        : "dashboard.html";
  };
}

// ===== PROTECTED LINKS =====
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

// ===== LOGIN FORM HANDLER =====
document.getElementById("loginForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const name = document.getElementById("username")?.value || "User";

  if (!role) {
    alert("Select role");
    return;
  }

  localStorage.setItem(
    "auth",
    JSON.stringify({
      loggedIn: true,
      role,
      name,
      coachHired: false
    })
  );

  const redirect = localStorage.getItem("postLoginRedirect");
  localStorage.removeItem("postLoginRedirect");

  window.location.href =
    redirect || (role === "coach" ? "coach-dashboard.html" : "dashboard.html");
});
