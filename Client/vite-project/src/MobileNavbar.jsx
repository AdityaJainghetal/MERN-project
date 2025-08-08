import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetFooter,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import DarkMode from "./DarkMode";

const MobileMenu = () => {
  const user = true; // Replace with actual authentication logic
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-300"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 flex flex-col justify-between">
        <div>
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">E-Learning</SheetTitle>
            <DarkMode />
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-4">
          

            {user ? (
              <>
                <Button variant="ghost" className="justify-start">
                  My Learning
                </Button>
                <Button variant="ghost" className="justify-start">
                  Edit Profile
                </Button>
                <Button variant="ghost" className="justify-start">
                  Logout
                </Button>
                {role === "instructor" && (
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Dashboard</Button>
                    </SheetClose>
                  </SheetFooter>
                )}
              </>
            ) : (
              <>
                <Button variant="ghost" className="justify-start">
                  Login
                </Button>
                <Button variant="ghost" className="justify-start">
                  Signup
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mb-4">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
