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

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () =>{
        startTransition(()=>{
            router.refresh();
        })
    }

    const [dialogKey, setDialogKey] = useState(0);
    const handleOpenDialog = () =>{
        setDialogKey(prev => prev + 1);
        setIsDialogOpen(true);
    }
    
    const handleCloseDialog = () =>{
        setIsDialogOpen(false);
    }

    return (
        <div>
            <DoctorFormDialog
            key={dialogKey}
            open={isDialogOpen}
            onClose={handleCloseDialog}            
            onSuccess={handleSuccess}
            specialities={specialities}
            />

            <ManagementPageHeader
            title="Doctor Management"
            description="Manage Doctors information and details"
            action={{
                label: "Add Doctor",
                icon: Plus,
                onClick: handleOpenDialog
            }}
            />
        </div>
    );
};

export default DoctorsManagementHeader;