/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { createListingZodSchema, updateListingZodSchema, zodValidator } from "@/lib/zodValidator";
import { ICreateListingPayload, ListingCategory } from "@/types/listing.interface";

export async function createListing(_prevState: any, formData: FormData) {
    // Prepare payload from FormData
    const validationPayload: ICreateListingPayload = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        itinerary: formData.get("itinerary") as string,
        price: Number(formData.get("price")),
        duration: formData.get("duration") as string,
        category: formData.get("category") as ListingCategory,
        meetingPoint: formData.get("meetingPoint") as string,
        maxGroupSize: Number(formData.get("maxGroupSize")),
        city: formData.get("city") as string,
        guideId: formData.get("guideId") as string,
        images: [],
    };

    // Handle multiple images
    const files = formData.getAll("images") as File[];
    if (files.length > 0) {
        validationPayload.images = files.map((file) => file.name);
    }

    // Validate payload
    const validatedPayload = zodValidator(validationPayload, createListingZodSchema);

    if (!validatedPayload.success) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors || {},
        };
    }

    // Prepare FormData for backend
    const backendFormData = new FormData();
    backendFormData.append("data", JSON.stringify(validatedPayload.data));
    files.forEach((file) => backendFormData.append("images", file));

    try {
        const response = await serverFetch.post("/listings", { body: backendFormData });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
            formData: validationPayload,
        };
    }
}

export async function getListings(queryString?: string) {
    try {
        const response = await serverFetch.get(`/listings${queryString ? `?${queryString}` : ""}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
};

export async function getListingById(id: string) {
    try {
        const response = await serverFetch.get(`/listings/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
};

export async function updateListing(id: string, _prevState: any, formData: FormData) {
    const validationPayload: Partial<ICreateListingPayload> = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        itinerary: formData.get("itinerary") as string,
        price: Number(formData.get("price")),
        duration: formData.get("duration") as string,
        category: formData.get("category") as ListingCategory,
        meetingPoint: formData.get("meetingPoint") as string,
        maxGroupSize: Number(formData.get("maxGroupSize")),
        city: formData.get("city") as string,
        guideId: formData.get("guideId") as string,
    };

    // Handle images
    const files = formData.getAll("images") as File[];
    if (files.length > 0) validationPayload.images = files.map((file) => file.name);

    const validatedPayload = zodValidator(validationPayload, updateListingZodSchema);

    if (!validatedPayload.success) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors || {},
        };
    }

    try {
        const response = await serverFetch.patch(`/listings/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validatedPayload.data),
        });
        return await response.json();
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
            formData: validationPayload,
        };
    }
}


export async function deleteListing(id: string) {
    try {
        const response = await serverFetch.delete(`/listings/${id}`)
        const result = await response.json();

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
};