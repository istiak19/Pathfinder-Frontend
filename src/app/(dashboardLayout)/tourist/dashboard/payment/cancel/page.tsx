// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ReusablePaymentStatusModal } from "@/app/(dashboardLayout)/_component/ReusablePaymentStatusModal";

// const CancelPage = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [open, setOpen] = useState(true);

//     const data = {
//         TransactionID: searchParams.get("transactionId") || "",
//         Amount: `${searchParams.get("amount")} BDT`,
//         Status: searchParams.get("status") || "",
//     };

//     return (
//         <ReusablePaymentStatusModal
//             open={open}
//             setOpen={setOpen}
//             type="cancel"
//             title="Payment Cancelled"
//             description={searchParams.get("message") || "You cancelled the payment."}
//             details={data}
//             buttonText="Back to Dashboard"
//             onButtonClick={() => router.push("/tourist/dashboard")}
//         />
//     );
// };

// export default CancelPage;
import React from 'react';

const page = () => {
    return (
        <div>
            cancel
        </div>
    );
};

export default page;