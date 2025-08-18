// import { AlertCircle, Filter } from "lucide-react";
// import React from "react";
// import SearchResult from "./SearchResult";

// const SearchPage = ({ couseId }) => {
//   const isLoading = false;
//   const isEmpty = false;
//   return (
//     <div className="max-w-7wl mx-auto p-4 md:p-8">
//       <div className="my-6">
//         <h1>result for "html"</h1>
//         <p>
//           Showing result for{" "}
//           <span className="text-blue-800 font-bold italic">
//             Frontend developer
//           </span>
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-10">
//         <Filter />
//         <div className="flex-1">
//           {isLoading ? (
//             Array.from({ length: 3 }).map((_, idx) => {
//               <CourseSkelton key={idx} />;
//             })
//           ) : isEmpty ? (
//             <CourseNotFound />
//           ) : (
//             [1, 2, 3].map(_, (idx) => <SearchResult key={idx} />)
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

// const CourseCardSkelton = () => {
//   return (
//     <div className="flex-1 flex-col md:flex-row justify-between">
//       <div className="h-32 w-full md:w-64">
//         <Skeleton className="h-full w-full object-cover" />
//       </div>

//       <div className="flex flex-col gap-2 flex-1 px-4">
//         <Skeleton className="flex flex-col gap-2 flex-1 px-4" />
//         <Skeleton className="h-6 w-3/4" />
//         <div className="h-4 w-1/2">
//           <Skeleton className="h-4 w-1/3" />
//         </div>

//         <div className="flex flex-col items-end justify-between mt-4">
//           <Skeleton className="h-4 w-12" />


//         </div>
//       </div>
//     </div>
//   );
// };

// const CourseNotFound = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h">
//         <AlertCircle className="text-res-500 h-16 mb-4"/>
//         <h1 className="font-bold text-2xl md:text-4xl text-gray-800">
//             Course Not Found
//         </h1>

//         <p className="text-lg text-gray-600 dark:text-gray-400">
//             Sorry, we couldn't find the course you're looking for.
//         </p>

//         <Link to="/" className="italic">
//         <Button variant="link">Browser All Course</Button>
//         </Link>

//     </div>
//   )
// };



import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Filter from "./Filter"
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/button";
import SearchResult from "./SearchResult";
import { useGetSearchCourseQuery } from "../../features/api/courseApi";

const SearchPage = ({ courseId }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories,setSelectedCategories] = useState([])
  const [sortByPrice,setSortByPrice] = useState("")
  const {data,isLoading} = useGetSearchCourseQuery({
      searchQuery:query,
      categories:selectedCategories,
      sortByPrice,
  })

  const isEmpty = !isLoading && data?.courses.length === 0;

    // const {data,isLoading} = useGetSearchCourseQuery()
//   const isLoading = false;
 

  const handleFilterChange = (categories,price)=>{
    setSelectedCategories(categories);
    setSortByPrice(price)
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 mt-5">
      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl">Results for "{query}"</h1>
        <p>
          Showing results for{""}
          <span className="text-blue-800 font-bold italic">
            {query}
          </span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-64">
          <Filter handleFilterChange={handleFilterChange}/>
        </div>
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseCardSkelton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course) => <SearchResult key={course._id} course={course}/>)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseCardSkelton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 border p-4 rounded-md shadow">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full object-cover rounded-md" />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />

        <div className="flex justify-end mt-4">
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
};

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="mt-4">
        <Button variant="link">Browse All Courses</Button>
      </Link>
    </div>
  );
};
