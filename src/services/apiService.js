const API_BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch (e) {
      // If response is not JSON, use status text
      errorData = { message: response.statusText };
    }
    const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  return response.json();
};

const apiService = {
  get: async (url, token) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return handleResponse(response);
  },

  post: async (url, data, token) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (url, data, token) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (url, token) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return handleResponse(response);
  },
};

export default apiService;


