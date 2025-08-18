// import { BadgeInfo, Play, PlayCircle } from "lucide-react";
// import React from "react";
// import { Card, CardContent ,CardFooter } from "@/components/ui/card";
// import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import BuyCourseButton from "../../components/BuyCourseButton";
// import { useParams } from "react-router-dom";
// import { useGetCourseDetailWithStatusQuery } from "../../features/api/purchaseApi.js";
// // import { Label } from "@/components/ui/label";
// // import { Input } from "@/components/ui/input";
// const CourseDetail = () => {
//   const params = useParams();

//   const courseId = params.courseId;
//   const {data,isLoading,isError} = useGetCourseDetailWithStatusQuery(courseId);
//   if(isLoading) return <h1>Loading...</h1>
//   if(isError) return <h1>Failed to course details</h1>

//   const {course,purchased}=data;
//   console.log(data,"dataaaaaaaa")
//   return (
//     <div className="mt-24 space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2 ">
//           <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
//           <p className="text-base md:text-lg">Course Sub-title</p>
//           <p>
//             Created By{""}{" "}
//             <span className="text-[#C0C4FC] underline italic">
//               {course?.creator.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>{course?.createdAt.split("T")[0]}</p>
//           </div>
//           <p>Studeents enrolled: {course?.enrolledStudents.length}</p>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p className="text-sm">
//             {{__html:course.description}}
//           </p>

//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>4 lecture</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course.lecture.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>
//                     {true ? <PlayCircle size={14} /> : <Lock size={14} />}
//                   </span>
//                   <p>{lecture.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">Video</div>

//               <h1>Lecture title</h1>
//               <Separator className="my-2" />
//               <h1 className="text-lg md:text-xl font-semibold ">
//                 Course Price
//               </h1>
//             </CardContent>
//             <CardFooter className="flex justify-center p-4 ">
//               {
//                 purchased ? (
//                   <Button>Continue Course</Button>
//                 ):(
//                     <BuyCourseButton courseId={courseId}/>
//                 )
//               }
             
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;



// import { BadgeInfo, PlayCircle, Lock } from "lucide-react";
// import React from "react";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import BuyCourseButton from "../../components/BuyCourseButton";
// import { useParams } from "react-router-dom";
// import { useGetCourseDetailWithStatusQuery } from "../../features/api/purchaseApi.js";
// import ReactPlayer from 'react-player';

// const CourseDetail = () => {
//   const params = useParams();
//   const courseId = params.courseId;

//   const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Failed to fetch course details</h1>;

//   const { course, purchased } = data;

