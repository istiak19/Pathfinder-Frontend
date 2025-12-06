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

interface TripsCardProps {
    booking: Booking;
}

const TripsCard = ({ booking }: TripsCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmitReview = async () => {
        // Basic validation
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
            console.log("Review payload:", payload);

            // Call API
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
            console.error(err);
            toast.error(err?.response?.data?.message || err.message || "Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="border rounded-2xl shadow-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {booking.listing.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{booking.listing.itinerary}</p>

            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span>
                    Departure: {format(new Date(booking.date), "dd MMM yyyy • hh:mm a")}
                </span>
                <span className="font-medium">{booking.status}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>Guests: {booking.guests}</span>
                <span>Price: ${booking.payment?.amount || booking.listing.price}</span>
            </div>

            {booking.status === "COMPLETED" && (
                <div className="mt-2">
                    <Button size="sm" className="hover:scale-105 transition-transform cursor-pointer" onClick={() => setIsModalOpen(true)}>
                        Leave Review
                    </Button>
                </div>
            )}

            {/* ShadCN Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Leave Your Review</DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-400">
                            Please provide your rating (1-10) and a comment for this tour.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Rating (1-10)</label>
                            <input
                                type="number"
                                min={1}
                                max={10}
                                value={rating}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value >= 1 && value <= 10) setRating(value);
                                }}
                                className="w-full p-2 border rounded-lg text-black dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700"
                            />
                            <div className="text-sm mt-1 text-gray-700 dark:text-gray-300">{rating} / 10</div>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Comment</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-3 border rounded-lg shadow-sm text-black dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700"
                                rows={4}
                                placeholder="Write your experience..."
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-6 flex justify-end gap-3">
                        <Button variant="secondary"
                            className="cursor-pointer"
                            onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmitReview}
                            className="cursor-pointer"
                            disabled={submitting}>
                            {submitting ? "Submitting..." : "Submit"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TripsCard;