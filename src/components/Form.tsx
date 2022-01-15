import React, { FC, useRef, useState } from "react";
import { Payer, PaymentRecord } from "../App";

type FormProps = {
  paymentRecords: PaymentRecord[];
  setPaymentRecords: (prs: PaymentRecord[]) => void;
};
const Form: FC<FormProps> = ({ setPaymentRecords, paymentRecords }) => {
  const [inputPrice, setInputPrice] = useState(0);
  const [inputPayer, setInputPayer] = useState<Payer>("both");
  const ref = useRef<HTMLInputElement>(null!);
  const addPaymentRecord = () => {
    setPaymentRecords([
      ...paymentRecords,
      { payer: inputPayer, price: inputPrice },
    ]);
    setInputPrice(0);
  };

  return (
    <form
      onSubmit={(e) => {
        addPaymentRecord();
        console.log( ref.current);
        
        ref.current.focus();
        e.preventDefault();
      }}
      className="bg-white"
    >
      <div className="flex flex-col">
        <div className="flex justify-around my-1">
          {[
            { key: "me", label: "わたし" },
            { key: "both", label: "ふたり" },
            { key: "else", label: "あいて" },
          ].map((payerObj) => (
            <div key={payerObj.key}>
              <input
                type="radio"
                name="payer"
                value={payerObj.key}
                id={payerObj.key}
                checked={inputPayer === payerObj.key}
                onChange={(e) =>
                  setInputPayer(e.target.value as "me" | "both" | "else")
                }
              />
              <label htmlFor={payerObj.key}>{payerObj.label}</label>
            </div>
          ))}
        </div>
        <input
          type="number"
          value={inputPrice !== 0 ? inputPrice : ""}
          onChange={(e) => {
            setInputPrice(parseInt(e.target.value));
          }}
          className="p-2 border-2 rounded-md my-1"
          ref={ref}
        />
        <button className="p-2 my-1 border-2 rounded-md bg-amber-300 text-white">
          追加
        </button>
      </div>
    </form>
  );
};
export default Form;
