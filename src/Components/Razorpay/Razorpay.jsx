import { Button } from '@mui/material';
import React, { useContext } from 'react'
import { Context } from '../../Context';

const Razorpay = ({ paymentData}) => {
    let {apiLink,axios} = useContext(Context)

    const handlePayment = async () => {
        return new Promise(resolve => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script);
        })
    }
     async function displayRazorPay() {
        const res = await handlePayment();
        if (!res) {
            alert("Error");
            return
        }
        let obj = {
            amount: paymentData.amount
        }
        const options = {
            "key": "rzp_test_nSahl5FThvw7uJ", // Enter the Key ID generated from the Dashboard
            "amount": obj.amount * 100 + "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": paymentData.name,
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name": paymentData.name,
                "email": paymentData.email,
                "contact": paymentData.phone,
            },
            "notes": {
                "address": paymentData.address
            },
            "theme": {
                "color": "#564fa4"
            }
        };
        let { data } = await axios.post(apiLink+"create/orderId", obj)
        options.order_id = data.orderId;
        let rzp = new window.Razorpay(options);
        rzp.open();
    }
    return (
        <Button sx={{ position: "fixed" }} variant='outlined' onClick={displayRazorPay}>Donate</Button>
    )
}

export default Razorpay;