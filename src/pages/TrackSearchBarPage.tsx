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

    return (<>
        <div className="flex-row w-full h-[100svh]">
            <div className="flex justify-center items-center h-1/2">
                <form onSubmit={handleSubmit}>
                    <label className="flex justify-center border-b-4 border-slate-400 text-lg p-1" htmlFor="trackingNo">Track</label><br />
                    <div className="flex justify-between">
                        <input
                            className="w-60 border-2 border-black p-2"
                            type="text"
                            id="trackingNo"
                            placeholder="Tracking No"
                            value={trackingNo}
                            onChange={(e) => setTrackingNo(e.target.value)}
                        />
                        <br />
                        <button
                            className="w-20 border-2 border-l-0 border-black p-2 hover:bg-slate-400"
                            type="submit">
                            Track
                        </button>

                    </div>
                </form>
            </div>
            {error && <div className="text-red-600 text-center">{error}</div>}
        </div>
    </>);
}

export default TrackSearchBarPage;
