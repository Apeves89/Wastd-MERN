function setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }
  
  function getToken() {
    // getItem will return null if the key does not exists
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    // A JWT's exp is expressed in seconds, not miliseconds
    if (payload.exp * 1000 < Date.now()) {
        // Token has expired
        localStorage.removeItem('token');
        return null;
    }
    return token;
  }
  
  function getUserFromToken() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }
  
  function removeToken() {
    localStorage.removeItem('token');
  }
  
  export default {
    setToken,
    getToken,
    removeToken,
    getUserFromToken
  };