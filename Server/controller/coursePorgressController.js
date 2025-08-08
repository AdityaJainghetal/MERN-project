// import { CourseProgress } from "../models/courseProgressModel.js";
// import { Course } from "../models/courseModel.js";

// export const getCourseProgress = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;

//     let courseProgress = await CourseProgress.findOne({
//       courseId,
//       userId,
//     }).populate("courseId");
//     const courseDetails = await Course.findById(courseId).populate("lectures");

//     if (!courseDetails) {
//       return res.status(404).json({
//         message: "Course not found",
//       });
//     }

//     if (!courseProgress) {
//       return res.status(200).json({
//         data: {
//           courseDetails,
//           progress: [],
//           completed: false,
//         },
//       });
//     }
//     return res.status(200).json({
//       data: {
//         courseDetails,
//         progress: courseProgress.lectureProgress,
//         completed: courseProgress.completed,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateLectureProgress = async (req, res) => {
//   try {
//     const { courseId, lectureId } = req.params;
//     const userId = req.id;

//     let courseProgress = await CourseProgress.findOne({
//       courseId,
//       userId,
//     });
//     if (!courseProgress) {
//       courseProgress = new CourseProgress({
//         userId,
//         courseId,
//         completed: false,
//         lectureProgress: [],
//       });
//     }

//     const lectureIndex = courseProgress.lectureProgress.findIndex(
//       (lecture) => lecture.lectureId === lectureId
//     );

//     if (lectureIndex !== -1) {
//       courseProgress.lectureProgress[lectureIndex].viewed = true;
//     } else {
//       courseProgress.lectureProgress.push({
//         lectureId,
//         viewed: true,
//       });
//     }

//     const lectureProgressLength = courseProgress.lectureProgress.filter(
//       (lectureProgress) => lectureProgress.viewed
//     ).length;

//     const course = await Course.findById(courseId);

//     if (course.lectures.length === lectureProgressLength)
//       courseProgress.completed = true;
//     await courseProgress.save();

//     return res.status(200).json({
//       message: "Lecture progress update successfully",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const markAsCompleted = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;

//     const courseProgress = await CourseProgress.findOne({ courseId, userId });
//     if (!courseProgress)
//       return res.status(404).json({ message: "Course progress not found" });

//     courseProgress.lectureProgress.map(
//       (lectureProgress) => (lectureProgress.viewed = true)
//     );
//     courseProgress.completed = true;

//     await courseProgress.save();
//     return res.status(200).json({ message: "Course marked as completed" });
//   } catch (error) {}
// };

// export const markAsInCompleted = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;

//     const courseProgress = await CourseProgress.findOne({ courseId, userId }); // ✅ correct model
//     if (!courseProgress) {
//       return res.status(404).json({ message: "Course progress not found" });
//     }
//     courseProgress.lectureProgress.map(
//       (lectureProgress) => (lectureProgress.viewed = true)
//     );
//     courseProgress.completed = true;

//     await courseProgress.save();
//     return res.status(200).json({ message: "Course marked as completed" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };





import { CourseProgress } from "../models/courseProgressModel.js";
import { Course } from "../models/courseModel.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");
    const courseDetails = await Course.findById(courseId).populate("lectures");

    if (!courseDetails) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }
    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });
    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId.toString() === lectureId
    );

    if (lectureIndex !== -1) {
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }

    const lectureProgressLength = courseProgress.lectureProgress.filter(
      (lectureProgress) => lectureProgress.viewed
    ).length;

    const course = await Course.findById(courseId);

    if (course.lectures.length === lectureProgressLength) {
      courseProgress.completed = true;
    }
    await courseProgress.save();

    return res.status(200).json({
      message: "Lecture progress updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      return res.status(404).json({ message: "Course progress not found" });
    }

    courseProgress.lectureProgress = courseProgress.lectureProgress.map(
      (lectureProgress) => ({ ...lectureProgress, viewed: true })
    );
    courseProgress.completed = true;

    await courseProgress.save();
    return res.status(200).json({ message: "Course marked as completed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const markAsInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      return res.status(404).json({ message: "Course progress not found" });
    }

    courseProgress.lectureProgress = courseProgress.lectureProgress.map(
      (lectureProgress) => ({ ...lectureProgress, viewed: false })
    );
    courseProgress.completed = false;

    await courseProgress.save();
    return res.status(200).json({ message: "Course marked as incomplete" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};