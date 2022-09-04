import type { NextApiRequest, NextApiResponse } from "next";

const PRIVATE_KEY: string =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? (process.env.TEST_STRIPE_PRIVATE_KEY as string)
    : (process.env.STRIPE_PRIVATE_KEY as string);

if (!PRIVATE_KEY) {
  throw new Error("Admin private key not set");
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(PRIVATE_KEY);

const calculateOrderAmount = (tokenAmount: integer) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return tokenAmount * 100;
};

const createPaymentIntent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      error: "Invalid method. Only POST supported.",
    });
  }

  if (!stripe) {
    return res.status(400);
  }

  const { arcadeTokens } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(arcadeTokens),
    currency: "cad",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
};

export default createPaymentIntent;
