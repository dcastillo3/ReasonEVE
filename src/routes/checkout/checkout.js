import React, { useState, useEffect } from "react";
import "./checkout.css";

// DC-NOTE: Example product page
const ProductDisplay = () => (
    <section>
        <div className="product">
            <img
                src="https://i.imgur.com/EHyR2nP.png"
                alt="The cover of Stubborn Attachments"
            />
            <div className="description">
                <h3>Beat 1</h3>
                <h5>$10.00</h5>
            </div>
        </div>
        <form action="/api/create-checkout-session" method="POST">
            <button type="submit">
                Checkout
            </button>
        </form>
    </section>
);

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function Checkout() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return (
        <div className="checkout">
            {message ? (
                <Message message={message} />
            ) : (
                <ProductDisplay />
            )}
        </div>
    );
}