// API utilities for JWT authentication and data fetching

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiOptions {
  method?: ApiMethod;
  body?: any;
  headers?: Record<string, string>;
  includeAuth?: boolean;
}

/**
 * Base API fetch function with authentication
 */
export const apiFetch = async (
  endpoint: string,
  { method = 'GET', body, headers = {}, includeAuth = true }: ApiOptions = {}
) => {
  const url = endpoint.startsWith('/') ? `/api${endpoint}` : `/api/${endpoint}`;
  
  // Basic headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };
  
  // Add auth header if needed
  if (includeAuth) {
    const token = localStorage.getItem('adminToken');
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }
  
  // Build request options
  const options: RequestInit = {
    method,
    headers: requestHeaders,
  };
  
  // Add body for non-GET requests
  if (method !== 'GET' && body) {
    options.body = JSON.stringify(body);
  }
  
  // Make the request
  const response = await fetch(url, options);
  
  // Handle 401 Unauthorized by redirecting to login
  if (response.status === 401) {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin';
    throw new Error('Unauthorized');
  }
  
  // Parse the response
  if (response.ok) {
    // Return null for 204 No Content
    if (response.status === 204) {
      return null;
    }
    
    // Try to parse as JSON
    return await response.json();
  }
  
  // Handle errors
  const error = await response.text();
  throw new Error(error || 'Unknown error occurred');
};

/**
 * File upload with authentication
 */
export const apiUpload = async (
  endpoint: string,
  formData: FormData,
  onProgress?: (progress: number) => void
) => {
  const url = endpoint.startsWith('/') ? `/api${endpoint}` : `/api/${endpoint}`;
  
  // Get auth token
  const token = localStorage.getItem('adminToken');
  
  return new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    // Setup progress tracking
    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      };
    }
    
    // Handle response
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch {
          resolve(xhr.responseText);
        }
      } else {
        if (xhr.status === 401) {
          localStorage.removeItem('adminToken');
          window.location.href = '/admin';
        }
        reject(new Error(xhr.statusText || 'Upload failed'));
      }
    };
    
    xhr.onerror = () => {
      reject(new Error('Network error during upload'));
    };
    
    // Send the request
    xhr.open('POST', url);
    
    // Set auth header
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
    
    xhr.send(formData);
  });
};

// Typed API helpers
export const api = {
  get: <T>(endpoint: string, options: Omit<ApiOptions, 'method' | 'body'> = {}) => 
    apiFetch(endpoint, { ...options, method: 'GET' }) as Promise<T>,
    
  post: <T>(endpoint: string, data: any, options: Omit<ApiOptions, 'method'> = {}) => 
    apiFetch(endpoint, { ...options, method: 'POST', body: data }) as Promise<T>,
    
  put: <T>(endpoint: string, data: any, options: Omit<ApiOptions, 'method'> = {}) => 
    apiFetch(endpoint, { ...options, method: 'PUT', body: data }) as Promise<T>,
    
  delete: <T>(endpoint: string, options: Omit<ApiOptions, 'method'> = {}) => 
    apiFetch(endpoint, { ...options, method: 'DELETE' }) as Promise<T>,
    
  upload: <T>(endpoint: string, formData: FormData, onProgress?: (progress: number) => void) => 
    apiUpload(endpoint, formData, onProgress) as Promise<T>,
}; 