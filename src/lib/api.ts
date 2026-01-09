const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function for API calls
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Appetizer API calls
export const appetizerAPI = {
  getAll: () => apiCall<Appetizer[]>('/appetizers'),
  getById: (id: string) => apiCall<Appetizer>(`/appetizers/${id}`),
  create: (appetizer: Omit<Appetizer, 'id'>) => 
    apiCall<Appetizer>('/appetizers', {
      method: 'POST',
      body: JSON.stringify(appetizer),
    }),
  update: (id: string, appetizer: Partial<Appetizer>) =>
    apiCall<Appetizer>(`/appetizers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appetizer),
    }),
  delete: (id: string) =>
    apiCall<{ message: string }>(`/appetizers/${id}`, {
      method: 'DELETE',
    }),
  deleteAll: () =>
    apiCall<{ message: string; count: number }>('/appetizers/all', {
      method: 'DELETE',
    }),
  seed: () =>
    apiCall<{ message: string; count: number }>('/appetizers/seed', {
      method: 'POST',
    }),
};

// Coupon API calls
export const couponAPI = {
  getAll: () => apiCall<Coupon[]>('/coupons'),
  getById: (id: string) => apiCall<Coupon>(`/coupons/${id}`),
  getByCode: (code: string) => apiCall<Coupon>(`/coupons/code/${code}`),
  create: (coupon: Omit<Coupon, 'id' | 'code' | 'createdAt'>) =>
    apiCall<Coupon>('/coupons', {
      method: 'POST',
      body: JSON.stringify(coupon),
    }),
  delete: (id: string) =>
    apiCall<{ message: string }>(`/coupons/${id}`, {
      method: 'DELETE',
    }),
};

// Types (matching backend models)
export interface Appetizer {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface OrderItem {
  appetizer: Appetizer;
  quantity: number;
}

export interface Coupon {
  _id?: string;
  id?: string;
  code: string;
  items: OrderItem[];
  createdAt: Date | string;
}

