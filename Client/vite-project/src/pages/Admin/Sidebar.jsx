// import { ChartNoAxesColumn, Link, SquareLibrary } from 'lucide-react'
// import React from 'react'

// const Sidebar = () => {
//   return (
//     <div className='hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-300 dark:border-gray-700 bg:[#f0f0f0] p-5 sticky top-0 h-screen'>
//       <div className='mt-20'>
//         <Link to="/admin/dashboard">

//         <ChartNoAxesColumn size={22}/>
//         <h1>Dashboard</h1>
//         </Link>

//         <Link to="/admin/course">
//         <SquareLibrary size={22}/>
//         <h1>Courses</h1>
//         </Link>

//       </div>
//     </div>
//   )
// }

// export default Sidebar

import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="  hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 sticky top-0 h-screen">
        <div className=" space-y-6 mt-20">
          {/* Dashboard Link */}
          <Link
            to="dashboard"
            className="flex items-center gap-3 text-gray-800 hover:text-blue-600 transition font-medium"
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>

          {/* Courses Link */}
          <Link
            to="/admin/course"
            className="flex items-center gap-3 text-gray-800 hover:text-blue-600 transition font-medium"
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 md:p-20 p-2 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
