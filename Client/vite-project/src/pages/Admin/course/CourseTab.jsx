// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import RichTextEditor from "../../../components/RichTextEditor";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Loader2 } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   courseApi,
//   useEditCourseMutation,
//   useGetCourseByIdQuery,
//   usePublishCourseMutation,
// } from "../../../features/api/courseApi";
// import { toast } from "sonner";

// const CourseTab = () => {
//   const [input, setInput] = useState({
//     courseTitle: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     courseLevel: "",
//     coursePrice: "",
//     courseThumbnail: "",
//   });
//     const params = useParams();
//   const courseId = params.courseId;

//   const { data: courseByIdData, isLoading: courseByIdLoading ,refetch} =
//     useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});


//   const [publishCourse,{}] = usePublishCourseMutation()


//   const course = courseByIdData?.course;
//   // useEffect(() => {
//   //   if (course) {
//   //     setInput({
//   //       courseTitle: course.courseTitle,
//   //       subTitle: course.subTitle,
//   //       description: course.description,
//   //       category: course.category,
//   //       courseLevel: course.courseLevel,
//   //       coursePrice: course.coursePrice,
//   //       courseThumbnail: "",
//   //     });
//   //   }
//   // }, [course]);


//  useEffect(() => {
//   if (course) {
//     setInput((prev) => ({
//       ...prev,
//       courseTitle: prev.courseTitle || course.courseTitle,
//       subTitle: prev.subTitle || course.subTitle,
//       description: prev.description || course.description,
//       category: prev.category || course.category,
//       courseLevel: prev.courseLevel || course.courseLevel,
//       coursePrice: prev.coursePrice || course.coursePrice,
//     }));
//     if (!previewThumbail && course.thumbnail) {
//       setPreviewThumbnail(course.thumbnail);
//     }
//   }
// }, [course]);

//   const publishStatusHandler = async(action)=>{
//     try {
//       const response = await publishCourse({courseId,query:action});
//       if(response.data){
//         refetch();
//         toast.success(response.data.message)
//       }
//     } catch (error) {
//       toast.error("Failed to publish or unpublish course")
//     }
//   }



//   const [previewThumbail, setPreviewThumbnail] = useState("");
//   const navigate = useNavigate();


//   const [editCourse, { data, isLoading, isSuccess, error }] =
//     useEditCourseMutation();

//   // ✅ FIXED change handler
//   const changeEventHandler = (e) => {
//     const { name, value } = e.target; // ✅ correct destructure
//     setInput({ ...input, [name]: value });
//   };

//   const selectCategory = (value) => {
//     setInput({ ...input, category: value });
//   };

//   // ✅ FIXED course level setter
//   const selectCourselevel = (value) => {
//     setInput({ ...input, courseLevel: value });
//   };

//   const selectThumbail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setInput({ ...input, courseThumbnail: file });
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
//       fileReader.readAsDataURL(file);
//     }
//   };

//   const updateCourseHandler = async () => {
//     const formData = new FormData();
//     formData.append("courseTitle", input.courseTitle);
//     formData.append("subTitle", input.subTitle);
//     formData.append("description", input.description);
//     formData.append("category", input.category);
//     formData.append("courseLevel", input.courseLevel);
//     formData.append("coursePrice", input.coursePrice);
//     formData.append("courseThumbnail", input.courseThumbnail);

//     // ✅ send formData
//     await editCourse({ formData, courseId });
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message || "Course updated successfully");
//     }
//     if (error) {
//       toast.error(error?.data?.message || "Failed to update course");
//     }
//   }, [isSuccess, error, data]);

//   const isPublished = false;

//   return (
//     <Card>
//       <CardHeader className="flex flex-row justify-between">
//         <div>
//           <CardTitle>Basic Course Information</CardTitle>
//           <CardDescription>
//             Make changes to your course here. Click save when you're done.
//           </CardDescription>
//         </div>
//         <div className="space-x-2">
//           <Button disabled={courseByIdData?.course.lecture.length === 0} variant="outline" onClick={()=>publishStatusHandler(courseByIdData?.course.isPublished ? "false": "true")}>
//             {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
//           </Button>
//           <Button>Remove Course</Button>
//         </div>
//       </CardHeader>

//       <CardContent>
//         {/* Title */}
//         <div className="space-y-4 mt-5">
//           <Label>Title</Label>
//           <Input
//             type="text"
//             name="courseTitle"
//             value={input.courseTitle}
//             onChange={changeEventHandler}
//             placeholder="Enter your title"
//           />
//         </div>

//         {/* Subtitle */}
//         <div className="space-y-4 mt-5">
//           <Label>Subtitle</Label>
//           <Input
//             type="text"
//             name="subTitle" // ✅ FIXED
//             placeholder="Enter your subtitle"
//             value={input.subTitle}
//             onChange={changeEventHandler}
//           />
//         </div>

//         {/* Description */}
//         <div className="space-y-4 mt-5">
//           <Label>Description</Label>
//           <RichTextEditor input={input} setInput={setInput} />
//         </div>

