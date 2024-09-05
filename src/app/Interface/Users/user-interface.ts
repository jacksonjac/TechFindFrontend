export interface UserData {
    _id: string;
    name: string;
    email: string;
    phone: number;
    district: string;
    password: string;
    verified: boolean;
    blocked: boolean;
    google: boolean;
    slots: any[]; // Use a specific type if you know the structure
    __v: number;
  }
  
  export interface LoginResponse {
    status: boolean;
    message: string;
    data: UserData;
    AcessToken: string;
    RefreshToken?: string; // Optional, if not always present
  }
  
  export interface UserInterface {
    email: string;
    password: string;
  }  