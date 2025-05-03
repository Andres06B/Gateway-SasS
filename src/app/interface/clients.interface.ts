export interface clients  {
    id: number,
    name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string,
    country: string,
    rol: string,
    type_document: 'CC'| 'TI' | 'TE' | 'PP' | 'PPT'|'NIT',
    number_document: string,
    birth_date: Date,
}

