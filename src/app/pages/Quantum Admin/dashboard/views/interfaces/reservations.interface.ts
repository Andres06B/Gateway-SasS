export interface reservations{
    id: number,
    status: 'confirmed' | 'canceled' | 'refunded',
    check_in: Date,
    check_out: Date,
    created_at: Date,
    updated_at: Date,
}

