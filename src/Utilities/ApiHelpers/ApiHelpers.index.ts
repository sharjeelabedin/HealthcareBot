import axios from "axios";
// import forEach from "lodash.foreach";
import { useNavigate } from "react-router-dom";

// import envConsts from '../internals/env/env_constants';
const Axios = axios.create();

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    //Error from Server
    if (error.response) {
      // interceptor to redirect user to login page if not authorized
      if (error.response.status === 401) {
        // if response status is 401 unauthorised
        localStorage.removeItem("access_token"); // remove token from local storage
        localStorage.removeItem("user_name"); // remove user data from local storage
        if (window.location.pathname !== "/") {
          const history = useNavigate();
          history("/"); // redirect to login page
        }
      }
      if (
        error.response.status === 500 &&
        localStorage.getItem("access_token") === null
      ) {
        localStorage.removeItem("access_token"); // remove token from local storage
        localStorage.removeItem("user_name"); // remove user data from local storage
        if (window.location.pathname !== "/") {
          window.location.pathname = "/";
          // const history = useNavigate();
          // history("/"); // redirect to login page
        }
      }

      //Handling the stacktrace
      if (error.response.data.Message) {
        throw error.response.data.Message;
      } else {
        throw error.response.data;
      }
    }
    //Server down
    else if (
      error.request &&
      error.message &&
      error.message.toLowerCase() === "network error"
    ) {
      throw "The server is currently unavailable, or the SSL certificate is not properly installed. Please ensure that the server is running, the certificate is installed correctly, and try again.";
    }
    throw error.response;
  }
);

const createParams = (listOfParams: any) => {
  let array: any = [];
  // forEach(listOfParams, (paramValue, paramKey) => {
  //   array.push(
  //     encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramValue)
  //   );
  // });
  return array.join("&");
};

const buildUrl = (endpointUrl: string, params: any, apiType = null) => {
  const firstEndpointUrlChar = endpointUrl.charAt(0);
  const addSlash = firstEndpointUrlChar === "/" ? "" : "/";
  var api = getAPIUrl();
  let url = api + addSlash + endpointUrl;
  url = !url.endsWith("/") ? url + "/" : url;
  url = params ? url + "?" + createParams(params) : url;
  return url;
};

const fetchToken = (passedToken?: boolean) => {
  //   if (passedToken) {
  //     return `${passedToken}`;
  //   }
  const token = `${localStorage.getItem("access_token")}`;
  return token;
};

export const testConnection = (url: string) => {
  return Axios.get(url);
};

export const getRequest = (
  url: string,
  params = null,
  hasHeaders: boolean = true
) => {
  const token = fetchToken();
  return Axios.get(
    `${buildUrl(url, params)}`,
    hasHeaders
      ? {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      : undefined
  );
};

export const postRequest = (
  url: string,
  params: any = null,
  hasHeaders: boolean,
  data: any,
  apiType: any = null
) => {
  const token = fetchToken();
  return Axios.post(
    `${buildUrl(url, params, apiType)}`,
    data,
    hasHeaders
      ? {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      : undefined
  );
};

export const putRequest = (
  url: string,
  params = null,
  hasHeaders: boolean,
  data: any,
  apiType = null
) => {
  const token = fetchToken();
  return Axios.put(
    `${buildUrl(url, params, apiType)}`,
    { ...data },
    hasHeaders
      ? {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      : undefined
  );
};

export const deleteRequest = (
  url: string,
  params: any = null,
  hasHeaders: boolean,
  data: any
) => {
  const token = fetchToken();
  return Axios.delete(`${buildUrl(url, params)}`, {
    headers: hasHeaders
      ? {
          Authorization: "Bearer " + token,
        }
      : undefined,
    data: data,
  });
};

export const patchRequest = (
  url: string,
  params = null,
  hasHeaders: boolean,
  data: any
) => {
  const token = fetchToken();
  return Axios.patch(
    `${buildUrl(url, params)}`,
    { ...data },
    hasHeaders
      ? {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      : undefined
  );
};

export const postRequestWithAbort = (
  url: string,
  params: any = null,
  hasHeaders: boolean,
  data: any,
  apiType: any = null,
  signal: any
) => {
  const token = fetchToken();
  return Axios.post(`${buildUrl(url, params, apiType)}`, data, {
    headers: hasHeaders
      ? {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      : undefined,
    signal: signal,
  });
};

export const getAPIUrl = () => {
  return "https://localhost:9092";
};
