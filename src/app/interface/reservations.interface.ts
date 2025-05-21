export interface reservations{
    id?: number,
    status: 'confirmed' | 'canceled' | 'refunded',
    room?:{
        id: number
        name?: string;
        description?: string;
        price?: number;
        ability?: string;
        status?: string;
        image?: string;

    },
    client?: {
        id: number
        name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
        country?: string;
        type_document?: string;
        number_document?: string;
        birth_date?: string;
        rol?: string;
    },
    check_in: Date,
    check_out: Date,
    created_at?: Date,
    updated_at?: Date,
}

