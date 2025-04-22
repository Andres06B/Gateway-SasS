export interface pago_reserva{
    id: number,
    payment_date:payment_date,
    status: string,
    amount: number,
    payment_method: string,
    created_at: Date,
    updated_at: Date,
}

export interface payment_date{
    pending: string, 
    canceled: string, 
    confirmed: string, 
    refunded: string, 
}

export interface payment_method{
    visa: string, 
    mastercard: string, 
    paypal: string, 
    other: string, 
}