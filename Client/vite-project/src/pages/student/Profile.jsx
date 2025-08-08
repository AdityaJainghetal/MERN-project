// import React, { useEffect, useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import Course from "./Course";
// import { useLoadUserQuery,useUpdateUserMutation  } from "../../features/api/authapi";
// import { toast } from "sonner";

// const Profile = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [name,setName] = useState("");
//   const [profilePhoto,setProfilePhoto] = useState("");

//   const { data, isLoading: loadingUser } = useLoadUserQuery();
//   const [updateUser,{data:updateUserdata,isLoading:updateUserIsLoading,isError,error,isSucess}] = useUpdateUserMutation()
//   // Loading indicator
//   const onChangeHandler =()=>{
//     const file =error.target.files?.[0];
//     if(file) setProfilePhoto(file);

//   }
//   if (loadingUser || !data) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="animate-spin mr-2" />
//         <span>Loading profile...</span>
//       </div>
//     );
//   }

//   const { user } = data;

//   const updateUserHandler =async()=>{
//     const formData = new FormData();
//     formData.append("name",name);
//     formData.append("profilePhoto",profilePhoto)
//     await updateUser(formData)
//   }

//   useEffect(()=>{
//  if(isSucess){
//   toast.success(data.message || "Profile updated")
//  }
//  if(isError){
//   toast.error(error.message || "Failed to update profile")

//  }
//   },[error,data,isSucess,isError])
//   return (
//     <div className="max-w-4xl mx-auto px-4 my-24">
//       <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>

//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 mb-4">
//             <AvatarImage
//               src={user.photoUrl || "https://github.com/shadcn.png"}
//               alt={user.name}
//             />
//             <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
//           </Avatar>
//         </div>

//         <div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100">Name:</h1>
//             <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//               {user.name}
//             </span>
//           </div>

//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100">Email:</h1>
//             <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//               {user.email}
//             </span>
//           </div>

//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100">Role:</h1>
//             <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//               {user.role?.toUpperCase()}
//             </span>
//           </div>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-2">Edit Profile</Button>
//             </DialogTrigger>

//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you're done.
//                 </DialogDescription>
//               </DialogHeader>

//               <div className="grid gap-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="name">Name</Label>
//                   <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" className="col-span-3" />
//                 </div>

//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="photo">Profile photo</Label>
//                   <Input onChange={onChangeHandler} id="photo" type="file" accept="image/*" className="col-span-3" />
//                 </div>
//               </div>

//               <DialogFooter>
//                 <Button disabled={isLoading} onClick={updateUserHandler}
//                  >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Please wait
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       <div className="mt-10">
//         <h1 className="text-xl font-semibold mb-4">Courses you're enrolled in</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {/* {user.userCourses?.length === 0 ? (
//             <h2 className="text-gray-600">You haven't enrolled in any courses yet.</h2>
//           ) : (
//             user.userCourses.map((course) => (
//               <Course key={course._id} course={course} />
//             )) */}
//           {/* )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "../../features/api/authapi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  // ✅ Hooks must always be at the top level
  const { data, isLoading: loadingUser, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateResponse,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  // ✅ Pre-fill name when user data loads
  useEffect(() => {
    if (data?.user?.name) setName(data.user.name);
  }, [data]);

  // ✅ Toast notifications after mutation
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateResponse?.message || "Profile updated successfully!");
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  }, [isSuccess, isError, updateResponse, error]);

  useEffect(()=>{
    refetch();
  },[])

  // 📂 File input change handler
  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  // 🔄 Update handler
  const updateUserHandler = async () => {
    if (!name && !profilePhoto) {
      toast.error("Please provide a name or photo to update");
      return;
    }




    
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  // ✅ Conditional JSX (not hooks)
  if (loadingUser || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin mr-2" />
        <span>Loading profile...</span>
      </div>
    );
  }

  const { user } = data;

  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 mb-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt={user.name}
            />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        {/* User Info Section */}
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
            </h1>
            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
              {user.name}
            </span>
          </div>

          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
            </h1>
            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
              {user.email}
            </span>
          </div>

          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
            </h1>
            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
              {user.role?.toUpperCase()}
            </span>
          </div>

          {/* Edit Profile Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                {/* Name Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>

                {/* Profile Photo Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="photo">Profile photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Courses Section */}
      <div className="mt-10">
        <h1 className="text-xl font-semibold mb-4">
          Courses you're enrolled in
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {user.userCourses?.length === 0 ? (
            <h2 className="text-gray-600">
              You haven't enrolled in any courses yet.
            </h2>
          ) : (
            user.userCourses?.map((course) => (
              <Course key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
