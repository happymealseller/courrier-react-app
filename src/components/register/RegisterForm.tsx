import React, { useState, FormEvent } from "react";
import { AccountType } from "../../utilities/enums/AccountType";
import { ResponseStatus } from "../../utilities/enums/ResponseStatus";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../security/axiosInstance";
import { AuthenticationEndpoint } from "../../utilities/enums/Endpoint";
import { AuthenticationUrl } from "../../utilities/enums/Url";
import { config } from "../../utilities/constants/config";

export function RegisterForm() {
	const [accountType, setAccountType] = useState(AccountType.Customer);
	const [fullName, setFullName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [vehicleCapacity, setVehicleCapacity] = useState("");

	const [isSenderView, setIsSenderView] = useState(true);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleAccountTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setIsSenderView(event.target.value === AccountType.Customer);
		setAccountType(event.target.value === AccountType.Courier ? AccountType.Courier : AccountType.Customer);
	};

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const senderRegistrationInformation = { fullName, username, email, password, phoneNo };
		const courierRegistrationInformation = { fullName, username, password, vehicleCapacity };
		const registrationInformation = accountType === AccountType.Customer ? senderRegistrationInformation : courierRegistrationInformation;
		const url = AuthenticationEndpoint.REGISTER + (accountType === AccountType.Customer ? "" : "Courier");
		axiosInstance
			.post(url, JSON.stringify(registrationInformation), config)
			.then((response) => {
				if (response.data.status === ResponseStatus.Success) {
					navigate(
						AuthenticationUrl.LOGIN, 
						{
							state: {
								prepopulatedUsername: username, 
								prepopulatedPassword: password
							}
						}
					);
				} else if (response.data.status === ResponseStatus.Failure) {
					setError(response.data.message);
				}
			})
			.catch((error) => {
				alert(`Error: ${error.message}`);
			});
	}

	return (
	<div style={{ marginTop: '200px' }} className="bg-white px-10 py-12 rounded-3xl border-2 border-gray-200">
		<h1 className="text-5xl font-semibold">FDMx</h1>
		<p className="font-medium text-lg text-gray-500 mt-4">
		Please enter your registration details.
		</p>
		<div className="mt-6">
			<form onSubmit={handleSubmit}>
				<div>
					<label className="text-lg font-medium">Account Type:</label>
				</div>
				<select
					id="accounttype"
					name="accounttype"
					className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
					required
					value={accountType}
					onChange={handleAccountTypeChange}
				>
					<option value={AccountType.Customer}>Sender</option>
					<option value={AccountType.Courier}>Courier</option>
				</select>
				{/* <label className="text-lg font-medium">Username</label>
							<input 
								className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
								placeholder="Enter your username"
								type="text"
								value={username}
								onChange={e => setUsername(e.target.value)}
								required 
							/> */}
				<div>
					<label className="text-lg font-medium">Fullname:</label>
				</div>
				<input
					type="text"
					value={fullName}
					className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
					id="full-name"
					name="full-name"
					placeholder="Fullname"
					required
					onChange={(e) => setFullName(e.target.value)}
				></input>
				<div>
					<label className="text-lg font-medium">Username:</label>
				</div>
				<input
					type="text"
					value={username}
					className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
					id="username"
					name="username"
					placeholder="Username"
					required
					onChange={(e) => setUsername(e.target.value)}
				></input>
				{isSenderView && (
				<>
					<div>
						<label className="text-lg font-medium">Email:</label>
					</div>
					<input
						type="email"
						value={email}
						className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
						id="useremail"
						name="useremail"
						placeholder="Email"
						required
						onChange={(e) => setEmail(e.target.value)}
					></input>
				</>
				)}
				<div>
					<label className="text-lg font-medium">Password:</label>
				</div>
				<input
					type="password"
					value={password}
					className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
					id="password"
					name="password"
					placeholder="Password"
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					title="Must contain minimum 8 characters, at least 1 number, 1 uppercase and 1 lowercase letter"
					required
					onChange={(e) => setPassword(e.target.value)}
				></input>
				{isSenderView && (
				<>
					<div>
						<label className="text-lg font-medium">Phone Number:</label>
					</div>
					<input
						type="tel"
						value={phoneNo}
						className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
						id="phone-number"
						name="phone-number"
						placeholder="Phone Number"
						pattern="^[89]\d{7}$"
                title="Please enter an 8-digit number starting with 8 or 9."
						required
						onChange={(e) => setPhoneNo(e.target.value)}
					></input>
				</>
				)}
				{!isSenderView && (
				<>
					<div>
						<label className="text-lg font-medium">
							Vehicle Capacity (kg):
						</label>
					</div>
					<input
						type="text"
						value={vehicleCapacity}
						className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
						id="capacity"
						name="capacity"
						placeholder="0"
						onChange={(e) => setVehicleCapacity(e.target.value)}
					></input>
				</>
				)}
				{error && <p className="text-red-500">{error}</p>}
				<div className="mt-8 flex flex-col gap-y-4">
					<button
						type="submit"
						className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-slate-500 text-white text-lg font-bold"
					>
						Register
					</button>
				</div>
			</form>
		</div>
	</div>
	);
}