//         {/* Category, Level, Price */}
//         <div className="flex items-center gap-5">
//           {/* Category */}
//           <div>
//             <Label>Category</Label>
//             <Select onValueChange={selectCategory}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select a category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectLabel>Category</SelectLabel>
//                   <SelectItem value="Next Js">Next Js</SelectItem>
//                   <SelectItem value="Data Science">Data Science</SelectItem>
//                   <SelectItem value="Frontend developer">
//                     Frontend developer
//                   </SelectItem>
//                   <SelectItem value="MERN Stack developer">
//                     MERN Stack developer
//                   </SelectItem>
//                   <SelectItem value="JavaScript">JavaScript</SelectItem>
//                   <SelectItem value="Python">Python</SelectItem>
//                   <SelectItem value="Docker">Docker</SelectItem>
//                   <SelectItem value="MongoDb">MongoDb</SelectItem>
//                   <SelectItem value="HTML">HTML</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Course Level */}
//           <div>
//             <Label>Course Level</Label>
//             <Select onValueChange={selectCourselevel}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select a course level" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectLabel>Course Level</SelectLabel>
//                   <SelectItem value="Beginner">Beginner</SelectItem>
//                   <SelectItem value="Medium">Medium</SelectItem>
//                   <SelectItem value="Advance">Advance</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Price */}
//           <div>
//             <Label>Price in (INR)</Label>
//             <Input
//               type="number"
//               name="coursePrice"
//               value={input.coursePrice}
//               onChange={changeEventHandler}
//               placeholder="Enter your price"
//             />
//           </div>
//         </div>

//         {/* Thumbnail Upload */}
//         <div className="mt-4">
//           <Label>Course Thumbnail</Label>
//           <Input
//             type="file"
//             onChange={selectThumbail}
//             accept="image/*"
//             className="w-fit"
//           />
//           {previewThumbail && (
//             <img
//               src={previewThumbail}
//               className="h-64 my-2"
//               alt="Course Thumbnail"
//             />
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="space-x-2 mt-4">
//           <Button onClick={() => navigate("/admin/course")} variant="outline">
//             Cancel
//           </Button>
//           <Button disabled={isLoading} onClick={updateCourseHandler}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </>
//             ) : (
//               "Save"
//             )}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseTab;




import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../../../components/RichTextEditor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "../../../features/api/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const params = useParams();
  const courseId = params.courseId;

  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } =
    useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const [publishCourse] = usePublishCourseMutation();
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const navigate = useNavigate();
  const course = courseByIdData?.course;

  // ✅ Populate form when course data loads
  useEffect(() => {
    if (course) {
      setInput((prev) => ({
        ...prev,
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
      }));

      if (!previewThumbnail && course.thumbnail) {
        setPreviewThumbnail(course.thumbnail);
      }
    }
  }, [course]);

  // ✅ Handle publish/unpublish course
  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update publish status");
    }
  };

  // ✅ Handle input changes
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // ✅ Handle select changes
  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  // ✅ Handle thumbnail upload
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });

      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  // ✅ Submit updated course
  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    // formData.append("courseThumbnail", input.courseThumbnail);
if (input.courseThumbnail instanceof File) {
    formData.append("thumbnail", input.courseThumbnail); // ✅ SAME as multer
  }

    await editCourse({ formData, courseId });
  };

  // ✅ Show success/error messages
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, error, data]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your course here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            disabled={courseByIdData?.course?.lecture?.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course?.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course?.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Title */}
        <div className="space-y-4 mt-5">
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Enter your title"
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-4 mt-5">
          <Label>Subtitle</Label>
          <Input
            type="text"
            name="subTitle"
            placeholder="Enter your subtitle"
            value={input.subTitle}
            onChange={changeEventHandler}
          />
        </div>

        {/* Description */}
        <div className="space-y-4 mt-5">
          <Label>Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        {/* Category, Level, Price */}
        <div className="flex items-center gap-5 mt-5">
          {/* Category */}
          <div>
            <Label>Category</Label>
            <Select onValueChange={selectCategory} value={input.category}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Next Js">Next Js</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Frontend developer">
                    Frontend developer
                  </SelectItem>
                  <SelectItem value="MERN Stack developer">
                    MERN Stack developer
                  </SelectItem>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Docker">Docker</SelectItem>
                  <SelectItem value="MongoDb">MongoDb</SelectItem>
                  <SelectItem value="HTML">HTML</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Course Level */}
          <div>
            <Label>Course Level</Label>
            <Select onValueChange={selectCourseLevel} value={input.courseLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course Level</SelectLabel>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div>
            <Label>Price in (INR)</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="Enter your price"
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="mt-4">
          <Label>Course Thumbnail</Label>
          <Input
            type="file"
            onChange={selectThumbnail}
            accept="image/*"
            className="w-fit"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              className="h-64 my-2"
              alt="Course Thumbnail"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="space-x-2 mt-4">
          <Button onClick={() => navigate("/admin/course")} variant="outline">
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={updateCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
