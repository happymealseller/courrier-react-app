import React, { useState, FormEvent } from "react";
import { ResponseStatus } from "../../utilities/enums/ResponseStatus";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../security/axiosInstance";
import { AuthenticationEndpoint } from "../../utilities/enums/Endpoint";
import { AuthenticationUrl } from "../../utilities/enums/Url";
import { config } from "../../utilities/constants/config";

export function RegisterForm() {
	const [fullName, setFullName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNo, setPhoneNo] = useState("");

	const [error, setError] = useState("");

	const navigate = useNavigate();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const senderRegistrationInformation = { fullName, username, email, password, phoneNo };
		const url = AuthenticationEndpoint.REGISTER;
		axiosInstance
			.post(url, JSON.stringify(senderRegistrationInformation), config)
			.then((response) => {
				if (response.data.status === ResponseStatus.Success) {
					navigate(
						AuthenticationUrl.LOGIN, 
						{
							state: {
								prepopulatedUsername: username
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
		Please enter your customer registration details.
		</p>
		<div className="mt-6">
			<form onSubmit={handleSubmit}>
				<div>
					<label className="text-lg font-medium">Full Name:</label>
				</div>
				<input
					type="text"
					value={fullName}
					className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
					id="full-name"
					name="full-name"
					placeholder="Full Name"
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
