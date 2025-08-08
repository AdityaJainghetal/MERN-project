// import React from "react";
// import { Button } from "@/components/ui/Button";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
//   TableFooter,
// } from "@/components/ui/table";
// import { useNavigate } from "react-router-dom";
// import { useGetCreatorCourseQuery } from "../../../features/api/courseApi";
// import { Badge, Edit } from "lucide-react";

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];

// const Coursetable = () => {
//   const {data,isLoading}= useGetCreatorCourseQuery();
//     const navigate = useNavigate();

//     if(isLoading) return <h1>Loading...</h1>
//     console.log("data",data)
//   return (
//     <div>
//       <Button onClick={()=>navigate(`create`)}>Create a new course</Button>
//       <Table>
//         <TableCaption>A list of your recent invoices.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Price</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Title</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.courses.map((courses) => (
//             <TableRow key={courses._id}>
//               <TableCell className="font-medium">{courses?.coursePrice || "NA"}</TableCell>
//               <TableCell><Badge>{courses.isPublished ? "Published" : "Draft"}</Badge></TableCell>
//               <TableCell>{courses.courseTitle}</TableCell>
//               <TableCell className="text-right">
//                 <Button size="sm" variant="gost"><Edit/></Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//         <TableFooter>
         
//         </TableFooter>
//       </Table>
//     </div>
//   );
// };

// export default Coursetable;



import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "../../../features/api/courseApi";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // ✅ FIXED import

const Coursetable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading...</h1>;

  console.log("data", data);

  return (
    <div>
      <Button onClick={() => navigate(`create`)}>Create a new course</Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses?.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course?.coursePrice || "NA"}
              </TableCell>

              {/* ✅ Show Draft or Published */}
              <TableCell>
                <Badge
                  className={`${
                    course.isPublished ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>

              <TableCell>{course.courseTitle}</TableCell>

              <TableCell className="text-right">
                <Button size="sm" variant="ghost" onClick={()=>navigate(`${course._id}`)}>
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Coursetable;
