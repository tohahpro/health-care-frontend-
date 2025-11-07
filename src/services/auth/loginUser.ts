/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import z from 'zod'
import { parse } from 'cookie'
import { cookies } from 'next/headers'

const loginValidationZodSchema =
    z.object({
        email: z.email({
            error: "Email is required"
        }),
        password: z.string("Password is required").min(6, {
            error: "Password is required and must be at least 6 character long"
        }).max(100, {
            error: "Password must be at least 100 character long"
        })
    })


export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        // step-1
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        const validatedFields = loginValidationZodSchema.safeParse(loginData)

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message
                    }
                })
            }
        }

        const res = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json",
            }
        })

        // step-2
        const result = await res.json()

        // step-3
        const setCookieHeaders = res.headers.getSetCookie();

        // step-4
        if (setCookieHeaders && setCookieHeaders.length > 0) {
            // step-4.1
            setCookieHeaders.forEach((cookie: string) => {

                // step-4.2 ## use parse in cookie npm package
                const parsedCookie = parse(cookie);

                // step-4.3 condition check and set cookie
                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie['accessToken']
                }
                else if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie['refreshToken']
                }
            })

        } else {
            throw new Error("No Set-Cookie header found")
        }
        // step-5
        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies")
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies")
        }

        // step-6 cookies store help by next/headers
        const cookieStore = await cookies()

        // step-6.1 Token set in cookies
        cookieStore.set("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject.MaxAge),
            path: accessTokenObject.Path || "/",
        })

        // step-6.2 Token set in cookies
        cookieStore.set("refreshToken", refreshTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject.MaxAge),
            path: refreshTokenObject.Path || "/",
        })

        return result;

    } catch (error) {
        console.log(error);
        return { error: "Login failed" }
    }
}