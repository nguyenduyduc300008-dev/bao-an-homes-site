// Bảo An Homes – nhận số điện thoại khách đăng ký / đăng nhập trên website
// và ghi vào Google Sheet "Bảo An Homes - Danh sách khách đăng nhập".
const SHEET_ID = '1h-mGah5W5Ez_77xtVXK18TLQCQf-qKxyCZuud8VLJhU';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    const phone = String(p.phone || '').replace(/\D/g, '').slice(0, 15);
    if (!/^0\d{9}$/.test(phone)) return ContentService.createTextOutput('invalid');
    const action = p.action === 'login' ? 'Đăng nhập' : 'Đăng ký';
    const page = String(p.page || '').slice(0, 300).replace(/^[=+\-@]/, "'$&");
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    sheet.appendRow([new Date(), "'" + phone, action, page]);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

// Mở link Web app trên trình duyệt để kiểm tra: thấy dòng chữ này là đã chạy.
function doGet() {
  return ContentService.createTextOutput('Bảo An Homes: đang nhận số điện thoại khách hàng.');
}
