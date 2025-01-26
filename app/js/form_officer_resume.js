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
            if (label.textContent.includes('- Đội')) {
                textToCopy += `Tên: ${inputs[0].value} - Đội ${inputs[1].options[inputs[1].selectedIndex].text}: \n`;
            } else if (!label.textContent.includes('Tên:')) {
                textToCopy += `${label.textContent} ${inputValue}\n`;
            }
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