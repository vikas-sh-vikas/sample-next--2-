/**
 * Store.ts
 * In this component, we handle cookie management.
 */
import cookie from "react-cookies";
const { NEXT_PUBLIC_SITE_BASEURL } = process.env;
const cookieStorePath = `${NEXT_PUBLIC_SITE_BASEURL || "/"}`;

const defaultOptions = {
  path: cookieStorePath,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export class StoreUtil {
  static set(name: string, data: any, options: object = defaultOptions) {
    if (name && data) sessionStorage.setItem(name, data);
  }

  static get(name: string) {
    return sessionStorage.getItem(name);
  }
  static remove(name: string, options = defaultOptions) {
    sessionStorage.removeItem(name);
  }
  static removeAll() {
    sessionStorage.clear();
  }

  static setCookie(name: string, data: any, options: object = defaultOptions) {
    if (name && data) cookie.save(name, data, options);
  }

  static getCookie(name: string) {
    return cookie.load(name);
  }

  static removeCookie(name: string, options = defaultOptions) {
    cookie.remove(name, options);
  }

  static removeAllCookies() {
    const cookieKeys = cookie.loadAll();
    Object.keys(cookieKeys).map((c) => StoreUtil.remove(c));
  }
}
