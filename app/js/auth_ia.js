
// Cấm việc mở Developer Tools
function notTools() {
    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 123) { // F12
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) { // Ctrl+Shift+I (Inspect Element)
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) { // Ctrl+Shift+I (Inspect Element)
            e.preventDefault();
        }
    });
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        alert("Hong Cóa Đâu Hee !!");
    });
}

notTools();

// Hàm xác thực mật mã
function checkPassword() {
    var password = document.getElementById("password-input").value;
    var errorMessage = document.getElementById("error-message");
    var authButton = document.getElementById("auth-button"); // Nút xác thực

    // Kiểm tra mật mã (ví dụ mật mã đúng là "1234")
    if (password === "1234") {
        // Hiển thị hiệu ứng loading trong nút xác thực
        authButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang xác thực...`;
        authButton.disabled = true;  // Vô hiệu hóa nút xác thực để ngừng nhấn trong khi xác thực

        var currentTime = new Date().getTime();
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("authTime", currentTime);

        setTimeout(function () {
            window.location.href = "./form_ia_report.html";
        }, 1200);

    } else {
        // Hiển thị thông báo lỗi nếu mật mã sai
        errorMessage.textContent = "Mật mã không đúng. Vui lòng thử lại.";
    }
}

// Kiểm tra trạng thái xác thực khi tải lại trang
window.onload = function () {
    var authTime = localStorage.getItem("authTime");
    var currentTime = new Date().getTime();

    if (localStorage.getItem("authenticated") === "true" && (currentTime - authTime < 6 * 60 * 60 * 1000)) {
        window.location.href = "./form_ia_report.html"; // Đẩy qua trang báo cáo
    } else {
        // Nếu xác thực hết hạn, xóa trạng thái và yêu cầu nhập lại mật mã
        localStorage.removeItem("authenticated");
        localStorage.removeItem("authTime");

        // Nếu đang ở trang xác thực, không cần chuyển hướng
        if (window.location.pathname !== "/auth_ia.html") {
            window.location.href = "./auth_ia.html";
        }
    }
}

