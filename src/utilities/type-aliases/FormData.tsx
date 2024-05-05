import { ParcelType } from "../enums/ParcelType"

export type FormData = {
    fromCompanyName: string,
    fromAddress: string,
    fromContactName: string,
    fromEmail: string,
    fromPhone: string,
    toCompanyName: string,
    toAddress: string,
    toContactName: string,
    toEmail: string,
    toPhone: string,
    parcelType: ParcelType,
    length: string,
    width: string,
    height: string,
    weight: string,
  }