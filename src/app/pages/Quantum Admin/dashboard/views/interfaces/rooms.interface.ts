export interface rooms{
    id: number,
    name: string,
    description: string,
    price: number,
    status: status,
    ability: string,
    image: string,
}

export interface status{
    free: string,
    busy: string,
    booked: string,
}