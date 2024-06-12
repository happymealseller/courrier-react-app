const ContactUsPage = () => {
    return (
        <div className="h-[75svh] overflow-hidden flex items-center justify-center">
            <div className="w-3/4 mb-8 px-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Contact Us</h1>
                <p className="text-lg text-slate-600">
                    We're here to help! Whether you have questions about our services, need assistance with a shipment,
                    or want to provide feedback, our dedicated support team is ready to assist you.
                    Please don't hesitate to reach out to us for any inquiries or support needs.
                </p>
            </div>

            <div className="w-1/2 flex justify-center">
                <img
                    src="https://images.pexels.com/photos/4393241/pexels-photo-4393241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Courier Service"
                />
            </div>
        </div>
    );
};

export default ContactUsPage;