//   return (
//     <div className="mt-24 space-y-5">
//       {/* Top Banner */}
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
//           <p className="text-base md:text-lg">Course Sub-title</p>
//           <p>
//             Created By{" "}
//             <span className="text-[#C0C4FC] underline italic">
//               {course?.creator?.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>{course?.createdAt?.split("T")[0]}</p>
//           </div>
//           <p>Students enrolled: {course?.enrolledStudents?.length || 0}</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         {/* Left Section */}
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <div
//             className="text-sm"
//             dangerouslySetInnerHTML={{ __html: course?.description || "" }}
//           ></div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>
//                 {course?.lectures?.length || 0} Lectures
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {Array.isArray(course?.lectures) && course.lectures.length > 0 ? (
//                 course.lectures.map((lecture, idx) => (
//                   <div key={idx} className="flex items-center gap-3 text-sm">
//                     <span>
//                       {purchased ? <PlayCircle size={14} /> : <Lock size={14} />}
//                     </span>
//                     <p>{lecture?.lectureTitle}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 italic">No lectures available.</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section */}
//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4 bg-gray-200 flex items-center justify-center text-sm text-gray-600">
//                 <ReactPlayer
//                 width="100%"
//                 height={"100%"}
//                 // url={course?.lecture[0]?.videoUrl}
//                 url={course?.lectures?.[0]?.videoUrl}

//                 controls={true}
//                 />
//               </div>

//               <h1>Lecture title</h1>
//               <Separator className="my-2" />
//               <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
//             </CardContent>
//             <CardFooter className="flex justify-center p-4">
//               {purchased ? (
//                 <Button>Continue Course</Button>
//               ) : (
//                 <BuyCourseButton courseId={courseId} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;




// import { BadgeInfo, PlayCircle, Lock } from "lucide-react";
// import React from "react";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import BuyCourseButton from "../../components/BuyCourseButton";
// import { useParams } from "react-router-dom";
// import { useGetCourseDetailWithStatusQuery } from "../../features/api/purchaseApi.js";
// import ReactPlayer from "react-player";

// const CourseDetail = () => {
//   const params = useParams();
//   const courseId = params.courseId;

//   const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Failed to fetch course details</h1>;

//   const { course, purchased } = data;

//   return (
//     <div className="mt-24 space-y-5">
//       {/* Top Banner */}
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
//           <p className="text-base md:text-lg">{course?.subTitle || "Course Sub-title"}</p>
//           <p>
//             Created By{" "}
//             <span className="text-[#C0C4FC] underline italic">
//               {course?.creator?.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>{course?.createdAt?.split("T")[0]}</p>
//           </div>
//           <p>Students enrolled: {course?.enrolledStudents?.length || 0}</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         {/* Left Section */}
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <div
//             className="text-sm"
//             dangerouslySetInnerHTML={{ __html: course?.description || "" }}
//           ></div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>
//                 {course?.lectures?.length || 0} Lectures
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {Array.isArray(course?.lectures) && course.lectures.length > 0 ? (
//                 course.lectures.map((lecture, idx) => (
//                   <div key={idx} className="flex items-center gap-3 text-sm">
//                     <span>
//                       {purchased ? <PlayCircle size={14} /> : <Lock size={14} />}
//                     </span>
//                     <p>{lecture?.lectureTitle}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 italic">No lectures available.</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section */}
//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4 bg-gray-200 flex items-center justify-center text-sm text-gray-600">
//                 {purchased ? (
//                   <ReactPlayer
//                     width="100%"
//                     height="100%"
//                     url={course?.lectures?.[0]?.videoUrl}
//                     controls={true}
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full w-full text-gray-600">
//                     <Lock size={20} className="mr-2" />
//                     Purchase to view content
//                   </div>
//                 )}
//               </div>

//               <h1 className="font-semibold text-base md:text-lg">
//                 {course?.lectures[0]?.lectureTitle || "Lecture title"}
//               </h1>

//               <Separator className="my-2" />

//               <h1 className="text-lg md:text-xl font-semibold">
//                 ₹{course?.coursePrice || "N/A"}
//               </h1>
//             </CardContent>

//             <CardFooter className="flex justify-center p-4">
//               {purchased ? (
//                 <Button>Continue Course</Button>
//               ) : (
//                 <BuyCourseButton courseId={courseId} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;



import { BadgeInfo, PlayCircle, Lock } from "lucide-react";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import BuyCourseButton from "../../components/BuyCourseButton";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseDetailWithStatusQuery } from "../../features/api/purchaseApi.js";
import ReactPlayer from 'react-player';

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate= useNavigate()

  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to fetch course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse=()=>{
    if(purchased){
      navigate(`/course-progress/${courseId}`)
    } 
  }
  return (
    <div className="mt-24 space-y-5">
      {/* Top Banner */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-lg">Course Sub-title</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator?.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>{course?.createdAt?.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents?.length || 0}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course?.description || "" }}
          ></div>

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course?.lectures?.length || 0} Lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.isArray(course?.lectures) && course.lectures.length > 0 ? (
                course.lectures.map((lecture, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <span>
                      {purchased ? <PlayCircle size={14} /> : <Lock size={14} />}
                    </span>
                    <p>{lecture?.lectureTitle}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No lectures available.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              {/* <div className="w-full aspect-video mb-4 bg-gray-200 flex items-center justify-center text-sm text-gray-600">
             
                <video
                  width="100%"
                height={"100%"}
                // url={course?.lecture[0]?.videoUrl}
                url={course?.lectures?.[0].videoUrl}

              controls
                
                
                />
              </div> */}

<div className="w-full aspect-video mb-4 bg-gray-200 flex items-center justify-center text-sm text-gray-600">
  <video
    width="100%"
    height="100%"
    src={course?.lectures?.[0]?.videoUrl} // ✅ Correct attribute
    controls
  />
</div>

              <h1>{course?.lectures[0]?.lectureTitle}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price : {course?.coursePrice}</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse}>Continue Course</Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
