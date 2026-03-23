// src/services/commonAPI.js

const commonAPI = async (method, url, body = null) => {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(url, options);
  const data     = await response.json();

  // Return both status and data so caller can check
  return { status: response.status, data };
};

export default commonAPI;