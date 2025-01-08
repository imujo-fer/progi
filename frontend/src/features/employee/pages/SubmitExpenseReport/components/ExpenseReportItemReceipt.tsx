import { useMatch } from "@tanstack/react-router";

export default function ExpenseReportItemReceipt() {
    const match = useMatch({ from: '/receipts/$receiptFileName' });
    const receiptFileName = match?.params.receiptFileName;

    return (
        <div>
            <h2>Receipt: {receiptFileName}</h2>
            <embed src={`./${receiptFileName}`} type="application/pdf" width="100%" height="600px" />
        </div>
    );
}