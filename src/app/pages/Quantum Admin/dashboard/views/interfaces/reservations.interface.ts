export interface reservations{
    id?: number,
    status: 'confirmed' | 'canceled' | 'refunded',
    room?:{
        id: number
    },
    client?: {
        id: number
    },
    check_in: Date,
    check_out: Date,
    created_at?: Date,
    updated_at?: Date,
}

