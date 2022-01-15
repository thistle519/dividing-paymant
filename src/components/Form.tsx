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
    </>
  );
};
export default Form;
