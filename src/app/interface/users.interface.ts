export interface IUser {
    id: number;
    name: string;
    last_name: string;
    email: string;
    password: string;
    rol: 'admin' | 'user';
    type_document: 'CC' | 'TI' | 'TE' | 'PP' | 'PPT' | 'NIT';
    number_document: string;
    phone: string;
    country: string;
    city: string;
  }