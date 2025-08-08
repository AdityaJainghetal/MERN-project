import { Course } from "../models/courseModel.js";
import { Lecture } from "../models/lectureModel.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../ulils/cloudinary.js";
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;

    if (!courseTitle || !category) {
      return res
        .status(400)
        .json({ message: "Course title and category are required" });
    }

    // ✅ Don’t force creator if req.id is not set yet
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      course,
      message: "Course created",
    });
  } catch (error) {
    console.error("❌ Create course error:", error);
    return res.status(500).json({
      message: "Failed to create course",
      error: error.message, // ✅ show why it failed in response
    });
  }
};

export const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;
    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };
    if(categories.length > 0){
      searchCriteria.category = {$in:categories}
    }

    const sortOpitions = {}
      if(sortByPrice === "low"){
        sortOpitions.coursePrice = 1;

      }else if(sortByPrice === "high"){
          sortOpitions.coursePrice = -1;
      }

      let courses = await Course.find(searchCriteria).populate({path:"creator", select:"name photoUrl"}).sort(sortOpitions);
       return res.status(200).json({
        success:true,
        courses:courses || []
       })
    
  } catch (error) {
    console.log(error)
  }
};

export const getcreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        course: [],
        message: "Course not found",
      });
    }
    console.log(courses, "courses");
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

// export const editCourse = async(req,res)=>{
//   try {
//     // const courseId = req.params.courseId
//     const courseId = req.params.courseId
//     console.log(courseId,"courseId")
//     const {courseTitle,subTitle, description,category,courseLevel,coursePrice} =  req.body;
//     const thumbnail = req.file;

//     let course = await Course.findById(courseId)
//     if(!course){
//       return res.status(404).json({
//         message:"Course not found"
//       })
//     }
//     let courseThumnail;
//     if(thumbnail){
//       if(course.courseThumnail){
//         const publicId = course.courseThumnail.split("/").pop().split(".")[0]
//         await deleteMediaFromCloudinary(publicId);
//       }
//       courseThumnail = await uploadMedia(thumbnail.path)
//     }

//     const updateData = {courseTitle,subTitle, description,category,courseLevel,coursePrice,courseThumnail:courseThumnail?.secure_url}
//     course = await Course.findByIdAndUpdate(course,updateData, {new:true});
//     return res.status(200).json({
//       course,
//       message:"Course update successfully"
//     })
//   } catch (error) {
//     console.log(error);
//         return res.status(500).json({
//             message:"Failed to create course"
//         })
//   }
//   }

// export const editCourse = async (req, res) => {
//   try {
//     const courseId = req.params.courseId || req.body.courseId; // ✅ handles both params & body
//     console.log(courseId, "courseId");

//     const {
//       courseTitle,
//       subTitle,
//       description,
//       category,
//       courseLevel,
//       coursePrice,

//     } = req.body;
//     const thumbnail = req.file;

//     // ✅ Check if course exists
//     let course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     // ✅ Handle thumbnail update
//     let courseThumnail;
//     // if (thumbnail) {
//     //   if (course.courseThumnail) {
//     //     const publicId = course.courseThumnail.split("/").pop().split(".")[0];
//     //     await deleteMediaFromCloudinary(publicId);
//     //   }
//     //   courseThumnail = await uploadMedia(thumbnail.path);
//     // }

//     if (thumbnail) {
//   if (course.courseThumnail) {
//     const publicId = course.courseThumnail.split("/").pop().split(".")[0];
//     await deleteMediaFromCloudinary(publicId);
//   }
//   const uploadedImage = await uploadMedia(thumbnail.path);
//   updateData.courseThumnail = uploadedImage.secure_url;
// }

//     // ✅ Prepare update data
//     const updateData = {
//       courseTitle,
//       subTitle,
//       description,
//       category,
//       courseLevel,
//       coursePrice,
//       courseThumnail: courseThumnail?.secure_url || course.courseThumnail,
//     };

//     // ✅ Correct findByIdAndUpdate usage
//     course = await Course.findByIdAndUpdate(courseId, updateData, {
//       new: true,
//     });

//     return res.status(200).json({
//       course,
//       message: "Course updated successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Failed to update course" });
//   }
// };

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId || req.body.courseId;
    console.log(courseId, "courseId");

    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file; // ✅ comes from multer

    // ✅ Check if course exists
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Prepare update data
    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: course.courseThumbnail, // default existing
    };

    // ✅ Handle new thumbnail upload
    if (thumbnail) {
      // ✅ Delete old image from Cloudinary (if exists)
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      // ✅ Upload new thumbnail
      const uploadedImage = await uploadMedia(thumbnail.path);
      updateData.courseThumbnail = uploadedImage.secure_url;
    }

    // ✅ Update course
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update course" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get course by id" });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400)({
        message: "Lecture title is required",
      });
    }

    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      lecture,
      messsage: "lecture created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create lecture" });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      lecture: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create lecture" });
  }
};

// export const editLecture = async (req, res) => {
//   try {
//     const { lectureTitle, videoInfo, isPreviewFree } = req.body;
//     const [courseId, lectureId] = req.params;
//     const lecture = await Lecture.findById(lectureId);
//     if (!lecture) {
//       return (
//         res.status(404),
//         json({
//           message: "Lecture not found",
//         })
//       );
//     }
//     if (lectureTitle) lecture.lectureTitle = lectureTitle;
//     if (videoInfo.videoUrl) (lecture.videoUrl = videoInfo), videoUrl;
//     if (videoInfo.publicId) lecture.publicId = videoInfo.publicId;
//     if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;

//     await lecture.save();

//     const course = await Course.findById(courseId);
//     if (course && course.lectures.includes(lecture._id)) {
//       course.lectures.push(lecture._id);
//       await lecture.save();
//     }

//     return res.status(200).json({
//       message: "Lecture update successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Failed to get lectures",
//     });
//   }
// };

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params; // ✅ FIXED destructuring

    const lecture = await Lecture.findById(lectureId);
    console.log(lecture);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    // ✅ Update fields if provided
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // ✅ Update course if needed
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save(); // ✅ FIXED saving the course instead of lecture again
    }

    return res.status(200).json({
      message: "Lecture updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update lecture",
      error: error.message,
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    await Course.updateOne(
      { lecture: lectureId },
      { $pull: { lecture: lectureId } }
    );

    return res.status(200).json({
      message: "Lecture removed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lectures",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};

export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";

    return res.status({
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update status",
    });
  }
};

export const getPublishedCourse = async (_, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });
    if (!courses) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get published couses",
    });
  }
};
