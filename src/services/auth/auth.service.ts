"use server";
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/authUtils";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getUserInfo } from "./getUserInfo";
import { getCookie,} from "./tokenHandlers";
import { resetPasswordSchema } from "@/zod/auth.validation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateMyProfile(formData: FormData) {
    try {
        // Create a new FormData with the data property
        const uploadFormData = new FormData();

        // Get all form fields except the file
        const data: any = {};
        formData.forEach((value, key) => {
            if (key !== 'file' && value) {
                data[key] = value;
            }
        });

        // Add the data as JSON string
        uploadFormData.append('data', JSON.stringify(data));

        // Add the file if it exists
        const file = formData.get('file');
        if (file && file instanceof File && file.size > 0) {
            uploadFormData.append('file', file);
        }

        const response = await serverFetch.patch(`/user/update-my-profile`, {
            body: uploadFormData,
        });

        const result = await response.json();

        revalidateTag("user-info", { expire: 0 });
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// Reset Password
export async function resetPassword(_prevState: any, formData: FormData) {

    const redirectTo = formData.get('redirect') || null;

    // Build validation payload
    const validationPayload = {
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate
    const validatedPayload = zodValidator(validationPayload, resetPasswordSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    try {

        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("User not authenticated");
        }

        const verifiedToken = jwt.verify(accessToken as string, process.env.JWT_ACCESS_SECRET!) as jwt.JwtPayload;

        const userRole: UserRole = verifiedToken.role;

        const user = await getUserInfo();
        // API Call
        const response = await serverFetch.post("/auth/reset-password", {
            body: JSON.stringify({
                id: user?.id,
                password: validationPayload.newPassword,
            }),
            headers: {
                "Authorization": accessToken,
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Reset password failed");
        }

        if (result.success) {
            // await get
            revalidateTag("user-info", { expire: 0 });
        }

        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: validationPayload,
        };
    }
}

