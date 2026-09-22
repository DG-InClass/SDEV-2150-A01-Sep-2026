// js/api/nait-resources.js

export async function getResources(endpoint) {
  let result = [];
  try {
    const response = await fetch(endpoint);
    const data = await handleJsonResponse(response); // we're expecting to have JSON
    result = data;
  } catch (error) {
    throw new Error(`Other non-network failure: ${error?.message}`, { cause: error?.cause });
  }
  return result;
}

// A Promise-API based approach to getResources()
/**
 * This getResources2 is my person preferred way to do API calls
 *
 * @example
 * getResources2(sourceUrl)
 *   .then(data => this.results) // Setting my .results
 *   .catch(handleError)         // Pass function to handler
 * @param {string} endpoint - The URL for the NAIT Resources data
 * @returns {Promise<Object>} - The data as a Promise object
 */
export function getResources2(endpoint) {
  return fetch(endpoint).then(handleJsonResponse);
}

// #region General-purpose fetch utility functions
async function handleJsonResponse(response) {
  // Check that everything is ok
  if (!response.ok) {
    throw new Error(`Network response was not ok: (${response.status}) ${response.statusText}`);
  }
  // Check that the actual info sent back is JSON
  const contentType = response.headers.get('content-type');
  if (!contentType || contentType.includes('application/json')) {
    throw new Error(`Response type is not JSON. ${contentType}`);
  }

  return response.json();
}
// #endregion
