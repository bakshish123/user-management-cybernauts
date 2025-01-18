// Data Transfer Object for User
export interface UserDTO {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
  }
  
  // Type for creating a new user (without id)
  export interface CreateUserDTO {
    username: string;
    age: number;
    hobbies: string[];
  }
  
  // Type for updating user data (partial fields allowed)
  export interface UpdateUserDTO {
    username?: string;
    age?: number;
    hobbies?: string[];
  }
  