import { Button, useToast } from "@chakra-ui/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import { BASE_URL } from "lib/constants/routes";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    console.log("clientSecret", clientSecret);
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }
      switch (paymentIntent.status) {
        case "succeeded":
          console.log("Payment succeeded!");
          break;
        case "processing":
          console.log("Your payment is processing.");
          break;
        case "requires_payment_method":
          console.log("Your payment was not successful, please try again.");
          break;
        default:
          console.log("Something went wrong.");
          break;
      }
    });
  }, [elements, stripe, toast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("issue");
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: BASE_URL,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      if (!error.message) {
        return;
      }
      toast({
        status: "error",
        title: "Payment Success",
        description: error.message,
        isClosable: true,
        duration: 5000,
      });
    } else {
      toast({
        status: "error",
        title: "Payment Success",
        description: "An unexpected error occurred.",
        isClosable: true,
        duration: 5000,
      });
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        type="submit"
        onClick={() => console.log("hi")}
        isLoading={isLoading}
        loadingText="Processing Payment"
      >
        Pay now
      </Button>
    </form>
  );
}
