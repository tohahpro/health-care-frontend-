/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";


// Get Doctor Schedules
export async function getDoctorOwnSchedules(queryString?: string) {
    try {
        const response = await serverFetch.get(`/doctor-schedule/my-schedule${queryString ? `?${queryString}` : ''}`);
        const result = await response.json();
        return {
            success: result.success,
            data:  result.data,     
            meta: result.meta,
        };

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// Get Available Schedules
export async function getAvailableSchedules() {
    try {
        const response = await serverFetch.get(`/schedule`);
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

// Create Doctor Own Schedules
export async function createDoctorSchedules(scheduleIds: string[]) {
    try {
        const response = await serverFetch.post(`/doctor-schedule`,{
            body: JSON.stringify({scheduleIds}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
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

// Delete Doctor Own Schedule
export async function deleteDoctorOwnSchedules(scheduleId: string) {
    try {
        const response = await serverFetch.post(`/doctor-schedule/${scheduleId}`);
        const result = await response.json();
        return {
            success: result.success,
            message: result.message || 'Schedule removed successfully'
        };

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}