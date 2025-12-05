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

import { ListingCategory } from "@/types/listing.interface";

export const createListingZodSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    itinerary: z.string().optional(),
    price: z.number().int().min(0, "Price must be at least 0"),
    duration: z.string().min(1, "Duration is required"),
    meetingPoint: z.string().min(1, "Meeting point is required"),
    maxGroupSize: z.number().int().min(1, "Max group size must be at least 1"),
    category: z.nativeEnum(ListingCategory),
    city: z.string().min(1, "City is required"),
    images: z.array(z.string()).optional(),
    guideId: z.string().uuid("Guide ID must be a valid UUID"),
    status: z.string().optional(), // default "active"
});

// For update, everything can be partial
export const updateListingZodSchema = createListingZodSchema.partial();