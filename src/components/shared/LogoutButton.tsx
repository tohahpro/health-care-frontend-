"use client"

import { logoutUser } from "@/services/auth/logout";
import { Button } from "../ui/button";

const LogoutButton = () => {
    
    const handleLogout = async()=>{
        await logoutUser();
    }

    return (
        <div>
            <Button className="cursor-pointer" variant={"outline"} onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default LogoutButton;