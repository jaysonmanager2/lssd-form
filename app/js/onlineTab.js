// Lưu trạng thái vào localStorage
const ONLINE_USERS_KEY = 'onlineUsers';
const tabId = Date.now().toString();

// Cập nhật số người online
const updateCount = () => {
    const onlineUsers = JSON.parse(localStorage.getItem(ONLINE_USERS_KEY)) || [];
    const now = Date.now();

    // Xóa các tab cũ không còn hoạt động
    const activeUsers = onlineUsers.filter((user) => now - user < 3000);

    // Thêm tab hiện tại
    activeUsers.push(now);
    localStorage.setItem(ONLINE_USERS_KEY, JSON.stringify(activeUsers));

    // Hiển thị số người online
    document.getElementById('onlineUsers').innerText = activeUsers.length;
};

// Lặp lại để kiểm tra các tab mỗi 3 giây
setInterval(updateCount, 3000);
window.addEventListener('beforeunload', () => {
    const onlineUsers = JSON.parse(localStorage.getItem(ONLINE_USERS_KEY)) || [];
    const newUsers = onlineUsers.filter((user) => user !== parseInt(tabId));
    localStorage.setItem(ONLINE_USERS_KEY, JSON.stringify(newUsers));
});

updateCount();