import jwtDecode from "jwt-decode";

function decode(token) {
    if (!token) return false;

    const decode = jwtDecode(token);

    return decode;
}

export const setSession = accessToken => {
    sessionStorage.setItem('accessToken', accessToken)
    sessionStorage.setItem("isAuthenticated", true); // Set the value to boolean true

    const decodeOBJ = decode(accessToken);

    sessionStorage.setItem("role", decodeOBJ.user.role);
    
}