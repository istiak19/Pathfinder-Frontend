/* eslint-disable @typescript-eslint/no-explicit-any */
import z, { ZodSchema } from "zod";

export const zodValidator = <T extends ZodSchema<any>>(payload: unknown, schema: T) => {
    const validatedPayload = schema.safeParse(payload);

    if (!validatedPayload.success) {
        return {
            success: false,
            errors: validatedPayload.error.issues.map((issue) => ({
                field: issue.path[0] ?? "unknown",
                message: issue.message,
            })),
        } as const;
    }

    return {
        success: true,
        data: validatedPayload.data,
    } as const;
};

export const registerValidationZodSchema = z
    .object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z.string().email({ message: "Valid email is required" }),
        languages: z
            .array(z.string())
            .min(1, { message: "At least one language is required" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
            .max(100, { message: "Password must be at most 100 characters long" }),
        confirmPassword: z
            .string()
            .min(6, { message: "Confirm Password must be at least 6 characters long" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });