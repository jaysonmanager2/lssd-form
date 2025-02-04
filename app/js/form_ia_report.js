function copyAllToClipboard(event) {
    const errorMessage01 = document.querySelector('.error-mess');
    let textToCopy = '';
    let missingFields = [];

    // Danh sách các trường bắt buộc nhập
    const requiredFields = [
        { id: "input-1", name: "Tên" },
        // { id: "input-2", name: "CSVGS" },
        { id: "input-3", name: "Vi phạm" },
        { id: "input-4", name: "Biện pháp" },
        { id: "input-7", name: "Tên đối tượng" },
        { id: "input-6", name: "CCCD" },
    ];

    // Kiểm tra xem có trường nào bị bỏ trống không
    requiredFields.forEach(field => {
        const inputElement = document.getElementById(field.id);
        if (inputElement && inputElement.value.trim() === '') {
            missingFields.push(field.name);
        }
    });
    //

    // Nếu có trường bị thiếu, cảnh báo và dừng sao chép
    if (missingFields.length > 0) {
        errorMessage01.textContent = `Vui lòng nhập đầy đủ thông tin sau:\n- ${missingFields.join("\n- ")}`;
        return;
    }

    // Thu thập dữ liệu
    const tenViPham = document.getElementById("input-1").value.trim();
    const soCanhSat = document.getElementById("select-1").value;
    const canhSatVienGS = document.getElementById("input-2").value.trim();
    const viPham = document.getElementById("input-3").value.trim();
    const bienPhap = document.getElementById("input-4").value.trim();
    const cccd = document.getElementById("input-6").value.trim();
    const tenDoiTuong = document.getElementById("input-7").value.trim();

    textToCopy += tenViPham && soCanhSat ? `Tên: ${tenViPham} - Đội ${soCanhSat}\n` : '';
    textToCopy += canhSatVienGS ? `CSVGS: ${canhSatVienGS}\n` : '';
    textToCopy += viPham ? `Vi phạm: ${viPham}\n` : '';
    textToCopy += bienPhap ? `Biện pháp: ${bienPhap} <@&1178655002810667059>\n` : '';
    textToCopy += tenDoiTuong ? `Tên đối tượng: ${tenDoiTuong}\n` : '';
    textToCopy += cccd ? `CCCD: ${cccd}\n` : '';

    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert(`Đã sao chép:\n________\n${textToCopy}`);
        });
    } else {
        alert('Không có dữ liệu để sao chép! Vui lòng nhập thông tin.');
    }
}

// Hàm xác thực mật mã
function checkPassword() {
    var password = document.getElementById("password-input").value;
    var errorMessage = document.getElementById("error-message");

    // Kiểm tra mật mã (ví dụ mật mã đúng là "1234")
    if (password === "1234") {
        // Ẩn phần xác thực và hiển thị form báo cáo
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("report-form").classList.remove("hidden");
    } else {
        // Hiển thị thông báo lỗi nếu mật mã sai
        errorMessage.textContent = "Mật mã không đúng. Vui lòng thử lại.";
    }
}

function selectSuggestion(element, inputId) {
    const inputField = document.getElementById(inputId);

    // Thêm nội dung gợi ý vào ô input
    const newValue = element.textContent;
    if (inputField.value) {
        inputField.value += ` ${newValue}`; // Thêm dấu phẩy nếu input không rỗng
    } else {
        inputField.value = newValue;
    }
    // Xóa gợi ý được nhấn
    element.remove();
}