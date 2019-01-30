import { fetch } from "./fetch";

export const login = async (email, password) => {
  return await fetch("auth", { method: "POST", body: { email, password } }).then(async result => {
    console.log(result);
    if (result) {
      window.localStorage.setItem("jwt", result.jwt);
      const userId = userIdFromJwt(result.jwt);
      return await fetch(`users/${userId}`).then(res => {
        return res;
      });
    }
  });
};

export const logout = () => {
  window.localStorage.removeItem("jwt");
};

export const checkSession = async () => {
  const jwt = await window.localStorage.getItem("jwt");
  if (jwt) {
    const userId = userIdFromJwt(jwt);
    return await fetch(`users/${userId}`).then(res => {
      return res;
    });
  }
};

const userIdFromJwt = jwt => {
  const base64 = jwt
    .split(".")[1]
    .replace("-", "+")
    .replace("_", "/");
  return JSON.parse(window.atob(base64)).id;
};
