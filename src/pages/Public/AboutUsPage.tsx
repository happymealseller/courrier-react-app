const AboutUsPage = () => {
    return (
        <div className="h-[75svh] overflow-hidden flex items-center justify-center">
            <div className="w-3/4 mb-8 px-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">About Us</h1>
                <p className="text-lg text-slate-600">
                    We are a dedicated team of professionals committed to providing the fastest
                    and most reliable courier delivery service in the industry. Our mission is to ensure your packages
                    reach their destination safely and on time, every time.
                </p>
            </div>

            <div className="w-1/2 flex justify-center">
                <img
                    src="https://images.pexels.com/photos/4391483/pexels-photo-4391483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Courier Service"
                />
            </div>
        </div>
    );
};

export default AboutUsPage;
