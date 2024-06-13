export class TypeOfClothing {
    constructor(
      public category?: 'Fatos e blazers' | 'Calças' | 'Meias e Roupa Interior' | 'Tops e t-shirts' | 'Camisolas e sweaters' | 'Casacos' | 'Pijamas' | 'Outros',
      public quantity?: number,
      public state?: 'Novo com etiquetas' | 'Novo sem etiquetas' | 'Muito bom' | 'Bom' | 'Satisfatório'
    ) { }
}

export class Donation {
    constructor(
    public _id?: string,
    public donator?: string,
    public entity?: string,
    public donationDate?: Date,
    public typeOfDonation?: 'Doação Têxtil' | 'Dinheiro',
    public typeOfClothing?: TypeOfClothing[],
    public amount?: number,
    public warehouseName?: string,
    public images?: string,
    public status?: 'Pendente' | 'Aprovada' | 'Rejeitada'  ,
    public points?: number
    ) {}
}