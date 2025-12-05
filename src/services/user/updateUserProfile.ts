"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateMyProfile(formData: FormData) {
    try {
        const uploadFormData = new FormData();
        const data: any = {};

        // Properly collect strings + arrays from FormData
        formData.forEach((value, key) => {
            if (key === "file") return;

            // If first time field appears → set it
            if (data[key] === undefined) {
                data[key] = value;
            } else {
                // If key already exists → convert into array
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            }
        });

        // Ensure languages always an array
        if (data.languages && !Array.isArray(data.languages)) {
            data.languages = [data.languages];
        }
        if (data.travelPreferences && !Array.isArray(data.travelPreferences)) {
            data.travelPreferences = [data.travelPreferences];
        }

        // Add the data as JSON string
        uploadFormData.append("data", JSON.stringify(data));

        // Add file
        const file = formData.get("file");
        if (file && file instanceof File && file.size > 0) {
            uploadFormData.append("file", file);
        }

        const response = await serverFetch.patch(`/users/profile`, {
            body: uploadFormData,
        });

        const result = await response.json();
        revalidateTag("user-info", { expire: 0 });

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development"
                ? error.message
                : "Something went wrong",
        };
    }
}