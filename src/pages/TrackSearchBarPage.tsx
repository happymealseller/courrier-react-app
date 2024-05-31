import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../components/security/axiosInstance';
import { AuthenticationUrl } from '../utilities/enums/Url';
import { CustomerEndpoint } from '../utilities/enums/Endpoint';
import { config } from '../utilities/constants/config';

function TrackSearchBarPage() {
    const navigate = useNavigate();
    const [trackingNo, setTrackingNo] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = CustomerEndpoint.TRACK_ORDER_ID.replace("{orderId}", trackingNo)
        axiosInstance
            .get(url, config)
            .then((res) => {
                // TODO: page not created yet
                // navigate()
            }).catch((err) => {
                alert(err)
            })
    };

    const renderButton = (title: string, url: AuthenticationUrl) => {
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
            h-3/4 w-full
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
                                className="w-96 border-2 border-black p-2"
                                type="text"
                                id="trackingNo"
                                placeholder="Tracking No"
                                value={trackingNo}
                                onChange={(e) => setTrackingNo(e.target.value)}
                            />
                            <br />
                            <button
                                className="w-20 border-2 border-l-0 border-black p-2 bg-orange-500 hover:bg-orange-400"
                                type="submit">
                                Track
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex justify-center items-center gap-10">
                    {renderButton("Ship Now", AuthenticationUrl.LOGIN)}
                    {renderButton("Get Quote", AuthenticationUrl.LOGIN)}
                </div>







            </div>
        </div>
    </>);
}

export default TrackSearchBarPage;
