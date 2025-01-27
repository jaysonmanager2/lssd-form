function copyAllToClipboard() {
    const labels = document.querySelectorAll('label');
    const inputs = document.querySelectorAll('input, select, textarea');
    let textToCopy = '';

    labels.forEach((label, index) => {
        const associatedInput = inputs[index];
        let inputValue = '';

        if (associatedInput.tagName === 'SELECT') {
            // Lấy giá trị từ <select>
            inputValue = associatedInput.options[associatedInput.selectedIndex].text;
        } else if (associatedInput.type === 'date') {
            // Chuyển đổi định dạng ngày (dd/MM/yyyy)
            const rawDate = associatedInput.value;
            if (rawDate) {
                const [year, month, day] = rawDate.split('-');
                inputValue = `${day}/${month}/${year}`;
            }
        } else {
            // Lấy giá trị từ input hoặc textarea
            inputValue = associatedInput.value;
        }

        if (inputValue.trim() !== '') {
            textToCopy += `${label.textContent} ${inputValue}\n`;
        }
    });


    // Sao chép dữ liệu vào clipboard
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert(`Đã copy:\n________________________________\n${textToCopy}`);
        });
    } else {
        alert('Không thấy dữ liệu! Vui lòng nhập vào.');
    }
}

function resetValue() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
        } else {
            input.value = '';
        }
    });
}

function selectSuggestion(element, inputId) {
    const inputField = document.getElementById(inputId);

    // Thêm nội dung gợi ý vào ô input
    const newValue = element.textContent;
    if (inputField.value) {
        inputField.value += `, ${newValue}`; // Thêm dấu phẩy nếu input không rỗng
    } else {
        inputField.value = newValue;
    }

    // Xóa gợi ý được nhấn
    element.remove();
}

// Lấy ngày hiện tại
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Thêm 0 nếu tháng < 10
const dd = String(today.getDate()).padStart(2, '0'); // Thêm 0 nếu ngày < 10

// Định dạng ngày thành yyyy-MM-dd
const formattedDate = `${yyyy}-${mm}-${dd}`;

// Gán giá trị mặc định cho input
const dateInput = document.getElementById('input-6');
dateInput.value = formattedDate;