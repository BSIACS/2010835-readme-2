export interface UserInterface{
  _id?: string;
  email: string;
  name: string;
  surname: string;
  passwordHash: string;
  avatar: string;
  registerDate: Date;
  postQuantity: number;
  subscribers: string[];
  subscribersQuantity: number;
}
