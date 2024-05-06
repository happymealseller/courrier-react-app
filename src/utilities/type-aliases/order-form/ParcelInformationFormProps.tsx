import { ParcelType } from "../../enums/ParcelType"

type ParcelInformationData = {
    parcelType: ParcelType,
    length: string,
    width: string,
    height: string,
    weight: string
}

export type ParcelInformationFormProps = ParcelInformationData & {
    updateFields: (fields: Partial<ParcelInformationData>) => void
}