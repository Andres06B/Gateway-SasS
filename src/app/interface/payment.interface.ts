export interface paymentService {
    id: number;
    name: string;
    description: string;
    price: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    user: {
        id: number;
        name: string;
        last_name: string;
        email: string;
        password: string;
        rol: string;
        type_document: string;
        number_document: string;
        phone: string;
        country: string;
        city: string;
        has_premium_service: boolean;
        has_vip_service: boolean;
    };
}