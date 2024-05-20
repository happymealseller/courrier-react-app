export class NewOrderSummary {
    deliveryDate: string
    fromAddress: string
    fromEmail: string
    fromPhoneNo: string
    height: number
    length: number
    orderDate: string
    orderId: number
    orderStatus: string
    parcelDescription: string
    toAddress: string
    toEmail: string
    toFullName: string
    toPhoneNo: string
    weight: number
    width: number

	constructor(
		deliveryDate: string,
		fromAddress: string,
		fromEmail: string,
		fromPhoneNo: string,
		height: number,
		length: number,
		orderDate: string,
		orderId: number,
		orderStatus: string,
		parcelDescription: string,
		toAddress: string,
		toEmail: string,
		toFullName: string,
		toPhoneNo: string,
		weight: number,
		width: number
	) {
		this.deliveryDate = deliveryDate
		this.fromAddress = fromAddress
		this.fromEmail = fromEmail
		this.fromPhoneNo = fromPhoneNo
		this.height =  height
		this.length = length
		this.orderDate = orderDate
		this.orderId = orderId
		this.orderStatus = orderStatus
		this.parcelDescription = parcelDescription
		this.toAddress = toAddress
		this.toEmail = toEmail
		this.toFullName = toFullName
		this.toPhoneNo = toPhoneNo
		this.weight = weight
		this.width = width
	}
}
