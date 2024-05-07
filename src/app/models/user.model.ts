export interface User {
    email: string;
    role: string; // Consider using an enum if UserRole has predefined values
    phoneNumber: string;
    firstName: string;
    lastName: string;
  }