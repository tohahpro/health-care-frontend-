"use client"

import { ISpecialty } from "@/types/specialities.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import DoctorFormDialog from "./DoctorFormDialog";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";


interface DoctorsManagementHeaderProps {
    specialities?: ISpecialty[];
}

const DoctorsManagementHeader = ({
    specialities,
}: DoctorsManagementHeaderProps) => {

    const router = useRouter();

    const [, startTransition] = useTransition();

    const [isDialogOpen, serIsDialogOpen] = useState(false);

    const handleSuccess = () =>{
        startTransition(()=>{
            router.refresh();
        })
    }


    return (
        <div>
            <DoctorFormDialog 
            open={isDialogOpen}
            onClose={()=> serIsDialogOpen(false)}
            onSuccess={handleSuccess}
            specialities={specialities}
            />

            <ManagementPageHeader
            title="Doctor Management"
            description="Manage Doctors information and details"
            action={{
                label: "Add Doctor",
                icon: Plus,
                onClick: ()=> serIsDialogOpen(true)
            }}
            />
        </div>
    );
};

export default DoctorsManagementHeader;