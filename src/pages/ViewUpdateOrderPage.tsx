import { FormEvent, useEffect, useState } from "react"
import { ShipFromForm } from "../components/order-form/ShipFromForm"
import { ShipToForm } from "../components/order-form/ShipToForm"
import { ParcelInformationForm } from "../components/order-form/ParcelInformationForm"
import { useMultistepForm } from "../utilities/hooks/useMultistepForm"
import { FormData } from "../utilities/type-aliases/order-form/FormData"
import { ParcelType } from "../utilities/enums/ParcelType"
import { axiosInstance } from "../components/security/axiosInstance"
import { ResponseStatus } from "../utilities/enums/ResponseStatus"
import { useLocation, useNavigate } from "react-router-dom"
import { OrderSummary } from "../utilities/api-models/OrderSummary"
import { CustomerEndpoint } from "../utilities/enums/Endpoint"
import { config } from "../utilities/constants/config"
import { CustomerUrl } from "../utilities/enums/Url"
import { useSelector } from "react-redux"
import { RootState } from "../App"
import { RequestHeaderKey } from "../utilities/enums/RequestHeaderKey"

const INITIAL_DATA: FormData = {
	fromAddress: {
		address: "",
		postalCode: "",
		country: "",
		city: ""
	},
	fromAddress: {
		address: "",
		postalCode: "",
		country: "",
		city: ""
	},
	fromFullName: "",
	fromEmail: "",
	fromPhoneNo: "",
	toAddress: {
		address: "",
		postalCode: "",
		country: "",
		city: ""
	},
	fromPhoneNo: "",
	toAddress: {
		address: "",
		postalCode: "",
		country: "",
		city: ""
	},
	toFullName: "",
	toEmail: "",
	toPhoneNo: "",
	toPhoneNo: "",
	parcelType: ParcelType.Custom,
	length: "",
	width: "",
	height: "",
	weight: "",
	parcelDescription: ""
	parcelDescription: ""
}  // to replace with retrieved data from local storage
// pls preload dummy b4 testing, validation kicks in

interface senderDetails {
	fromFullName: string
	fromEmail: string
	fromPhone: string
	fromAddress: {
		address: string,
		postalCode: string,
		country: string,
		city: string
	}
}

interface receipientDeatails {
	toFullName: string
	toEmail: string
	toPhone: string
	toAddress: {
		address: string,
		postalCode: string,
		country: string,
		city: string
	}
}

interface orderDetails {
	sender: senderDetails
	recipient: receipientDeatails
}

export function ViewUpdateOrderPage() {

	const username = useSelector((state: RootState) => state.authentication.username)
	const navigate = useNavigate();
	const [data, setData] = useState(INITIAL_DATA);
	const location = useLocation();
	const allowUpdate = location.state !== null ? location.state.allowUpdate : { allowUpdate: false };
	const orderId  = location.state.orderId;

	const navigate = useNavigate();
	const [data, setData] = useState(INITIAL_DATA);
	const location = useLocation();
	const allowUpdate = location.state !== null ? location.state.allowUpdate : { allowUpdate: false };
	const orderId  = location.state.orderId;

	useEffect(() => {
		config.headers[RequestHeaderKey.Username] = username
	}, [])

	useEffect(() => {
		const url = CustomerEndpoint.TRACK_ORDER.replace("{orderId}", orderId)
		axiosInstance
			.get(url, config)
			.then((res) => {
				setData(res.data.orderDetails)
			})
			.catch((err => {
				console.log(err)
			}))
	}, [])

	const pageTitle = allowUpdate ? "Update Order" : "View Order";
	useEffect(() => {
		const url = CustomerEndpoint.TRACK_ORDER.replace("{orderId}", orderId)
		axiosInstance
			.get(url, config)
			.then((res) => {
				setData(res.data.orderDetails)
			})
			.catch((err => {
				console.log(err)
			}))
	}, [])

	const pageTitle = allowUpdate ? "Update Order" : "View Order";

	function updateFields(fields: Partial<FormData>) {
		if (allowUpdate){
			setData( prev => {
				return { ...prev, ...fields };
			});
		}
	}
	const noOp = () => {};

	const { currentStepIndex, isFirstStep, isLastStep, step, steps, next, back } = useMultistepForm([
		<ShipFromForm {...data} updateFields={updateFields} />,
		<ShipToForm {...data} updateFields={updateFields} />,
		<ParcelInformationForm {...data} updateFields={ noOp } />,   // future fix: to prevent update of parcel info
		//<ShippingServiceForm />,
		//<PaymentForm {...data} updateFields={updateFields} />
	])

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		if (!isLastStep) {
			return next()
		} else if(allowUpdate){
			const endpoint = CustomerEndpoint.UPDATE_ORDER.replace("{orderId}", orderId)

			const orderDetails: orderDetails = {
				sender: {
					fromFullName: "John Doe",
					fromEmail: "johndoe1@mail.com",
					fromPhone: "98765432",
					fromAddress: {
						address: "Woodlands",
						postalCode: "739089",
						country: "Singapore",
						city: "Singapore"
					}
				},
				recipient: {
					toFullName: "Jane Doe",
					toEmail: "janedoe@mail.com",
					toPhone: "87654321",
					toAddress: {
						address: "Woodlands",
						postalCode: "739090",
						country: "Singapore",
						city: "Singapore"
					}
				}
			}
	
			axiosInstance.put(endpoint, JSON.stringify(orderDetails), config)
				.then(response => {
					if (response.data.status === ResponseStatus.Success) {
						navigate(
							CustomerUrl.NEW_ORDER_SUMMARY,
							{ state: response.data.orderDetails as OrderSummary }
						)
				} else if (response.data.status === ResponseStatus.Failure) {
					alert(`Error ${response.data.message}`)
				}
			})
				} else if (response.data.status === ResponseStatus.Failure) {
					alert(`Error ${response.data.message}`)
				}
			})
		}
	}	

	return (
		<>
		<div className={`box-border h-32 w-32 p-4 border-2 border-black my-12 mx-8 shadow-lg
			${allowUpdate ? 'bg-blue-300 shadow-blue-500/30' : 'bg-green-300 shadow-green-500/30'}`}>
			<div className = "flex justify-center text-xl text-center font-medium text-gray-800 p-4"> 
				{pageTitle}
			</div>
		</div>

			<div style={{
			position: "relative",
			background: "white",
			border: "1px solid black",
			padding: "2rem",
			margin: "1rem",
			borderRadius: "0.5rem",
			fontFamily: "Arial",
			maxWidth: "max-content"
			}}>
				<form onSubmit={handleSubmit}>
					<div style={{
					position: "absolute",
					top: "0.5rem",
					right: "0.5rem"
					}}>
					{currentStepIndex + 1} / {steps.length}
					</div>
					{step}
					<div style={{
					marginTop: "1rem",
					display: "flex",
					gap: "0.5rem",
					justifyContent: "flex-end"
					}}>
					{!isFirstStep && (
						<button type="button" onClick={back} className="border-2 px-2 py-1 rounded-md hover:bg-slate-300 hover:text-gray-500 hover:border-slate-300">
						Back
						</button>
					)}
					<button type="submit" className="border-2 px-2 py-1 rounded-md hover:bg-slate-300 hover:text-gray-500 hover:border-slate-300">
						{isLastStep ? "Finish" : "Next"}
					</button>
					</div>
				</form>
			</div>
		</>
	)
}