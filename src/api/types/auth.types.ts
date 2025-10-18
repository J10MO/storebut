

export interface LoginRequest {
  phone: string;
}

export interface RegisterRequest {
  phone: string;
  name: string;
  email: string;
  address: Address;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    phone: string;
    name: string;
    email: string;
    role: string;
  };
}