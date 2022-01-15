import { FC, useState } from "react";
import { Payer, PaymentRecord } from "../App";
import { TAXRATE } from "../const";

type FormProps = {
  paymentRecords: PaymentRecord[];
  setPaymentRecords: (prs: PaymentRecord[]) => void;
};
const Form: FC<FormProps> = ({ setPaymentRecords, paymentRecords }) => {
  const [inputPrice, setInputPrice] = useState(0);
  const [inputPayer, setInputPayer] = useState<Payer>("both");
  return (
    <>
      <form
        onSubmit={(e) => {
          setPaymentRecords([
            ...paymentRecords,
            { payer: inputPayer, price: inputPrice },
          ]);
          setInputPrice(0);
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
          />
          <button className="p-2 my-1 border-2 rounded-md bg-amber-300 text-white">
            追加
          </button>
          <button
            className="p-2 my-1 border-2 rounded-md bg-gray-600 text-white"
            type="button"
            onClick={() => {
              setInputPrice(inputPrice * TAXRATE);
            }}
          >
            税金
          </button>
        </div>
      </form>
    </>
  );
};
export default Form;
