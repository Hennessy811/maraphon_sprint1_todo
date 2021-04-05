import { BASE_URL } from '../config';
// type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const parseStatus = (res, data) => {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      data.then(response => resolve(response));
    } else {
      data.then(response => reject({ code: res.status, response }));
    }
  });
};

/**
 * Base request method to get data from remote source with error handling, headers and stuff
 *
 * @template T type of returned data
 * @param {string} url URL where to get data from, BASE_URL appended by default. If its full valid url like https://google.com we use it instead of appending it to BASE_URL
 * @param {RequestMethod} [method="GET"] request method
 * @param {never} [body] data passed to the request, except GET method
 * @param {RequestInit} [options] custom options, like options objects in fetch. Will be appended last.
 * @param {boolean} [skipToken=false] Authorization header appended by default, will be skipped if this param is true
 * @param {boolean} [emptyResponse=false] If true, dont try to get JSON from the response to avoid errors
 * @returns {Promise<T>} response promise of given type
 */
export const request = (url, method = 'GET', body = {}, options = {}, skipToken = false, emptyResponse = false) => {
  const reqOptions = {
    method,
    headers: requestHeaders(skipToken),
    body: method !== 'GET' ? JSON.stringify(body) : null,
    ...options,
  };

  // If provided url is valid full url, like https://google.com we use it,
  // instead of appending it to BASE_URL
  let useBaseUrl = true;
  try {
    const validUrl = new URL(url);
    if (validUrl) useBaseUrl = false;
  } catch {}

  return fetch(`${useBaseUrl ? BASE_URL : ''}${url}`, reqOptions)
    .then(res => parseStatus(res, emptyResponse ? new Promise(resolve => resolve(null)) : res.json()))
    .catch(e => {
      throw new Error(e.response.message);
    });
};

export const requestHeaders = (skipToken = false) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  // if (!skipToken) {
  // 	const token = getJwt();
  // 	headers.append("Authorization", `Bearer ${token}`);
  // }

  return headers;
};
