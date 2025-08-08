// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { CheckCircle, CirclePlay } from "lucide-react";
// import { Card, CardContent, CardTitle } from "@/components/ui/card"; // Make sure this path is correct
// import { Badge } from "@/components/ui/badge";
// import {
//   useCompletedCourseMutation,
//   useGetCourseProgressQuery,
//   useInCompleteCourseMutation,
//   useUpdateLectureProgressMutation,
// } from "../../features/api/courseProgressApi";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";
// const CourseProgress = () => {
//   const params = useParams();
//   const courseId = params.courseId;
//   const { data, isLoading, isError, refetch } =
//     useGetCourseProgressQuery(courseId);

//   // const [updateLectureProgress] = useUpdateLectureProgressMutation();
//   const [updateLectureProgress, { isLoading: updating }] = useUpdateLectureProgressMutation();

//   const [
//     completedCourse,
//     { data: markCompleteData, isSuccess: completedSuccess },
//   ] = useCompletedCourseMutation();

//   const [
//     inCompeteCourse,
//     { data: markInCompleteData, isSuccess: inCompletedSuccess },
//   ] = useInCompleteCourseMutation();

//   useEffect(() => {
//     if (completedSuccess) {
//       refetch();
//       toast.success(markCompleteData.message);
//     }
//     if (inCompletedSuccess) {
//       toast.success(markInCompleteData.message);
//     }
//   }, [completedSuccess, inCompletedSuccess]);

//   const [currentLecture, setCurrentLecture] = useState(null);

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Failed to load course details</p>;

//   console.log(data);

//   const { courseDetails, progress, completed } = data.data;
//   const { courseTitle } = courseDetails;

//   const initialLecture =
//     currentLecture || courseDetails.lectures && courseDetails.lectures[0]

//   // const initialLecture = currentLecture ?? courseDetails?.lectures?.[0];

//   const isLectureCompleted = (lectureId) => {
//     return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
//   };

//   const handleSelectLecture = (lecture) => {
//     setCurrentLecture(lecture);
//   };

//   const handleLectureProgress = async (lectureId) => {
//     await updateLectureProgress({ courseId, lectureId });

//     refetch();
//   };

//   // const handleCompleteCourse = async () => {
//   //   await completeCourse(courseId);
//   // };
//   const handleCompleteCourse = async () => {
 
//   await completedCourse(courseId);
// };


//   const handleInCompleteCourse = async () => {
//     await inCompeteCourse(courseId);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 mt-20">
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">{courseTitle}</h1>
//         <Button
//           onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
//           variant={completed ? "outline" : "default"}
//         >
//           {completed ? (
//             <div className="flex items-center">
//               <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
//             </div>
//           ) : (
//             "Mark as completed"
//           )}
//         </Button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Video section */}
//         <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
//           <div className="mt-2">
//             <h3 className="font-medium text-lg">Lecture-1 Introduction</h3>
//           </div>
//           {/* <video /> */}
//           <video
//             src={currentLecture?.videoUrl || initialLecture.videoUrl}
//             controls
//             className="w-full h-auto md:rounded-lg"
//             onPlay={() =>
//               handleLectureProgress(currentLecture?._id || initialLecture._id)
//             }
//           />
//         </div>

//         {/* Lecture list */}
//         <div className="flex flex-col w-full md:w-2/3 border-t md:border-t-0 md:border-l border-l-gray-200 md:pl-4 pt-4 md:pt-0">
//           {/* <h2 className="font-semibold text-xl mb-4">
//             {`Lecture ${
//               courseDetails.lectures.findIndex(
//                 (lec) => lec._id === (currentLecture?._id || initialLecture._id)
//               ) + 1
//             } : ${currentLecture?.lectureTitle || initialLecture.lectureTitle}`}
//           </h2> */}




//           <h2 className="font-semibold text-xl mb-4">
//   Lecture{" "}
//   {
//     courseDetails.lectures.findIndex(
//       (lec) => lec._id === (currentLecture?._id || initialLecture._id)
//     ) + 1
//   }
//   : {currentLecture?.lectureTitle || initialLecture.lectureTitle}
// </h2>

