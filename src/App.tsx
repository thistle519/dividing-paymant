import React, { useState } from "react";
import "./App.css";

function App() {
  type Payer = "me" | "both" | "else";
  type PaymentRecord = { payer: Payer; price: number };
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([]);
  const [inputPrice, setInputPrice] = useState(0);
  const [inputPayer, setInputPayer] = useState<Payer>("both");
  let  myTotalAmount = 0
  paymentRecords.forEach(pr => {
    if (pr.payer === 'me'){
      myTotalAmount += pr.price
    } 
    if(pr.payer === 'both'){
      myTotalAmount += pr.price/2
    }
  });
  const convertPayerToJa = (payer: Payer):String =>{
    if (payer === 'me') return '私'
    if (payer === 'both') return 'どっちも'
    if (payer === 'else') return 'あいて'
    throw new Error()
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          setPaymentRecords([
            ...paymentRecords,
            { payer: inputPayer, price: inputPrice },
          ]);
          e.preventDefault();
        }}
      >
        {/* {JSON.stringify(paymentRecords, null, 2)} */}
        <br />
        <label htmlFor="me">わたし</label>
        <input
          type="radio"
          name="payer"
          value="me"
          id="me"
          onChange={(e) => setInputPayer(e.target.value as "me")}
        />
        <label htmlFor="both">ふたり</label>
        <input
          type="radio"
          name="payer"
          value="both"
          id="both"
          onChange={(e) => setInputPayer(e.target.value as "both")}
        />
        <label htmlFor="else">あいて</label>
        <input
          type="radio"
          name="payer"
          value="else"
          id="else"
          onChange={(e) => setInputPayer(e.target.value as "else")}
        />
        <input
          type="number"
          onChange={(e) => {
            setInputPrice(parseInt(e.target.value));
          }}
        />
        <button
        // onClick={() => {
        //   setPrices([...prices, inputPrice]);
        // }}
        >
          追加
        </button>
      </form>
      {paymentRecords.map((pr) => (
        <li>{pr.price}円  {convertPayerToJa(pr.payer)}</li>
      ))}
      <p>自分が払うべきお金は{myTotalAmount}です</p>
    </>
  );
} 

export default App;
