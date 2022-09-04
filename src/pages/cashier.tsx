import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import CheckoutForm from "../lib/components/cashier/CheckoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

const PUBLIC_KEY =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLIC_KEY
    : process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!PUBLIC_KEY) {
  throw new Error("Admin public key not set");
}

const stripePromise = loadStripe(PUBLIC_KEY as string);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arcadeTokens: 5 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  if (!options) {
    console.log("Error");
  }

  return (
    <div className="App">
      field
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      fool
    </div>
  );
}
