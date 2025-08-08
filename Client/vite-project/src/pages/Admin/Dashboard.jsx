// import React from "react";
// // import {Card,CardHeader,CardTitle} from "@/components/ui/card"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Adjust the path as per your project
// import { ResponsiveContainer, Tooltip, YAxis } from "recharts";
// import { LineChart } from "lucide-react";

// const Dashboard = () => {
//   return (
//     <div className="mt-20 ml-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader>
//           <CardTitle>Total Sales</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <p className="text-3xl font-bold text-blue-600">800</p>
//         </CardContent>
//       </Card>

//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader>
//           <CardTitle>Total Revenue</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <p className="text-3xl font-bold text-blue-600">1200</p>
//         </CardContent>
//       </Card>

//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader>
//           <CardTitle>Course Price</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={courseData}>
//                 <CartesianGrid>
//                   <XAxis
//                     dataKey="name"
//                     stroke="#6b7280"
//                     angle={-30}
//                     textAnchor="end"
//                     interval={0}
//                   />

//                   <YAxis stroke="#6b7280" />
//                   <Tooltip formatter={(value, name) => [`${value},name`]} />
//                   <Line
//                     type="monotone"
//                     dataKey="price"
//                     stroke="#4a90e2"
//                     strokeWidth={3}
//                     dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
//                   />
//                 </CartesianGrid>
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
        
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;

// import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card"; // Adjust the path as per your project
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
// import { useGetPurchaseCoursesQuery } from "../../features/api/purchaseApi";



//   const {data,isSuccess,isError,isLoading} = useGetPurchaseCoursesQuery()
//   if(isLoading) return <h1>Loading...</h1>
//   if(Error) return <h1 className="text-red-500">Failed to get purchased course</h1>

//   const {purchasedCourse} = data || [];
//   const courseData = purchasedCourse.map((course)=>({
//     name:course.courseId.courseTitle,
//     price:course.courseId.coursePrice

//   }))
// const Dashboard = () => {
//   return (
//     <div className="mt-20 ml-10 mr-10 space-y-6">
//       {/* Top 2 cards in a row */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//           <CardHeader>
//             <CardTitle>Total Sales</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold text-blue-600">800</p>
//           </CardContent>
//         </Card>

//         <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//           <CardHeader>
//             <CardTitle>Total Revenue</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold text-blue-600">₹1200</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Chart below full width */}
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader>
//           <CardTitle>Course Price Chart</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={courseData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="name"
//                 stroke="#6b7280"
//                 angle={-30}
//                 textAnchor="end"
//                 interval={0}
//               />
//               <YAxis stroke="#6b7280" />
//               <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
//               <Line
//                 type="monotone"
//                 dataKey="price"
//                 stroke="#4a90e2"
//                 strokeWidth={3}
//                 dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useGetPurchaseCoursesQuery } from "../../features/api/purchaseApi";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchaseCoursesQuery();

  if (isLoading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (isError) return <h1 className="text-red-500 text-center mt-10">Failed to get purchased courses</h1>;

  const { purchaseCourse = [] } = data || {};

  const courseData = purchaseCourse.map((course) => ({
    name: course?.courseId?.courseTitle || "N/A",
    price: parseFloat(course?.courseId?.coursePrice) || 0,
  }));

  return (
    <div className="mt-20 ml-10 mr-10 space-y-6">
      {/* Top 2 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{purchaseCourse.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              ₹
              {purchaseCourse.reduce(
                (acc, curr) => acc + parseFloat(curr?.courseId?.coursePrice || 0),
                0
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Course Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  minTickGap={10}
                />
                <YAxis stroke="#6b7280" allowDataOverflow />
                <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4a90e2"
                  strokeWidth={3}
                  dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
