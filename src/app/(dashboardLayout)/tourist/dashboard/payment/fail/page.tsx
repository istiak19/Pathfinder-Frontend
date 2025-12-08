// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ReusablePaymentStatusModal } from "@/app/(dashboardLayout)/_component/ReusablePaymentStatusModal";

// const FailPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [open, setOpen] = useState(true);

//   const data = {
//     TransactionID: searchParams.get("transactionId") || "",
//     Amount: `${searchParams.get("amount")} BDT`,
//     Status: searchParams.get("status") || "",
//   };

//   return (
//     <ReusablePaymentStatusModal
//       open={open}
//       setOpen={setOpen}
//       type="fail"
//       title="Payment Failed!"
//       description={
//         searchParams.get("message") || "Your payment could not be completed."
//       }
//       details={data}
//       buttonText="Try Again"
//       onButtonClick={() => router.push("/tourist/dashboard/payment")}
//     />
//   );
// };

// export default FailPage;

import React from 'react';

const page = () => {
  return (
    <div>
      fail
    </div>
  );
};

export default page;