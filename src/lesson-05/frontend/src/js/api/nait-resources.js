// js/api/nait-resources.js

export async function getResources(endpoint) {
  let result = [];
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Network response was not ok: (${response.status}) ${response.statusText}`);
    }
    const data = await response.json(); // we're expecting to have JSON
    result = data;
  } catch (error) {
    throw new Error(`Other non-network failure: ${error?.message}`, { cause: error?.cause });
  }
  return result;
}
