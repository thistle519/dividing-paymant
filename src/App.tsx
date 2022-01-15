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
    <div className="flex justify-center px-4">
      <div className="w-screen">
        <div className="fixed top-0 h-14 bg-white">
          <p className="my-4 ">自分が払うべきお金は{myTotalAmount}です</p>
        </div>
        <div className="h-full mt-14 mb-24">
          {paymentRecords.map((pr) => (
            <li key={pr.price}>
              {pr.price}円 {convertPayerToJa(pr.payer)}{" "}
              <button
                type="button"
                onClick={() => {
                  setPaymentRecords(paymentRecords.filter((_, index)=>index!==paymentRecords.indexOf(pr)));
                }}
              >
                ×
              </button>
            </li>
          ))}
        </div>
        <div className="fixed inset-x-0 bottom-0 px-4">
          <Form
            setPaymentRecords={setPaymentRecords}
            paymentRecords={paymentRecords}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
