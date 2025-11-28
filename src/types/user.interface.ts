import { UserRole } from "@/lib/authUtils";
import { IDoctor } from "./doctor.interface";
import { IPatient } from "./patient.interface";
import { IAdmin } from "./admin.interface";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    needPasswordChange: boolean;
    status: "Active" | "Blocked" | "Deleted";
    admin?: IAdmin;
    patient?: IPatient;
    doctor?: IDoctor;
    createdAt: string;
    updatedAt: string;
}
