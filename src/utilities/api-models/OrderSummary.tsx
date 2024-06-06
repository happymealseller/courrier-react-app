import { Address } from "../type-aliases/order-form/FormData"

class OrderStatus {
	status: string
	remarks: string
	statusUpdateDate: string

	constructor(
		status: string,
		remarks: string,
		statusUpdateDate: string
	) {
		this.status = status
		this.remarks = remarks
		this.statusUpdateDate = statusUpdateDate
	}
}
export class OrderSummary {

    orderId: number
	orderStatus: OrderStatus[]
	deliveryDate: string
	orderDate: string
	fromAddress: Address
	fromFullName: string
	fromEmail: string
	fromPhoneNo: string
	toAddress: Address
	toFullName: string
	toEmail: string
	toPhoneNo: string
	weight: number
	width: number
	height: number
	length: number
	parcelDescription: string

	constructor(
		orderId: number,
		orderStatus: OrderStatus[],
		deliveryDate: string,
		orderDate: string,
		fromAddress: Address,
		fromFullName: string,
		fromEmail: string,
		fromPhoneNo: string,
		toAddress: Address,
		toFullName: string,
		toEmail: string,
		toPhoneNo: string,
		weight: number,
		width: number,
		height: number,
		length: number,
		parcelDescription: string
	) {
		this.orderId = orderId
		this.orderStatus = orderStatus
		this.deliveryDate = deliveryDate
		this.orderDate = orderDate
		this.fromAddress = fromAddress
		this.fromFullName = fromFullName
		this.fromEmail = fromEmail
		this.fromPhoneNo = fromPhoneNo
		this.toAddress = toAddress
		this.toFullName = toFullName
		this.toEmail = toEmail
		this.toPhoneNo = toPhoneNo
		this.weight = weight
		this.width = width
		this.height = height
		this.length = length
		this.parcelDescription = parcelDescription
	}
}
