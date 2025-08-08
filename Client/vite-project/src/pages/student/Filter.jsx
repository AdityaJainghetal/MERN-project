// import React from "react";

// const Filter = () => {
//   return (
//     <div className="w-full md:w-[20%]">
//       <div className="flex items-center justify-between">
//         <h1 className="font-semibold text-lg md:text-xl">Filter Opition</h1>
//         <Select>
//           <SelectTrigger>
//             <SelectValue placeholder="Sort by" />
//           </SelectTrigger>
//           <SelectContent>
//             <Selectgroup>
//               <SelectLabel>Sort by price</SelectLabel>
//               <SelectItem value="low">Low to High</SelectItem>
//               <SelectItem value="high">High to Low</SelectItem>
//             </Selectgroup>
//           </SelectContent>
//         </Select>
//       </div>
//       <Separator className="my-4" />
//       <div>
//         <h1 className="font-semibold md-2">CATEGORY</h1>
//       </div>
//       <div></div>
//     </div>
//   );
// };

// export default Filter;

import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const categories = [
  { id: "python", label: "Python" },
  { id: "mern stack developer", label: "MERN Stack Development" },
  { id: "fullstack development", label: "Fullstack Development" },

  { id: "javascript", label: "Javascript" },

  { id: "docker", label: "Docker" },

  { id: "mongodb", label: "MongoDb" },

  { id: "python", label: "Python" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValues) => {
    setSortByPrice(selectedValues);
    handleFilterChange(setSelectedCategories, selectedValues);
  };

  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      <div>
        <h1 className="font-semibold mb-2">CATEGORY</h1>

        {categories.map((category) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              onCheckedChange={() => handleCategoryChange(category.id)}
            />
            <Label htmlFor="data">{category.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
