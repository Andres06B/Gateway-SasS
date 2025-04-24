export interface rooms{
    id: number,
    name: string,
    description: string,
    price: number,
    status: 'free' | 'busy' | 'booked',
    ability: string,
    image: string,
}

