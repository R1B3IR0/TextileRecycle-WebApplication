export class Entity {
    constructor(
      public _id?: string,
      public name?: string,
      public contact?: string,
      public email?: string,
      public description?: string,
      public address?: {
        countryCode: string,
        postalCode: string,
        addressLocality: string,
        streetAddress: string
      }
    ) {}
  }
  
  