/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { loginUser } from "./loginUser";
import { registerValidationZodSchema, zodValidator } from "@/lib/zodValidator";

export const registerUser = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            languages: formData.getAll("languages"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };

        const validated = zodValidator(payload, registerValidationZodSchema);

        if (!validated.success) return validated;

        // ✅ Now TS knows validated.data exists
        const validatedData = {
            name: validated.data.name,
            email: validated.data.email,
            languages: validated.data.languages,
            password: validated.data.password,
        };

        const res = await serverFetch.post(`/users/register`, {
            body: JSON.stringify(validatedData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                errors: [
                    {
                        field: "general",
                        message: data.message || "Registration failed",
                    },
                ],
            };
        }

        if (data.success) {
            await loginUser(_currentState, formData);
        }

        return data;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Registration Failed. Please try again.",
        };
    }
};