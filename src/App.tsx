import React, { useMemo, useState } from "react";
import Form from "./components/Form";
import RecordsList from "./components/RecordsList";
import Summary from "./components/Summary";
export type Payer = "me" | "both" | "else";

export type PaymentRecord = { payer: Payer; price: number };
function App() {
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([]);
  const totalAmount = useMemo(
    () =>
      Math.round(
        paymentRecords.length !== 0
          ? paymentRecords
              .map((pr) => pr.price)
              .reduce((prev, current) => prev + current)
          : 0
      ),
    [paymentRecords]
  );
  const myTotalAmount = useMemo(
    () =>
      Math.round(
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
      ),
    [paymentRecords]
  );
  const yourTotalAmount = totalAmount - myTotalAmount;

  return (
    <div className="flex justify-center px-4">
      <div className="w-screen">
        <div className="fixed top-0 right-0 h-28 p-4 w-screen bg-amber-100">
          <Summary
            myTotalAmount={myTotalAmount}
            totalAmount={totalAmount}
            yourTotalAmount={yourTotalAmount}
          />
        </div>
        <div className="h-full mt-32 mb-52">
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
