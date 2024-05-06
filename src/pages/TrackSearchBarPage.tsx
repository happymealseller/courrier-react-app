import { FormEvent, useState} from 'react';

function TrackSearchBarPage() {
    const [trackingNo, setTrackingNo] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("tracking: ", trackingNo);
    };

    return (<>
        <div className="flex justify-center items-center w-full h-[100svh]">
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
    </>);
}

export default TrackSearchBarPage;
