export interface clients  {
    id: number,
    name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string,
    country: string,
    rol: string,
    type_document: type_document,
    number_document: string,
    birth_date: Date,
}

export interface type_document {
    CC: string,
    TI: string,
    TE: string,
    PP: string,
    PPT: string,
    NIT: string,
}