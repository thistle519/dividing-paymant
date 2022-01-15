import { FC } from "react";
import { Payer, PaymentRecord } from "./App";

type RecordsListProps = {
  paymentRecords: PaymentRecord[];
  setPaymentRecords: (prs: PaymentRecord[]) => void;
};

const convertPayerToJa = (payer: Payer): String => {
    if (payer === "me") return "私";
    if (payer === "both") return "どっちも";
    if (payer === "else") return "あいて";
    throw new Error();
  };

const RecordsList: FC<RecordsListProps> = ({setPaymentRecords, paymentRecords}) => {
  return (
    <ul>
      {paymentRecords.map((pr, prindex) => (
        <li key={`${pr.price}+${prindex}`}>
          {pr.price}円 {convertPayerToJa(pr.payer)}
          <button
            type="button"
            onClick={() => {
              setPaymentRecords(
                paymentRecords.filter((_, index) => index !== prindex)
              );
            }}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
};
export default RecordsList;
