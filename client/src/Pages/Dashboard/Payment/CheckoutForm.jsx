import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAxiosSecure from './../../../Hooks/UseAxiosSecure';
import UseCart from './../../../Hooks/UseCart';
import UseAuth from "../../../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const[error,setError]=useState("")
    const[clientSecret,setClientSecret]=useState("")
    const[transactionId,setTransactionId]=useState("")
const navigate=useNavigate()

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure=UseAxiosSecure()
    const{user}=UseAuth()
    const [cart,refetch]=UseCart()
    const totalPrice = cart.reduce((total,item)=>total+item.price,0)
  useEffect(()=>{
    if(totalPrice>0){
      
      axiosSecure.post('/create-payment-intent',{price:totalPrice})
      .then(res=>{
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
    }
  },[axiosSecure, totalPrice])
    const handleSubmit = async (event) => {
        event.preventDefault();
        
    if (!stripe || !elements) {
       
        return;
      }
  
      const card = elements.getElement(CardElement);
      if (card === null) {
        return;
      }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
        setError(error.message)
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setError("")
      }
 
       // const confirm payment 
       console.log(clientSecret)
       const { paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
           payment_method:{
               card:card,
               billing_details: {
                   email: user?.email || 'anonymous',
                   name: user?.displayName || 'anonymous',
                   },
           }
       })
       if(confirmError){
        console.log('confirmError');
        
       }
       else{
        console.log('paymentIntent',paymentIntent);
        if (paymentIntent.status==="succeeded") {
          console.log('transaction id',paymentIntent.id);
          setTransactionId(paymentIntent.id)
          //now save the payment in the db
             const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch()
                if (res.data?.paymentResult?.insertedId) {
                 Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Thank you for the taka paisa",
                      showConfirmButton: false,
                      timer: 1500
                  });
                  navigate('/dashboard/paymentHistory')
              }
        }
       }
      }
    return (
        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn bg-[#D1A054] text-white my-4" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
      </form>
    );
};

export default CheckoutForm;