import { AUTH_TOKEN, USER_NAME } from "./constants";

// TODO better token management
// There are risks with using localStorage for API tokens in a production
// application. You open yourself up to XSS attacks. If malicious
// JavaScript makes it into your app, that JavaScript will have access
// to localStorage and therefore any sensitive tokens.

// For more info on token management, see this article:
// https://auth0.com/blog/cookies-vs-tokens-definitive-guide/
class Client {
  constructor() {
    this.useLocalStorage = (typeof localStorage !== "undefined");
    this.subscribers = [];

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(AUTH_TOKEN);
      this.name = localStorage.getItem(USER_NAME);
    } else {
      throw new Error("localStorage not available on this browser!");
    }
  }

  isTokenSet() {
    return !!this.token;
  }

  getName() {
    return this.name;
  }

  subscribe(cb) {
    this.subscribers.push(cb);
  }

  notifySubscribers() {
    this.subscribers.forEach(cb => cb(this.isTokenSet()));
  }

  setToken(token, name) {
    this.token = token;
    this.name = name;

    if (this.useLocalStorage) {
      localStorage.setItem(AUTH_TOKEN, token);
      localStorage.setItem(USER_NAME, name);
    }
  }

  removeToken() {
    this.token = null;
    this.name = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(USER_NAME);
    }
  }
}

export const client = new Client();
