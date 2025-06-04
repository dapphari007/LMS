// Log environment variables for debugging
console.log("Environment variables:", {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
});

// Get the base API URL from environment variables
let baseApiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Remove trailing slash if present
if (baseApiUrl.endsWith('/')) {
  baseApiUrl = baseApiUrl.slice(0, -1);
}

// Ensure we don't have duplicate /api in the URL
const apiUrl = baseApiUrl.endsWith('/api') ? baseApiUrl : `${baseApiUrl}/api`;

console.log("Using API URL:", apiUrl);

const config = {
  apiUrl,
};

export default config;
