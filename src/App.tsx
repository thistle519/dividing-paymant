import React, { useState } from "react";
import Form from "./components/Form";
export type Payer = "me" | "both" | "else";

export type PaymentRecord = { payer: Payer; price: number };
function App() {
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([]);
  let myTotalAmount = 0;
  paymentRecords.forEach((pr) => {
    if (pr.payer === "me") {
      myTotalAmount += pr.price;
    }
    if (pr.payer === "both") {
      myTotalAmount += pr.price / 2;
    }
  });
  const convertPayerToJa = (payer: Payer): String => {
    if (payer === "me") return "私";
    if (payer === "both") return "どっちも";
    if (payer === "else") return "あいて";
    throw new Error();
  };
  return (
    <>
      <Form
        setPaymentRecords={setPaymentRecords}
        paymentRecords={paymentRecords}
      />
      {paymentRecords.map((pr) => (
        <li>
          {pr.price}円 {convertPayerToJa(pr.payer)}
        </li>
      ))}
      <p>自分が払うべきお金は{myTotalAmount}です</p>
    </>
  );
}

export default App;
