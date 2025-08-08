// import React from "react";
// import { Card, CardContent } from "@/components/ui/card"; // Ensure this path is correct

// const Course = () => {
//   return (
//     <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//       <div className="relative">
//         <img
//           src="https://images.ctfassets.net/23aumh6u8s0i/c04wENP3FnbevwdWzrePs/1e2739fa6d0aa5192cf89599e009da4e/nextjs"
//           className="w-full h-36 object-cover rounded-t-lg"
//           alt="Course Thumbnail"
//         />
//       </div>
//       <CardContent>
//         <h1 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
//           Next.js Complete Course in Hindi 2024
//         </h1>
//       </CardContent>
//     </Card>
//   );
// };

// export default Course;
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // ✅ Correct import
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`course-detail/${course._id}`}>
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src={course?.courseThumbnail}
          className="w-full h-36 object-cover rounded-t-lg"
          alt="Course Thumbnail"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
          {course.courseTitle}
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={course.creator?.photoUrl ||"https://github.com/shadcn.png"}
                alt="@user"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm text-gray-700 dark:text-gray-300">
             {course.creator?.name}
            </h1>
          </div>

          <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
           {course.courseLevel}
          </Badge>
        </div>

        <div className="text-lg font-bold text-gray-900 dark:text-white">
         {course.coursePrice}
        </div>
      </CardContent>
    </Card>
    
    </Link>
  );
};

export default Course;
