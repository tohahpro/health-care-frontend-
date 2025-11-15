/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { serverFetch } from "@/lib/server-fetch"
import { zodValidator } from "@/lib/zodValidator"
import z from "zod"


const createSpeacialityZodSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long")
})

export async function createSpeaciality(_prevState: any, formData: FormData) {
    try {
        const payload = {
            title: formData.get("title") as string
        }

        // const validatePayload = createSpeacialityZodSchema.safeParse(payload)

        // if (!validatePayload.success) {
        //     return {
        //         success: false,
        //         errors: validatePayload.error.issues.map(issue => {
        //             return {
        //                 field: issue.path[0],
        //                 message: issue.message
        //             }
        //         })
        //     }
        // }

        if(zodValidator(payload, createSpeacialityZodSchema).success === false){
            return zodValidator(payload, createSpeacialityZodSchema)
        }

        const validatePayload = zodValidator(payload, createSpeacialityZodSchema).data;

        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(validatePayload))

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob)
        }

        const response = await serverFetch.post("/specialties", {
            body: newFormData,
        })

        const result = await response.json();
        return result;

    } catch (error: any) {
        console.log(error);
        return { 
            success: false, 
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}` 
        }
    }
}


export async function getSpeaciality() {
    try {
        const response = await serverFetch.get("/specialties")
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function deleteSpeaciality(id: string) { }