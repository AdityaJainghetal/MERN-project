// import React, { useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useCreateCheckoutSessionMutation } from "../features/api/purchaseApi";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// const BuyCourseButton = ({courseId}) => {
//   const [createCheckoutSession, { data, isLoading, isSuccess, isError }] =
//     useCreateCheckoutSessionMutation();

//   const purchaseCourseHandler = async () => {
//     await createCheckoutSession(courseId);
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       if (data?.url) {
//         window.location.href = data.url;
//       } else {
//         toast.error("Invalid response from server");
//       }
//     }
//     if (isError) {
//       toast.error("Failed to create checkout");
//     }
//   }, [data, isSuccess, isError]);

//   return (
//     <Button
//       disabled={isLoading}
//       className="w-full"
//       onClick={purchaseCourseHandler}
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </>
//       ) : (
//         "Puchase Course"
//       )}
//     </Button>
//   );
// };

// export default BuyCourseButton;




// import React, { useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useCreateCheckoutSessionMutation } from "../features/api/purchaseApi";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// const BuyCourseButton = ({ courseId }) => {
//   const [createCheckoutSession, { data, isLoading, isSuccess, isError }] =
//     useCreateCheckoutSessionMutation();

//   const purchaseCourseHandler = async () => {
//     try {
//       await createCheckoutSession({ courseId });
//     } catch (err) {
//       toast.error("Checkout failed");
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       if (data?.url) {
      
//         window.location.href = data.url;
//       } else {
//         toast.error("Invalid response from server");
//       }
//     }
//     if (isError) {
//       toast.error("Failed to create checkout");
//     }
//   }, [data, isSuccess, isError]);

//   return (
//     <Button
//       disabled={isLoading}
//       className="w-full"
//       onClick={purchaseCourseHandler}
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </>
//       ) : (
//         "Purchase Course"
//       )}
//     </Button>
//   );
// };

// export default BuyCourseButton;



import React from "react";
import { Button } from "@/components/ui/button";
import { useCreateCheckoutSessionMutation } from "../features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    try {
      const response = await createCheckoutSession({ courseId }).unwrap();
      if (response?.url) {
        window.location.href = response.url;
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err) {
      toast.error("Checkout failed");
    }
  };

  return (
    <Button
      disabled={isLoading}
      className="w-full"
      onClick={purchaseCourseHandler}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
