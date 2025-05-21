export interface pago_reserva {
  id: number;
  payment_date: Date;
  status: 'pending' | 'canceled' | 'confirmed' | 'refunded';
  amount: number;
  payment_method: 'visa' | 'mastercard' | 'paypal' | 'other';
  created_at: Date;
  updated_at: Date;
  reservation?: {
    id?: number;
    check_in?: string;
    check_out?: string;
    status?: string;
    created_at?: Date;
    updated_at?: Date;
  };
  client?: {
    id: number;
    name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    country?: string;
    type_document?: string;
    number_document?: string;
    birth_date?: string;
    rol?: string;
  };
  room?: {
    id: number;
    name?: string;
    description?: string;
    price?: number;
    ability?: string;
    status?: string;
    image?: string;
  };
}
