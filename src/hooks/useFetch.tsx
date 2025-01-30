import apiUtil from "@/utils/api";

/**
 * useFetch
 * A hook that provides post and get functions from the apiUtil for making API requests.
 * Additions such as error handling or loading state management can be incorporated based on the project's needs.
 */
export default function useFetch() {
  // Return an object with post and get functions from apiUtil
  return {
    // Function for making POST requests
    post: apiUtil.post,

    // Function for making GET requests
    get: apiUtil.get,
  };
}
