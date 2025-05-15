export interface hotels {
    id?: number;
    name: string;
    description: string;
    type_accomodation: 'hotel' | 'hostel' | 'motel' | 'airbnb' | 'other';
    country: string;
    city: string;
    address: string;
    phone: string;
    email: string;
}