import { useLocation, useNavigate } from 'react-router-dom';
import "../css/NewOrderSummary.css"
import { MeasurementUnit } from '../utilities/enums/MeasurementUnit';
import { CustomerUrl } from '../utilities/enums/Url';

export function NewOrderSummaryPage() {
    const location = useLocation();
    const order = location.state || null;
    const navigate = useNavigate();

    return (
      <div>
        { order ? (
        <div className="order-details-container">
          <div className="order-details">
            <div className="order-section">
              <h2>Order Information</h2>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              <p><strong>Order Status:</strong> {order.orderStatus[0].status}</p>
              <p><strong>Parcel Description:</strong> {order.parcelDescription}</p>
              <p><strong>Weight:</strong> {order.weight}{MeasurementUnit.gram}</p>
              <p><strong>Dimensions:</strong> {order.length} x {order.width} x {order.height} {MeasurementUnit.centimetre}</p>
            </div>
            <div className="order-section">
              <h2>Sender Information</h2>
              <p><strong>Full Name:</strong> {order.fromFullName}</p>
              <p><strong>Email:</strong> {order.fromEmail}</p>
              <p><strong>Phone Number:</strong> {order.fromPhoneNo}</p>
              <p><strong>Address:</strong> {order.fromAddress.address}</p>
              <p><strong>City:</strong> {order.fromAddress.city}</p>
              <p><strong>Country:</strong> {order.fromAddress.country}</p>
              <p><strong>Postal Code:</strong> {order.fromAddress.postalCode}</p>
            </div>
            <div className="order-section">
              <h2>Recipient Information</h2>
              <p><strong>Full Name:</strong> {order.toFullName}</p>
              <p><strong>Email:</strong> {order.toEmail}</p>
              <p><strong>Phone Number:</strong> {order.toPhoneNo}</p>
              <p><strong>Address:</strong> {order.toAddress.address}</p>
              <p><strong>City:</strong> {order.fromAddress.city}</p>
              <p><strong>Country:</strong> {order.fromAddress.country}</p>
              <p><strong>Postal Code:</strong> {order.fromAddress.postalCode}</p>
            </div>
            <div className="order-section">
              <h2>Delivery Information</h2>
              <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleString()}</p>
            </div>
          </div>
        </div>
        ) : (
            <p className='grid place-content-center'>order id not found</p>
        )}
          <div className="container py-8 px-8 mx-0 min-w-full flex flex-col items-center">       
            <button onClick={() => navigate(CustomerUrl.DASHBOARD)}
            type="submit" 
            className="border-2 p-4 rounded-lg bg-green-400 hover:bg-slate-300 hover:text-gray-500 hover:border-slate-300">
              Return to Dashboard 
            </button>
          </div>
      </div>
      );
}
