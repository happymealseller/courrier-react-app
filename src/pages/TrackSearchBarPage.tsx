import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicUrl } from '../utilities/enums/Url';
import { axiosInstance } from '../components/security/axiosInstance';
import { CustomerEndpoint } from '../utilities/enums/Endpoint';
import { ResponseStatus } from '../utilities/enums/ResponseStatus';
   
function TrackSearchBarPage() {
    const [trackingNo, setTrackingNo] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("[USER INPUT] Tracking No. : ", trackingNo);
        axiosInstance.get(`${CustomerEndpoint.TRACK_ORDER}${trackingNo}`)
            .then((response) => {
                console.log("[RESPONSE - COURIER_APP backend] REQUEST_URL: ",
                    (CustomerEndpoint.TRACK_ORDER + trackingNo) + " | Response: ", response)
                if (response.data.status === ResponseStatus.Success) {
                    navigate(PublicUrl.ORDER_STATUS, {
                        state: response.data.orderDetails
                    })
                } else if (response.data.status === ResponseStatus.Failure) {
                    setError(response.data.message);
                }

            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            })


    };

    const renderButton = (title: string, url: PublicUrl) => {
        return (
            <button
                className="flex justify-center items-center bg-white h-12 w-36 border-2 border-black rounded-lg transition-colors duration-300 hover:bg-orange-500"
                onClick={() => {
                    navigate(url)
                }}
            >
                <h1>{title}</h1>
            </button>
        )
    }

    return (<>
        <div className="
            h-[75svh] w-full
            flex justify-center items-center
            bg-[url('https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg')] 
            bg-cover bg-center
        ">
            <div className="flex-row content-center bg-slate-700 bg-opacity-50 p-20 rounded-lg">
                <p className="text-center text-white text-4xl font-bold">Welcome to FDM<span className="text-orange-500">X</span></p>


                <div className="flex justify-center p-10">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center">
                            <input
                                className="w-96 border-2 border-black p-2 text-center"
                                type="text"
                                id="trackingNo"
                                placeholder="Tracking No"
                                value={trackingNo}
                                onChange={(e) => setTrackingNo(e.target.value)}
                            />
                            <br />
                            <button
                                className="w-20 border-2 border-l-0 border-black p-2 bg-orange-500 hover:bg-orange-400 font-bold"
                                type="submit">
                                Track
                            </button>
                        </div>
                        {error && <div className="text-red-600 text-center">{error}</div>}
                    </form>
                </div>

                <div className="flex justify-center items-center gap-10">
                    {renderButton("About Us", PublicUrl.ABOUT)}
                    {renderButton("Contact Us", PublicUrl.CONTACT)}
                </div>







            </div>
        </div>
    </>);
}
export default TrackSearchBarPage;
