
export const verifyAccess = () => {
  let session =  localStorage.getItem("username") || '';
  return session;
};

export const tempVerifyAccess = () => {
  const templogin = localStorage.getItem("templogin");
  if(!templogin) {
    return '';
  }
  const item = JSON.parse(templogin);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem('templogin')
    return '';
  }
  return item.value;
};