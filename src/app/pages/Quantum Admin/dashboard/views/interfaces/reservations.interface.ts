export interface reservations{
    id: number,
    status: status,
    check_in: Date,
    check_out: Date,
    created_at: Date,
    updated_at: Date,
}

export interface status{
    canceled: string,
    confirmed: string,
    refunded: string,
}