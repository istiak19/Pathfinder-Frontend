export interface ListingsResponse {
    success: boolean;
    message: string;
    data: IListing[];
}

export interface IListing {
    id: string;
    title: string;
    description: string;
    itinerary: string;
    price: number;
    duration: string;
    meetingPoint: string;
    maxGroupSize: number;
    category: string;
    averageRating: number;
    city: string;
    images: string[];
    status: string;
    guideId: string;
    createdAt: string;
    updatedAt: string;
    guide: Guide;
    bookings: Booking[];
    reviews: Review[];
}

export interface Guide {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    profilePic: string | null;
    bio: string | null;
    isVerified: boolean;
    status: string;
    languages: string[];
    expertise: string[];
    dailyRate: number | null;
    travelPreferences: string[];
    authProvider: string | null;
    providerId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Booking {
    id: string;
    date: string;
    status: string;
    guests: number;
    listingId: string;
    touristId: string;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    id: string;
    rating: number;
    comment?: string;
}

export enum ListingCategory {
    FOOD = "FOOD",
    ART = "ART",
    ADVENTURE = "ADVENTURE",
    NATURE = "NATURE",
    CULTURE = "CULTURE",
    SHOPPING = "SHOPPING",
    SPORTS = "SPORTS",
    WELLNESS = "WELLNESS",
    HISTORY = "HISTORY",
    ENTERTAINMENT = "ENTERTAINMENT",
}

export interface ICreateListingPayload {
    title: string;
    description: string;
    itinerary?: string;
    price: number;
    duration: string;
    category: ListingCategory;
    meetingPoint: string;
    maxGroupSize: number;
    city: string;
    images?: File | string[]; // Optional array of image URLs or filenames
    guideId: string;
    status?: string; // Optional: e.g., "PUBLISHED" | "DRAFT"
}