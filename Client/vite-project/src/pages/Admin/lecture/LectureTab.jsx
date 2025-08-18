// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// // import { Card } from "@/components/ui/card";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardDescription,
// } from "@/components/ui/card";
// // import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch";
// import axios from "axios";
// import { toast } from "sonner";

// const MEDIA_API = "http://localhost:8000/api/v1/media";

// const LectureTab = () => {
//   const [title, setTitle] = useState("");

//   const { uploadVideoInfo, setUploadVideoInfo } = useState(null);
//   const [isFree, setIsFree] = useState(false);
//   const [mediaProgress, setMediaProgress] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [binaDisable, setBinDisable] = useState(true);

//   const fileChangeHandler = async (e) => {
//     const file = e.target.value.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
//       setMediaProgress(true);
//       try {
//         const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
//           onUploadProgress: ({ loaded, total }) => {
//             setUploadProgress(Math.round((loaded * 100) / total));
//           },
//         });
//         if(res.data.success){
//           console.log(res);
//           setUploadVideoInfo({videoUrl:res.data.data.url, publicId:res.data.data.publicId})
//         setBinDisable(false)
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error("video upload failed");
//       }finally{
//         setMediaProgress(false)
//       }
//     }
//   };

//   return (
//     <Card>
//       <CardHeader className="flex justify-between">
//         <div>
//           <CardTitle>Edit Lecture</CardTitle>
//           <CardDescription>
//             Make changes and click save when done
//           </CardDescription>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="destructive">Remove Lecture</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div>
//           <Label>Title</Label>
//           <Input type="text" placeholder="Enter your title" />
//         </div>

//         <div className="my-5">
//           <Label>
//             Video <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             type="file"
//             accept="video/*"
//             onChange={fileChangeHandler}
//             placeholder="Enter your title"
//             className="w-fit"
//           />
//         </div>
//         <div className="flex items-center space-x-2 my-5">
//           <Switch id="airplane-mode" />
//           <Label htmlFor="airplane-mode">Is this video FREE</Label>
//         </div>
//         {
//           mediaProgress && (
//             <div className="my-4">
//               <Progress value={uploadProgress}/>
//               <p>{uploadProgress}% uploaded</p>

//             </div>
//           )

//         }
//         <div className="mt-4">
//           <Button>Update lecture</Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default LectureTab;

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { toast } from "sonner";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "../../../features/api/courseApi";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const MEDIA_API = "https://mern-project-2-kjz3.onrender.com/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [binaDisable, setBinaDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle), setIsFree(lecture, isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();

  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0]; // ✅ FIXED: should use files[0]
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);

      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          console.log(res);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.publicId,
          });
          setBinaDisable(false);
          toast.success("Video uploaded successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      isFree,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
    }
  }, [removeSuccess]);
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disbaled={removeLoading}
            variant="destructive"
            onClick={removeLectureHandler}
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
            Remove Lecture
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Title Input */}
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Enter your title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        {/* Video Upload */}
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            className="w-fit"
          />
        </div>

        {/* Switch */}
        <div className="flex items-center space-x-2 my-5">
          <Switch
            id="free-video"
            checked={isFree}
            onCheckedChange={setIsFree}
          />
          <Label htmlFor="free-video">Is this video FREE</Label>
        </div>

        {/* Progress Bar */}
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        {/* Update Button */}
        <div className="mt-4">
          <Button disbaled={isLoading} onClick={editLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Udpate Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