//           <div className="flex-1 overflow-y-auto">
//             {courseDetails?.lectures.map((lecture, idx) => (
//               <Card
//                 key={lecture._id}
//                 // className={`mb-3 hover:cursor-pointer transition transform ${
//                 //   lecture._id === currentLecture?._id
//                 //     ? "bg-gray-200"
//                 //     : "dark:bg-gray-800"
//                 // } `}
//                 className={`mb-3 hover:cursor-pointer transition transform ${
//   lecture._id === (currentLecture?._id || initialLecture._id)
//     ? "bg-gray-200"
//     : "dark:bg-gray-800"
// }`}

//                 onClick={() => handleSelectLecture(lecture)}
//               >
//                 <CardContent className="flex items-center justify-between p-4">
//                   <div className="flex items-center">
//                     {isLectureCompleted(lecture._id) ? (
//                       <CheckCircle size={24} className="text-green-500 mr-2" />
//                     ) : (
//                       <CirclePlay size={24} className="text-gray-500 mr-2" />
//                     )}
//                     {/* <p className="font-medium">Lecture {lecture}</p> */}
//                     <div>
//                       <CardTitle className="text-lg font-medium">
//                         {lecture.lectureTitle}
//                       </CardTitle>
//                     </div>
//                   </div>
//                   {isLectureCompleted(lecture._id) && (
//                     <Badge
//                       variant={"outline"}
//                       className="bg-green-200 text-green-600"
//                     >
//                       completed
//                     </Badge>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseProgress;



import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, CirclePlay } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useCompletedCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "../../features/api/courseProgressApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [updateLectureProgress, { isLoading: updating, error: updateError }] = useUpdateLectureProgressMutation();
  const [completedCourse, { isSuccess: completedSuccess, error: completeError }] = useCompletedCourseMutation();
  const [inCompleteCourse, { isSuccess: inCompletedSuccess, error: inCompleteError }] = useInCompleteCourseMutation();

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success("Course marked as completed");
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success("Course marked as incomplete");
    }
    if (updateError) {
      toast.error("Failed to update lecture progress");
    }
    if (completeError) {
      toast.error("Failed to mark course as completed");
    }
    if (inCompleteError) {
      toast.error("Failed to mark course as incomplete");
    }
  }, [completedSuccess, inCompletedSuccess, updateError, completeError, inCompleteError, refetch]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;

  const { courseDetails, progress, completed } = data?.data || {};
  const { courseTitle, lectures = [] } = courseDetails || {};

  const initialLecture = currentLecture ?? lectures[0];

  const isLectureCompleted = (lectureId) => {
    return progress?.some((prog) => prog.lectureId === lectureId && prog.viewed) || false;
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);

  };

  const handleLectureProgress = async (lectureId) => {
    if (!updating) {
      await updateLectureProgress({ courseId, lectureId });
      refetch();
    }
  };

  const handleCompleteCourse = async () => {
    await completedCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle || "Course"}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          disabled={updating}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {initialLecture ? `Lecture ${lectures.findIndex((lec) => lec._id === initialLecture._id) + 1} Introduction` : "No lecture selected"}
            </h3>
          </div>
          {initialLecture ? (
            <video
              src={initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() => handleLectureProgress(initialLecture._id)}
            />
          ) : (
            <p>No lecture available</p>
          )}
        </div>

        {/* Lecture list */}
        <div className="flex flex-col w-full md:w-2/3 border-t md:border-t-0 md:border-l border-l-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">
            {initialLecture
              ? `Lecture ${lectures.findIndex((lec) => lec._id === initialLecture._id) + 1} : ${initialLecture.lectureTitle}`
              : "No lecture selected"}
          </h2>
          <div className="flex-1 overflow-y-auto">
            {lectures.length > 0 ? (
              lectures.map((lecture) => (
                <Card
                  key={lecture._id}
                  className={`mb-3 hover:cursor-pointer transition transform ${
                    lecture._id === initialLecture?._id ? "bg-gray-200 dark:bg-gray-700" : "dark:bg-gray-800"
                  }`}
                  onClick={() => handleSelectLecture(lecture)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle size={24} className="text-green-500 mr-2" />
                      ) : (
                        <CirclePlay size={24} className="text-gray-500 mr-2" />
                      )}
                      <div>
                        <CardTitle className="text-lg font-medium">{lecture.lectureTitle}</CardTitle>
                      </div>
                    </div>
                    {isLectureCompleted(lecture._id) && (
                      <Badge variant="outline" className="bg-green-200 text-green-600">
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No lectures available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;