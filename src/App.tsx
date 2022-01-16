import React, { useState } from "react";
import Form from "./components/Form";
import RecordsList from "./components/RecordsList";
export type Payer = "me" | "both" | "else";

export type PaymentRecord = { payer: Payer; price: number };
function App() {
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([]);
  const myTotalAmount = Math.round(
    paymentRecords.length !== 0
      ? paymentRecords
          .map((pr) => {
            if (pr.payer === "me") {
              return pr.price;
            }
            if (pr.payer === "both") {
              return pr.price / 2;
            }
            return 0;
          })
          .reduce((prev, current) => prev + current)
      : 0
  );

  return (
    <div className="flex justify-center px-4">
      <div className="w-screen">
        <div className="fixed top-0 h-14 bg-white">
          <p className="my-4 ">
            自分が払うべきお金は{" "}
            <span className="font-bold text-lg">{myTotalAmount}</span> 円です
          </p>
        </div>
        <div className="h-full mt-14 mb-52">
          <RecordsList
            setPaymentRecords={setPaymentRecords}
            paymentRecords={paymentRecords}
          />
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
