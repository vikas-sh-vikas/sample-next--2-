/**
 * Api.ts
 * In this Component All fetch methods like GET,POST,PATCH are defined commonly so we can use ApiUtil class throughout the Project.
 */
import Utils from "@/utils/index";
import AuthUtil from "@/utils/auth";
import { StoreUtil } from "@/utils/store";
// Base URL for API requests
const BASEURL = process.env.NEXT_PUBLIC_API_BASEURL || "/";
// Token keys
const NEXT_PUBLIC_ACCESS_TOKEN_KEY =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || "";
const NEXT_PUBLIC_REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "";
if (typeof window !== "undefined") {
  // Get the site's base URL from the window location
  const NEXT_PUBLIC_SITE_BASEURL = window.location.origin || "/";
}
``;

// Default headers for API requests
const DEFAULT_HEADERS: RequestInit = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrer: "no-referrer",
};
// Class definition for ApiUtil
class ApiUtil {
  /**
   * Get an instance of the ApiUtil class
   */
  static getClientInstance() {
    return new ApiUtil();
  }

  private abortControllers: Array<AbortController> = [];

  /**
   * Validate the request data
   */
  private validateRequest(data: any) {
    if (data.constructor.name == "FormData") return data;
    else return JSON.stringify(data);
  }

  /**
   * Validate the API response
   */
  private async validateResponse(response: Response) {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();
      const token = data?.data?.authToken;
      if (token) AuthUtil.setToken(token);
      return await data;
    } else if (
      contentType?.includes("application/octet-stream") ||
      contentType?.includes("application/zip")
    ) {
      return await response.blob();
    }
  }

  /**
   * Common function for making API requests
   */
  private async apiFetch(
    url: string,
    requestInit: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
    requestData: object | undefined = undefined
  ): Promise<any> {
    try {
      if (!url) throw "No url provided";
      const init = {
        ...DEFAULT_HEADERS,
        ...requestInit,
        ...(requestData ? { body: this.validateRequest(requestData) } : {}),
      };
      init.headers = {
        ...(init.headers ?? {}),
        ...AuthUtil.getToken(),
      };
      const response = await fetch(`${BASEURL}${url}`, init);
      if (response.status >= 200 && response.status <= 299) {
        return this.validateResponse(response);
      } else {
        if (response.status == 403 || response.status == 401) {
          StoreUtil.removeCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY);
          StoreUtil.removeCookie(NEXT_PUBLIC_REFRESH_TOKEN_KEY);
          StoreUtil.removeAllCookies();
          // alert({
          //   type: 'error',
          //   title: 'Time out',
          //   description: 'Session time out , please login again ',
          // });
          Utils.sleep(1500);

          // reload to site main page
          Utils.redirectUrl("/auth/login");
        }
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      this.errorHandler(error);
    }
  }

  /**
   * Make a GET request
   */
  public get = async (url: string, data = {}, headers = {}): Promise<any> => {
    return await this.apiFetch(`${url}${Utils.getQueryString(data)}`, {
      ...(headers ? { headers } : {}),
      method: "GET",
    });
  };

  /**
   * Make a POST request
   */
  public post = async (url: string, data = {}, headers?: any): Promise<any> => {
    return await this.apiFetch(
      url,
      {
        ...(headers ? { headers } : {}),
        method: "POST",
      },
      data
    );
  };
  /**
   * Make a patch request
   */
  public async patch(url: string, data = {}, headers?: any): Promise<any> {
    return await this.apiFetch(
      // `${url}${Utils.getQueryString(data)}`,
      `${url}`,
      {
        ...(headers ? { headers } : {}),
        method: "PATCH",
      },
      data
    );
  }
  /**
   * Make a delete request
   */
  public async delete(url: string, data = {}, headers?: any): Promise<any> {
    return await this.apiFetch(
      `${url}${Utils.getQueryString(data)}`,
      {
        ...(headers ? { headers } : {}),
        method: "DELETE",
      },
      data
    );
  }
  // Handle API request errors
  public errorHandler(error: any) {
    console.error(error);
  }
  // Abort all ongoing API requests
  public abortAllRequests = () => {
    for (let controller of this.abortControllers) {
      controller.abort();
    }
    this.abortControllers = [];
  };
  // Handler for aborted requests
  public abortRequestHandler = (abort: any) => {};
}
// Singleton instance of ApiUtil
const apiUtil: ApiUtil = ApiUtil.getClientInstance();
export { apiUtil as default };
