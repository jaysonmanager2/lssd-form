function copyAllToClipboard() {
    const labels = document.querySelectorAll('label');
    const inputs = document.querySelectorAll('input, select, textarea');
    let textToCopy = '';

    labels.forEach((label, index) => {
        const associatedInput = inputs[index];
        const inputValue = associatedInput.tagName === 'SELECT'
            ? associatedInput.options[associatedInput.selectedIndex].text
            : associatedInput.value;

        if (inputValue.trim() !== '') {
            if (label.textContent.includes('- Đội')) {
                textToCopy += `Tên: ${inputs[0].value} - Đội ${inputs[1].options[inputs[1].selectedIndex].text}: \n`;
            } else if (!label.textContent.includes('Tên:')) {
                textToCopy += `${label.textContent} ${inputValue}\n`;
            }
        }
    });
    // Thêm chữ ' ' từ span ẩn vào textToCopy
    // const hiddenText = document.querySelector('#hidden-text');
    // if (hiddenText) {
    //     textToCopy += `${hiddenText.textContent}\n`;
    // }
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert(`Đã cóp py:\n${textToCopy}`);
        });
    } else {
        alert('Hong thấy dữ liệu! dui lòng viết dô đi');
    }
}