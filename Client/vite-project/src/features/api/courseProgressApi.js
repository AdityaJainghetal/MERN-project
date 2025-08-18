// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const COURSE_PURCHASE_API = "https://mern-project-2-kjz3.onrender.com/api/v1/progress";

// export const courseProgressApi = createApi({
//   reducerPath: "courseProgressApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: COURSE_PURCHASE_API,
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     getCourseProgress: builder.query({
//       query: (courseId) => ({
//         url: `/${courseId}`,
//         method: "GET",
//       }),
//     }),
//     updateLectureProgress: builder.mutation({
//       query: ({ courseId, lectureId }) => ({
//         url: `/${courseId}/lecture/${lectureId}/view`,
//         method: "POST",
//       }),
//     }),

//     completedCourse: builder.mutation({
//       // query: (courseId) => ({
//       //   url: `/${courseId}/complete`,
//       //   method: "POST",
//            query: ( courseId ) => ({
//     url: `/${courseId}/complete`,
//     method: "POST",
//       }),

//     }),
//     inCompleteCourse: builder.mutation({
//       query: (courseId) => ({
//         url: `/${courseId}/incomplete`,
//         method: "POST",
//       }),
//     }),
//   }),
// });

// export const {
//   useGetCourseProgressQuery,
//   useUpdateLectureProgressMutation,
//   useCompletedCourseMutation,
//   useInCompleteCourseMutation,
// } = courseProgressApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROGRESS_API =
  "https://mern-project-2-kjz3.onrender.com/api/v1/progress";

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}/view`,
        method: "POST",
      }),
    }),
    completedCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/complete`,
        method: "POST",
      }),
    }),
    inCompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useCompletedCourseMutation,
  useInCompleteCourseMutation,
} = courseProgressApi;
