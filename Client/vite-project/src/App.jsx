import { Button } from "@/components/ui/button";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/Client/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import path from "path";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/Admin/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AddCourse from "./pages/Admin/course/AddCourse";
import Coursetable from "./pages/Admin/course/Coursetable";
import EditCourse from "./pages/Admin/course/EditCourse";
import CreateLecture from "./pages/Admin/lecture/CreateLecture";
import Editlecture from "./pages/Admin/lecture/Editlecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
     children:[
      {
        path:"/",
        element:(
        <>
        <HeroSection/>
        <Courses/>
        </>
)},
{
  path:"login",
  element:<Login/>
},
{
  path:"my-learning",
  element:<MyLearning/>
},
{
  path:"profile",
  element:<Profile/>
},

{
  path:"course/search",
  element:<SearchPage/>
},
{
  path:"course-detail/:courseId",
  element:<CourseDetail/>
},
{
  path:"course-progress/:courseId",
  element:<CourseProgress/>
},


{
  path: "admin",
  element: <Sidebar />,  // ✅ Layout instead of just Sidebar
  children: [
    {
      path: "dashboard",     // ✅ Fixed typo
      element: <Dashboard />
    },
    {
      path: "course",
      element: <Coursetable />
    },
    {
      path:"course/create",
      element:<AddCourse/>
    },


      {
      path:"course/:courseId",
      element:<EditCourse/>
    },

    

      {
      path:"course/:courseId/lecture",
      element:<CreateLecture/>
    },

       {
      path:"course/:courseId/lecture/:lectureId",
      element:<Editlecture/>
    },


  ]
}




     ],
  }
]);
function App() {
  return (
    <>
      <main>
       <RouterProvider router={appRouter}/>
      </main>
    </>
  );
}

export default App;
