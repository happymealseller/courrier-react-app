import { ParcelType } from "../../enums/ParcelType"

export type FormData = {
    fromAddress: Partial<Address>,
    fromFullName: string,
    fromEmail: string,
    fromPhone: string,
    toAddress: Partial<Address>,
    toFullName: string,
    toEmail: string,
    toPhone: string,
    parcelType: ParcelType,
    length: string,
    width: string,
    height: string,
    weight: string,
    parcelDescription: string
    /*nameOnCard: string,
    cardNumber: string,
    expiryDate: string,
    securityCode: string*/
}

export type Address = {
  address: string
  postalCode: string
  country: string
  city: string
}