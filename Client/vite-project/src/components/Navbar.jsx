// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; // ✅ Corrected import
// import { School } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuGroup,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import DarkMode from "../DarkMode";
// import MobileNavbar from "../MobileNavbar";
// import { toast } from "sonner";
// import { useLogoutUserMutation } from "../features/api/authapi";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const user = true;
//   // const {user} = useSelector(store=>store.auth)
//   const auth = useSelector((store) => store.auth);
// // const user = auth?.user;

//   const [logoutUser,{data,isSuccess}] = useLogoutUserMutation()
//  const navigate = useNavigate()
//  const logoutHandler =async()=>{
//     await logoutUser();
//  }



//   useEffect(()=>{
//     if(isSuccess){

//       toast.success(data.message || " User Logout")
//       navigate("/login")
//     }
//   },[isSuccess])
//   return (
//     <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10 flex items-center">
//       {/* Desktop Navbar */}
//       <div className="max-w-7xl w-full mx-auto hidden md:flex justify-between items-center px-6">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-3">
//           <School size={32} className="text-blue-600" />
    
//           <h1 className="font-extrabold text-2xl text-gray-800 dark:text-white">
//             E-Learning
//           </h1>
//         </Link>

//         {/* Right Side */}
//         <div className="flex items-center gap-6">
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage
//                     src={user.photoUrl || "https://github.com/shadcn.png"}
//                     alt="@user"
//                   />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link to="/my-learning">My Learning</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
//                 <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
                
//                 <DropdownMenuGroup>
//               {
//                 user.role === "instructor" && (
//                   <>
//                    <DropdownMenuItem asChild>
//                   <Link to="/dashboard">Dashboard</Link>
//                 </DropdownMenuItem>
                  
//                   </>
//                 )
//               }


//                 </DropdownMenuGroup>
                
//                 <DropdownMenuSeparator />
                
                
               
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Button variant="outline" onClick={()=>navigate("/login")}>Login</Button>
//               <Button  onClick={()=>navigate("/login")}>Signup</Button>
//             </div>
//           )}
//           <DarkMode />
//         </div>
//       </div>

//       {/* Mobile Navbar */}
//       <div className="w-full flex md:hidden justify-between items-center px-4">
//         <div className="flex items-center gap-2">
//           <School size={28} className="text-blue-600" />
//           <h1 className="font-extrabold text-xl text-gray-800 dark:text-white">
//             E-Learning
//           </h1>
//         </div>
//         <MobileNavbar />
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { School } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "../DarkMode";
import MobileNavbar from "../MobileNavbar";
import { toast } from "sonner";
import { useLogoutUserMutation } from "../features/api/authapi";
import { useSelector } from "react-redux";

const Navbar = () => {
  // Simulated user for demo; replace with Redux if needed
  const auth = useSelector((store) => store.auth);
  const user = auth?.user || { role: "instructor", photoUrl: "" }; // fallback for testing

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User Logout");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-gray-800 border-gray-200 fixed top-0 left-0 right-0 z-50 flex items-center">
      {/* Desktop Navbar */}
      <div className="max-w-7xl w-full mx-auto hidden md:flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <School size={32} className="text-blue-600" />
          <h1 className="font-extrabold text-2xl text-gray-800 dark:text-white">
            E-Learning
          </h1>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div tabIndex={0}>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user.photoUrl || "https://github.com/shadcn.png"}
                      alt="@user"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/my-learning">My Learning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
                <DropdownMenuGroup>
                  {user.role === "instructor" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="w-full flex md:hidden justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <School size={28} className="text-blue-600" />
          <h1 className="font-extrabold text-xl text-gray-800 dark:text-white">
            E-Learning
          </h1>
        </div>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;
