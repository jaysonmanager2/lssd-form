function copyAllToClipboard(event) {
    const labels = document.querySelectorAll('label');
    const inputs = document.querySelectorAll('input, select, textarea');
    const errorMessage01 = document.querySelector('.error-mess');
    let textToCopy = '';
    let missingFields = [];

    // Danh sách các trường bắt buộc nhập
    const requiredFields = [
        { id: "input-1", name: "Tên" },
        { id: "input-2", name: "CSVGS" },
        { id: "input-3", name: "Vi phạm" },
        { id: "input-4", name: "Biện pháp" }
    ];

    // Kiểm tra xem có trường nào bị bỏ trống không
    requiredFields.forEach(field => {
        const inputElement = document.getElementById(field.id);
        if (inputElement && inputElement.value.trim() === '') {
            missingFields.push(field.name);
        }
    });

    // Nếu có trường bị thiếu, cảnh báo và dừng sao chép
    if (missingFields.length > 0) {
        errorMessage01.textContent = `Vui lòng nhập đầy đủ thông tin sau:\n- ${missingFields.join("\n- ")}`;
        // alert(`Vui lòng nhập đầy đủ thông tin sau:\n- ${missingFields.join("\n- ")}`);
        return;
    }

    labels.forEach((label, index) => {
        const associatedInput = inputs[index];
        const inputValue = associatedInput.tagName === 'SELECT'
            ? associatedInput.options[associatedInput.selectedIndex].text
            : associatedInput.value;

        if (inputValue.trim() !== '') {
            if (label.textContent.includes('- Đội')) {
                textToCopy += `Tên: ${inputs[0].value} - Đội ${inputs[1].options[inputs[1].selectedIndex].value} \n`;
            } else if (!label.textContent.includes('Tên:')) {
                if (associatedInput.id === "input-4") {
                    textToCopy += `${label.textContent} ${inputValue.trim()} `;
                } else textToCopy += `${label.textContent} ${inputValue}\n`;
            }
        }
    });

    const input5SoKiemSoat = document.getElementById('input-5');
    if (input5SoKiemSoat) {
        textToCopy += `${input5SoKiemSoat.value}`;
    }

    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert(`Đã cóp py:\n${textToCopy}`);
        });
    } else {
        alert('Hong thấy dữ liệu! dui lòng viết dô đi');
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
