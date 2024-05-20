import { useLocation } from 'react-router-dom';
import "../css/NewOrderSummary.css"
import { MeasurementUnit } from '../utilities/enums/MeasurementUnit';

export function NewOrderSummaryPage() {
    const location = useLocation();
    const order = location.state || null;
    return (
        order ? (
        <div className="order-details-container">
          <div className="order-details">
            <div className="order-section">
              <h2>Order Information</h2>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              <p><strong>Order Status:</strong> {order.orderStatus}</p>
              <p><strong>Parcel Description:</strong> {order.parcelDescription}</p>
              <p><strong>Weight:</strong> {order.weight}{MeasurementUnit.gram}</p>
              <p><strong>Dimensions:</strong> {order.length} x {order.width} x {order.height} {MeasurementUnit.centimetre}</p>
            </div>
            <div className="order-section">
              <h2>Sender Information</h2>
              <p><strong>Full Name:</strong> {order.fromFullName}</p>
              <p><strong>Email:</strong> {order.fromEmail}</p>
              <p><strong>Phone Number:</strong> {order.fromPhoneNo}</p>
              <p><strong>Address:</strong> {order.fromAddress}</p>
            </div>
            <div className="order-section">
              <h2>Recipient Information</h2>
              <p><strong>Full Name:</strong> {order.toFullName}</p>
              <p><strong>Email:</strong> {order.toEmail}</p>
              <p><strong>Phone Number:</strong> {order.toPhoneNo}</p>
              <p><strong>Address:</strong> {order.toAddress}</p>
            </div>
            <div className="order-section">
              <h2>Delivery Information</h2>
              <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleString()}</p>
            </div>
          </div>
        </div>
        ) : (
            <p>order id not found</p>
        )
      );
}
