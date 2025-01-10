import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_GATEWAY_KEY);

const Payment = () => {
    return (
        <div>
            <SectionTitle
                subHeading="Pay first"
                heading="Payment"
            /> 
            <div>
<Elements stripe={stripePromise}>
<CheckoutForm />
</Elements>
            </div>
        </div>
    );
};

export default Payment;