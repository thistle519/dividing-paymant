import { FC } from "react";

type SummaryProps = {
    myTotalAmount: number;
}
const Summary: FC<SummaryProps>= ({myTotalAmount}) => {
  return (
    <>
      自分が払うべきお金は{" "}
      <span className="font-bold text-lg">{myTotalAmount}</span> 円です
    </>
  );
};
export default Summary;
