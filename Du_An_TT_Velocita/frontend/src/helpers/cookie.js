/**
 * Helper quản lý Cookie ở Client side
 */

// Thiết lập Cookie
export const setCookie = (name, value, days = 7) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  const serializedValue = typeof value === 'object' ? JSON.stringify(value) : value;
  document.cookie = `${name}=${encodeURIComponent(serializedValue)}${expires}; path=/; SameSite=Lax`;
};

// Đọc Cookie
export const getCookie = (name) => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const val = decodeURIComponent(c.substring(nameEQ.length, c.length));
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    }
  }
  return null;
};

// Xóa Cookie
export const removeCookie = (name) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
};
