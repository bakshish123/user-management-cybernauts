export interface User {
  _id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface CreateUserDTO {
  username: string;
  age: number;
  hobbies: string[];
}

export interface UpdateUserDTO {
  username?: string;
  age?: number;
  hobbies?: string[];
}

export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    user?: User;
    hobby?: string;
  };
}