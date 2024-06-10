import { FormEvent, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { ResponseStatus } from "../../utilities/enums/ResponseStatus";
import { AccountType } from "../../utilities/enums/AccountType";
// import { GmailIcon } from "../icons/GmailIcon";
import { axiosInstance } from "../security/axiosInstance";
import { AdminUrl, AuthenticationUrl, CourierUrl, CustomerUrl } from "../../utilities/enums/Url";
import { AuthenticationEndpoint } from "../../utilities/enums/Endpoint";
import { config } from "../../utilities/constants/config";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authentication/authenticationSlice";
import { AuthenticationActionPayload } from "../../redux/authentication/AuthenticationAction";

export function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { prepopulatedUsername, prepopulatedPassword } = location.state || { prepopulatedUsername: "", prepopulatedPassword: ""};
    const [username, setUsername] = useState(prepopulatedUsername);
    const [password, setPassword] = useState(prepopulatedPassword);
    const [error, setError] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const loginInformation = { username, password }
        const url = AuthenticationEndpoint.LOGIN
        axiosInstance.post(url, JSON.stringify(loginInformation), config)
            .then(response => {
                if (response.data.status === ResponseStatus.Success) {
                    const userData: AuthenticationActionPayload = {
                        jwt: response.data.jwt,
                        username: username,
                        role: response.data.role
                    }
                    switch (response.data.role) {
                        case AccountType.Customer:
                            dispatch(login(userData));
                            navigate(CustomerUrl.DASHBOARD);
                            break;
                        case AccountType.Courier:
                            dispatch(login(userData));
                            navigate(CourierUrl.DASHBOARD);
                            break;
                        case AccountType.Admin:
                            dispatch(login(userData));
                            navigate(AdminUrl.DASHBOARD);
                            break;
                    }
                } else if (response.data.status === ResponseStatus.Failure) {
                    setError(response.data.message);
                }
            })
            .catch(error => {
                alert(`Error: ${error.message}`);
            });
    }
    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
            <h1 className="text-5xl font-semibold">FDMx</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Welcome Back! Please enter your details.</p>
            <div className="mt-8">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="text-lg font-medium">Username</label>
                        <input 
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                            placeholder="Enter your username"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    <br></br>
                    <div>
                        <label className="text-lg font-medium">Password</label>
                        <input 
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                            placeholder="Enter your password"
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                        <div>
                            <input 
                                type="checkbox"
                                id="remember"
                            />
                            <label className="ml-2 font-medium text-base" htmlFor="remember">Remember me</label>
                        </div>
                        <button className="font-medium text-base text-slate-500">Forgot password</button>  {/* onClick={() => navigate to reset pw page} */}
                    </div>
                    { error && (
                        <p className="text-red-500">{error}</p>
                    )}
                    <div className="mt-8 flex flex-col gap-y-4">
                        <button 
                            type="submit"
                            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-slate-500 text-white text-lg font-bold"
                        >
                            Sign in
                        </button>
                        {/* <button className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
                            <GmailIcon />
                            Sign in with Google
                        </button> */}
                    </div>
                </form>
                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Don't have an account?</p>
                    <button className="text-slate-500 text-base font-medium ml-2" onClick={() => navigate(AuthenticationUrl.OPEN_AN_ACCOUNT)}>Sign up</button>
                </div>
            </div>
        </div>
    )
}