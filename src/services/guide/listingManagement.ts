/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { createListingZodSchema, updateListingZodSchema, zodValidator } from "@/lib/zodValidator";
import { ICreateListingPayload, ListingCategory } from "@/types/listing.interface";

export enum ListingStatus {
    Active = "Active",
    Inactive = "Inactive",
}

export async function createListing(_prevState: any, formData: FormData) {
    // Validate payload first
    const validationPayload = {
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
        images: formData.get("files") as File,
    };

    const validatedPayload = zodValidator(validationPayload, createListingZodSchema);
    console.log("🔥 FINAL DATA SENT TO:", validatedPayload);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: validatedPayload.success,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    };

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    };

    const backendPayload = {
        title: validatedPayload.data.title,
        description: validatedPayload.data.description,
        itinerary: validatedPayload.data.itinerary,
        price: validatedPayload.data.price,
        duration: validatedPayload.data.duration,
        category: validatedPayload.data.category,
        meetingPoint: validatedPayload.data.meetingPoint,
        maxGroupSize: validatedPayload.data.maxGroupSize,
        city: validatedPayload.data.city,
        guideId: validatedPayload.data.guideId,

    };

    console.log("🔥 FINAL DATA SENT TO BACKEND:", backendPayload);

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(backendPayload));
    newFormData.append("files", formData.get("files") as Blob);


    try {
        const response = await serverFetch.post("/listings", { body: newFormData, });
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
            formData: validationPayload,
        };
    }
}

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
    if (files.length > 0) {
        validationPayload.images = files.map((file) => file.name);
    }

    // Validate
    const validatedPayload = zodValidator(validationPayload, updateListingZodSchema);
    if (!validatedPayload.success) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors || {},
        };
    }

    // Send as FormData to backend if files exist
    let response;
    if (files.length > 0) {
        const backendFormData = new FormData();
        backendFormData.append("data", JSON.stringify(validatedPayload.data));
        files.forEach((file) => backendFormData.append("images", file));
        response = await serverFetch.patch(`/listings/${id}`, { body: backendFormData });
    } else {
        response = await serverFetch.patch(`/listings/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validatedPayload.data),
        });
    }

    try {
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
            formData: validationPayload,
        };
    }
};

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

export async function getGuideBookings(queryString?: string) {
    try {
        const response = await serverFetch.get(`/bookings/guide/my${queryString ? `?${queryString}` : ""}`);
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

export const toggleStatus = async (listingId: string, currentStatus: ListingStatus) => {
    const newStatus = currentStatus === ListingStatus.Active ? ListingStatus.Inactive : ListingStatus.Active;

    try {
        const response = await serverFetch.patch(`/listings/status/${listingId}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Failed to update status");
        }

        return result;
    } catch (error: any) {
        console.error("Failed to update status:", error.message || error);
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

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