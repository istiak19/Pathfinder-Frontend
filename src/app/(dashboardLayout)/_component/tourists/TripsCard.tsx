/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Booking } from "@/types/booking.interface";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { createReview } from "@/services/review/reviews.services";
import Image from "next/image";

interface TripsCardProps {
    booking: Booking;
}

const statusStyles: Record<string, string> = {
    COMPLETED: "bg-green-100 text-green-700 border-green-300",
    CANCELLED: "bg-red-100 text-red-700 border-red-300",
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
    CONFIRMED: "bg-blue-100 text-blue-700 border-blue-300",
};

const TripsCard = ({ booking }: TripsCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmitReview = async () => {
        if (rating < 1 || rating > 10) {
            toast.error("Rating must be between 1 and 10");
            return;
        }
        if (!comment.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }

        setSubmitting(true);

        try {
            const payload = { bookingId: booking.id, rating, comment };
            const res = await createReview(payload);

            if (res.success) {
                toast.success("Review submitted successfully!");
                setIsModalOpen(false);
                setRating(5);
                setComment("");
            } else {
                toast.error(res.message || "Failed to submit review");
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="
        rounded-2xl overflow-hidden 
        shadow-md hover:shadow-xl 
        transition-all duration-300
        border border-gray-200 dark:border-gray-700 
        bg-white dark:bg-gray-800
      "
        >
            {/* Banner Image */}
            <div className="relative w-full h-44">
                <Image
                    src={booking.listing?.images[0] || "/icons/Nature.jpg"}
                    alt="tour banner"
                    fill
                    className="object-cover"
                />

                {/* Status Badge */}
                <div
                    className={`
            absolute top-3 left-3 px-3 py-1 text-xs font-medium 
            rounded-full border shadow-sm backdrop-blur-md
            ${statusStyles[booking.status] || "bg-gray-200"}
          `}
                >
                    {booking.status}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {booking.listing.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {booking.listing.itinerary}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <p>
                        <strong>Date:</strong> <br />
                        {format(new Date(booking.date), "dd MMM yyyy • hh:mm a")}
                    </p>

                    <p>
                        <strong>Guests:</strong> <br />
                        {booking.guests}
                    </p>

                    <p>
                        <strong>Price:</strong> <br />${booking.payment?.amount || booking.listing.price}
                    </p>

                    <p>
                        <strong>Guide:</strong> <br />
                        {booking.listing.guide?.name || "Not Assigned"}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer hover:scale-105 transition rounded-lg"
                        onClick={() => setIsDetailsOpen(true)}
                    >
                        View Details
                    </Button>

                    {booking.status === "COMPLETED" && (
                        <Button
                            size="sm"
                            className="cursor-pointer hover:scale-105 transition rounded-lg"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Leave Review
                        </Button>
                    )}
                </div>
            </div>

            {/* ⭐ Review Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 rounded-2xl p-6">
                    <DialogHeader>
                        <DialogTitle>Leave Your Review</DialogTitle>
                        <DialogDescription>
                            Please provide your rating (1–10) and comment.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        {/* Rating */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Rating (1–10)</label>
                            <input
                                type="number"
                                min={1}
                                max={10}
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                            />
                            <div className="text-sm mt-1">{rating} / 10</div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Comment</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                                rows={4}
                                placeholder="Write your experience..."
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button disabled={submitting} onClick={handleSubmitReview}>
                            {submitting ? "Submitting..." : "Submit"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Booking Details Modal */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="sm:max-w-lg bg-white/95 dark:bg-gray-900/95 rounded-2xl p-6 shadow-lg backdrop-blur-md space-y-5">

                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                            📋 Booking Details
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-300 text-sm">
                            Review the full details of your trip below.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Booking Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                        <div>
                            <p className="font-medium">Title</p>
                            <p>{booking.listing.title}</p>
                        </div>

                        <div>
                            <p className="font-medium">Itinerary</p>
                            <p>{booking.listing.itinerary}</p>
                        </div>

                        <div>
                            <p className="font-medium">Date</p>
                            <p>{format(new Date(booking.date), "dd MMM yyyy • hh:mm a")}</p>
                        </div>

                        <div>
                            <p className="font-medium">Guests</p>
                            <p>{booking.guests}</p>
                        </div>

                        <div>
                            <p className="font-medium">Status</p>
                            <p className={`inline-block px-2 py-1 rounded-full text-xs font-medium 
            ${statusStyles[booking.status] || "bg-gray-200 text-gray-700 border-gray-300"}`}>
                                {booking.status}
                            </p>
                        </div>

                        <div>
                            <p className="font-medium">Guide</p>
                            <p>{booking.listing.guide?.name || "Not Assigned"}</p>
                        </div>

                        <div>
                            <p className="font-medium">Price</p>
                            <p>${booking.payment?.amount || booking.listing.price}</p>
                        </div>

                        <div>
                            <p className="font-medium">Payment Status</p>
                            <p>{booking.payment?.status || "N/A"}</p>
                        </div>

                        <div className="sm:col-span-2">
                            <p className="font-medium">Meeting Point</p>
                            <p>{booking.listing.meetingPoint}</p>
                        </div>
                    </div>

                    {/* Close Button */}
                    <DialogFooter className="mt-4 flex justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setIsDetailsOpen(false)}
                            className="rounded-lg px-4 cursor-pointer"
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TripsCard;