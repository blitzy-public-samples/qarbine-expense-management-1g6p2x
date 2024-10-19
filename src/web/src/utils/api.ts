// External Dependencies
import axios from 'axios'; // axios version 0.21.1

// Internal Dependencies
import { TOKEN_KEY } from './auth';
import { API_BASE_URL } from './constants';

/**
 * fetchData
 *
 * Description:
 * Makes an HTTP GET request to the specified endpoint and returns the response data.
 *
 * Requirements Addressed:
 * - Seamless Integration (Technical Specification/1.3 System Objectives)
 *   Integrate effortlessly with existing accounting, HR, and payroll systems to ensure data consistency.
 *   This function facilitates communication with backend services to retrieve data, supporting seamless integration with external systems.
 *
 * @param endpoint - The API endpoint to make the GET request to.
 * @returns A promise that resolves to the response data from the API.
 */
export async function fetchData(endpoint: string): Promise<object> {
  // Step 1: Construct the full URL using API_BASE_URL and the provided endpoint.
  const url = `${API_BASE_URL}${endpoint}`;

  // Step 2: Retrieve the authentication token from local storage using TOKEN_KEY.
  const token = localStorage.getItem(TOKEN_KEY);

  try {
    // Step 3: Make a GET request to the constructed URL using axios, including the token in the headers.
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Step 4: Return the response data from the API.
    return response.data;
  } catch (error) {
    // Handle errors appropriately.
    throw error;
  }
}

/**
 * postData
 *
 * Description:
 * Makes an HTTP POST request to the specified endpoint with the provided data and returns the response.
 *
 * Requirements Addressed:
 * - Seamless Integration (Technical Specification/1.3 System Objectives)
 *   Integrate effortlessly with existing accounting, HR, and payroll systems to ensure data consistency.
 *   This function sends data to backend services, supporting seamless integration with external systems.
 *
 * @param endpoint - The API endpoint to make the POST request to.
 * @param data - The data to be sent in the body of the POST request.
 * @returns A promise that resolves to the response from the API.
 */
export async function postData(endpoint: string, data: object): Promise<object> {
  // Step 1: Construct the full URL using API_BASE_URL and the provided endpoint.
  const url = `${API_BASE_URL}${endpoint}`;

  // Step 2: Retrieve the authentication token from local storage using TOKEN_KEY.
  const token = localStorage.getItem(TOKEN_KEY);

  try {
    // Step 3: Make a POST request to the constructed URL using axios,
    // including the token in the headers and the provided data in the body.
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Step 4: Return the response from the API.
    return response.data;
  } catch (error) {
    // Handle errors appropriately.
    throw error;
  }
}