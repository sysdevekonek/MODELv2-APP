// config.ts
import axios from 'axios';
import { toastInfo } from '@/components/utils/customToasts';

const api = axios.create({
  baseURL: 'http://localhost:4001',
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => {
    // On every successful API response, attempt to refresh token
    if (response.config.url !== '/auth/refresh' && 
        response.status >= 200 && 
        response.status < 300) {
      // refreshTokenSilently().catch(err => {
      //   console.warn('Background token refresh failed:', err);
      // });
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (originalRequest?.url?.includes('/auth/login')) {
      return Promise.reject(error); // let frontend handle it
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const res = await axios.post(
          'http://localhost:4001/auth/refresh',
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = res.data;

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', newRefreshToken);
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        
        // Update Authorization header for the original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        // Process queued requests
        processQueue(null, accessToken);
        
        return api(originalRequest);
      } catch (refreshErr) {
        console.error('Refresh token failed:', refreshErr);
        
        // Process queue with error
        processQueue(refreshErr, null);
        
        // Clear storage and redirect to login
        sessionStorage.clear();
        console.clear();
        toastInfo('Session failed. Please login again.');
        
        // Use window.location for reliable redirect
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
        
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Helper Function to log token status for testing 
// export const logTokenStatus = () => {
//   const accessToken = sessionStorage.getItem('accessToken');
//   const refreshToken = sessionStorage.getItem('refreshToken');
  
//   if (accessToken) {
//     try {
//       const payload = JSON.parse(atob(accessToken.split('.')[1]));
//       const expiresIn = (payload.exp * 1000 - Date.now()) / 1000;
//       console.log(`Access Token expires in: ${expiresIn.toFixed(0)} seconds`);
//     } catch (err) {
//       console.warn('Error parsing access token:', err);
//     }
//   }
  
//   if (refreshToken) {
//     try {
//       const payload = JSON.parse(atob(refreshToken.split('.')[1]));
//       const expiresIn = (payload.exp * 1000 - Date.now()) / 1000;
//       console.log(`Refresh Token expires in: ${expiresIn.toFixed(0)} seconds`);
//     } catch (err) {
//       console.warn('Error parsing refresh token:', err);
//     }
//   }
  
//   if (!accessToken || !refreshToken) {
//     console.log('No tokens found in sessionStorage');
//   }
// };

// // Call this periodically to monitor token status during testing
// setInterval(logTokenStatus, 30000); // Log every 30 seconds

export default api;