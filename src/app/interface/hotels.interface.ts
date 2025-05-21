export interface hotels {
    image: any;
    id?: number;
    name: string;
    description: string;
    type_accomodation: 'hotel' | 'hostel' | 'motel' | 'airbnb' | 'other';
    country: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    available?: boolean;
    rating?: number;
}