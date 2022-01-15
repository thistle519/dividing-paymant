import { FC, useState } from "react";
import { Payer, PaymentRecord } from "../App";

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
          e.preventDefault();
        }}
        className="bg-white"
      >
        <div className="flex flex-col">
          <div className="flex  justify-around">
            <div>
              <input
                type="radio"
                name="payer"
                value="me"
                id="me"
                onChange={(e) => setInputPayer(e.target.value as "me")}
              />
              <label htmlFor="me">わたし</label>
            </div>
            <div>
              <input
                type="radio"
                name="payer"
                value="both"
                id="both"
                onChange={(e) => setInputPayer(e.target.value as "both")}
              />
              <label htmlFor="both">ふたり</label>
            </div>
            <div>
              <input
                type="radio"
                name="payer"
                value="else"
                id="else"
                onChange={(e) => setInputPayer(e.target.value as "else")}
              />
              <label htmlFor="else">あいて</label>
            </div>
          </div>
          <input
            type="number"
            onChange={(e) => {
              setInputPrice(parseInt(e.target.value));
            }}
            className="p-2 border-2 rounded-md"
          />
          <button className="p-2 border-2 rounded-md bg-amber-300 text-white">
            追加
          </button>
        </div>
      </form>
    </>
  );
};
export default Form;
