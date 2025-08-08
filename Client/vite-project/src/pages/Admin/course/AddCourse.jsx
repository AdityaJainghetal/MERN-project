// import React, { useEffect, useState } from "react";

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

// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { useNavigate } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import { useCreateCourseMutation } from "../../../features/api/courseApi";
// import { toast } from "sonner";

// const AddCourse = () => {
//   const [courseTitle, setCourseTitle] = useState("");
//   const [category, setCategory] = useState("");

//   const [createCourse,{date,isLoading,error, isSuccess}] = useCreateCourseMutation();


//   const navigate = useNavigate();
 
  
//   const getSelectedCategory = (value) => {
//     setCategory(value);
//   };
//   const createCourseHandler = async() => {
//    await createCourse({courseTitle,category})
  
//   };

//   useEffect(()=>{
//     if(isSuccess){
//       toast.success(date?.message || "Course created")
//     }
//   },[isSuccess,error])

//   return (
//     <div className="flex-1 mx-10">
//       <div className="mb-4">
//         <h1 className="font-bold text-xl">
//           Lets add course,add some basic course details for your new course
//         </h1>
//         <p className="text-sm">Lorem ipsum dolor sit amet.</p>
//       </div>

//       <div className="space-y-4">
//         <div>
//           <Label>Title</Label>
//           <Input
//             type="text"
//             name="courseTitle"
//             value={courseTitle}
//             onChange={(e) => setCourseTitle(e.target.value)}
//             placeholder="Your Course Name"
//           />
//         </div>

//         <div>
//           <Select onValueChange={getSelectedCategory}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select a category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Category</SelectLabel>
//                 <SelectItem value="Next Js">Next Js</SelectItem>
//                 <SelectItem value="Data Science">Data Science</SelectItem>
//                 <SelectItem value="Frontend developer">
//                   Frontend developer
//                 </SelectItem>
//                 <SelectItem value="MERN Stack developer">
//                   MERN Stack developer
//                 </SelectItem>
//                 <SelectItem value="JavaScript">JavaScript</SelectItem>

//                 <SelectItem value="Python">Python</SelectItem>

//                 <SelectItem value="Docker">Docker</SelectItem>
//                 <SelectItem value="MongoDb">MongoDb</SelectItem>
//                 <SelectItem value="HTML">HTML</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" onClick={() => navigate("/admin/course")}>
//             Back
//           </Button>
//           <Button disabled={isLoading} onClick={createCourseHandler}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </>
//             ) : (
//               "Create"
//             )}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCourse;



import React, { useEffect, useState } from "react";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "../../../features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  // ✅ FIX: It should be 'data', not 'date'
  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created");
      navigate("/admin/course")
    }
  }, [isSuccess, error, data]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let’s add a course, add some basic course details for your new course
        </h1>
        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>

        <div>
          <Select onValueChange={getSelectedCategory}>
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

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
