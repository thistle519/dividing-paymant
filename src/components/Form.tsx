import React, { FC, useRef, useState } from "react";
import { Payer, PaymentRecord } from "../App";
import { TAXRATE } from "../const";

type FormProps = {
  paymentRecords: PaymentRecord[];
  setPaymentRecords: (prs: PaymentRecord[]) => void;
};
const Form: FC<FormProps> = ({ setPaymentRecords, paymentRecords }) => {
  const [inputPrice, setInputPrice] = useState(0);
  const [inputPayer, setInputPayer] = useState<Payer>("both");
  const ref = useRef<HTMLInputElement>(null!);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputPrice(0);
    if (inputPrice <= 0) return;
    setPaymentRecords([
      ...paymentRecords,
      { payer: inputPayer, price: inputPrice },
    ]);
    ref.current.focus();
  };

  return (
    <form
      onSubmit={(e) => {
        onFormSubmit(e);
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
                onChange={(e) => {
                  setInputPayer(e.target.value as "me" | "both" | "else");
                  ref.current.focus();
                }}
              />
              <label htmlFor={payerObj.key}>{payerObj.label}</label>
            </div>
          ))}
        </div>
        <div className="flex content-center my-1">
          <input
            type="number"
            value={inputPrice !== 0 ? inputPrice : ""}
            onChange={(e) => {
              setInputPrice(Math.round(parseInt(e.target.value)));
            }}
            placeholder="150"
            className="flex-1 p-2 border-2 rounded-l-md border-r-0"
            aria-label="金額"
            ref={ref}
          />
          <div>
            <span className="flex-0 py-2 px-4 inline-block align-middle border-2 border-l-0 rounded-r-md">
              円
            </span>
          </div>
        </div>
        <button
          className="p-2 my-1 border-2 rounded-md bg-amber-400 text-white"
          aria-label="データを追加"
        >
          追加
        </button>
        <div className="flex justify-items-stretch mb-5">
          <button
            className="p-2 my-1 border-2 rounded-md bg-gray-600 text-white flex-1"
            type="button"
            onClick={() => {
              setInputPrice(Math.round(inputPrice * TAXRATE.normal));
              ref.current.focus();
            }}
            aria-label="普通税率を追加"
          >
            普通税率(×1.10)
          </button>
          <button
            className="p-2 my-1 border-2 rounded-md bg-gray-600 text-white flex-1"
            type="button"
            onClick={() => {
              setInputPrice(Math.round(inputPrice * TAXRATE.reduced));
              ref.current.focus();
            }}
            aria-label="軽減税率を追加"
          >
            軽減税率(×1.08)
          </button>
        </div>
      </div>
    </form>
  );
};
export default Form;
