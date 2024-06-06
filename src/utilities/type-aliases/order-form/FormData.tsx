import { ParcelType } from "../../enums/ParcelType"

export type FormData = {
  fromCompanyName: string,
  fromAddress: string,
  fromFullName: string,
  fromEmail: string,
  fromPhoneNo: string,
  toCompanyName: string,
  toAddress: string,
  toFullName: string,
  toEmail: string,
  toPhoneNo: string,
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