/**
 * Auth.ts
 * This Auth Component is used for user session management.
 */

import Utils from ".";
import { Active_Module_Id } from "@/utils/constants";
import { StoreUtil } from "@/utils/store";

// Define constants for access and refresh token keys
const NEXT_PUBLIC_ACCESS_TOKEN_KEY =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || "";
const NEXT_PUBLIC_REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "";

// Check if the code is running in the browser before using window.location
if (typeof window !== "undefined") {
  // Get the base URL of the site
  const NEXT_PUBLIC_SITE_BASEURL = window.location.origin || "/";
}

class AuthUtil {
  /**
   * Fetch and set the details of the logged-in user.
   * @returns Promise with the logged-in user details.
   */
  static async setLoggedUserDetail() {
    return await AuthUtil.getLoggedUserDetail();
  }

  /**
   * Get the details of the logged-in user.
   * @returns Promise with the logged-in user details or undefined if not logged in.
   */
  static async getLoggedUserDetail<TUser>(): Promise<TUser | undefined> {
    return undefined;
  }

  /**
   * Fetch user preferences.
   * @returns Promise with user preferences or null if not available.
   */
  static async fetchPreferences<TPreference>(): Promise<TPreference | null> {
    return null;
  }

  /**
   * Logout the user.
   * @param locally - If true, perform local logout without server interaction.
   * @param history - History object to navigate to the main page after logout.
   * @returns Promise with a boolean indicating the success of the logout.
   */
  static async logout(
    locally = false,
    { history }: any = {}
  ): Promise<Boolean> {
    try {
      if (!locally) {
        // Perform server logout actions if needed
      }
    } catch (e) {
      // Handle any errors during logout
    } finally {
      // Remove access and refresh tokens and all cookies
      StoreUtil.removeCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY);
      StoreUtil.removeCookie(NEXT_PUBLIC_REFRESH_TOKEN_KEY);
      StoreUtil.removeCookie(Active_Module_Id);
      StoreUtil.removeAllCookies();

      // Reload to the site main page
      if (history) history.push("/");
    }
    return true;
  }

  /**
   * Refresh the access token using the refresh token.
   * @returns Promise with a boolean indicating the success of the token refresh.
   */
  static async refreshToken(): Promise<Boolean> {
    const requestVariables = {
      token: StoreUtil.get(NEXT_PUBLIC_REFRESH_TOKEN_KEY),
    };
    return false;
  }

  /**
   * Check if the access token exists.
   * @returns True if the access token exists, otherwise false.
   */
  static isTokenExist() {
    const token = StoreUtil.getCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY);
    return !Utils.isNullOrUndefined(token);
  }

  /**
   * Set the access token in the cookie.
   * @param token - The access token to be set.
   */
  static setToken(token: string) {
    StoreUtil.setCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY, `Bearer ${token}`);
  }

  /**
   * Get the access token from the cookie.
   * @returns Object with Authorization header or an empty object if the token is not present.
   */
  static getToken(): object {
    const token: any = StoreUtil.getCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY);
    return token ? { Authorization: token } : {};
  }
}

export { AuthUtil as default };
