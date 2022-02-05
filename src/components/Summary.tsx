import { FC } from "react";

type SummaryProps = {
  myTotalAmount: number;
  totalAmount: number;
  yourTotalAmount: number;
};
const Summary: FC<SummaryProps> = ({
  myTotalAmount,
  totalAmount,
  yourTotalAmount,
}) => {
  return (
    <div>
      <p>
        わたしは <span className="font-bold text-lg">{myTotalAmount}</span>{" "}
        円です.
      </p>
      <p>
        あいては <span className="font-bold text-lg">{yourTotalAmount}</span>{" "}
        円です.
      </p>
      <p>
        あわせて <span className="font-bold text-lg">{totalAmount}</span>{" "}
        円です.
      </p>
    </div>
  );
};
export default Summary;
