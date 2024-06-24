import React, { useState, useEffect } from "react";
import {
  Appearance,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { axiosInstance } from "../components/security/axiosInstance";
import { CustomerEndpoint } from "../utilities/enums/Endpoint";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../utilities/constants/config";
import { ResponseStatus } from "../utilities/enums/ResponseStatus";
import { CustomerUrl } from "../utilities/enums/Url";
import { OrderSummary } from "../utilities/api-models/OrderSummary";
import CheckoutForm from "../components/checkout/CheckoutForm";

export function CheckoutPage() {
  const stripePromise = loadStripe(process.env.stripePublishKey || "");
  const [clientSecret, setClientSecret] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSuccess = (paymentReference: String) => {
    const endpoint = CustomerEndpoint.COMPLETE_PAYMENT;
    axiosInstance
      .post(endpoint, JSON.stringify(paymentReference), config)
      .then((response) => {
        if (response.data.status === ResponseStatus.Success) {
          navigate(CustomerUrl.NEW_ORDER_SUMMARY, {
            state: response.data.orderDetails as OrderSummary,
          });
        } else if (response.data.status === ResponseStatus.Failure) {
          alert(`Error ${response.data.message}`);
        }
      });
  };

  useEffect(() => {
    // load client secret (payment reference)
    setClientSecret(state);
  }, []);

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm onSuccess={handleSuccess} />
        </Elements>
      )}
    </div>
  );
}
