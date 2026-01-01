const ADMIN_ID = "GBS@Admin-rk";
const ADMIN_PASS = "admin-rk@25";

function login() {
    if (
        adminId.value === ADMIN_ID &&
        adminPass.value === ADMIN_PASS
    ) {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        refreshDashboard();
    } else {
        alert("Wrong Admin ID or Password");
    }
}

function logout() {
    location.reload();
}
