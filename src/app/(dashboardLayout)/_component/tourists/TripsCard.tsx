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

            <div className="flex gap-3 mt-3">
                <Button
                    size="sm"
                    variant="outline"
                    className="cursor-pointer hover:scale-105 transition"
                    onClick={() => setIsDetailsOpen(true)}
                >
                    View Details
                </Button>

                {booking.status === "COMPLETED" && (
                    <Button
                        size="sm"
                        className="hover:scale-105 transition cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Leave Review
                    </Button>
                )}
            </div>

            {/* ⭐ Review Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 rounded-2xl p-6">
                    <DialogHeader>
                        <DialogTitle>Leave Your Review</DialogTitle>
                        <DialogDescription>
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
                                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                            />
                            <div className="text-sm mt-1">{rating} / 10</div>
                        </div>

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
                        <Button
                            variant="secondary"
                            onClick={() => setIsModalOpen(false)}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={submitting}
                            onClick={handleSubmitReview}
                            className="cursor-pointer"
                        >
                            {submitting ? "Submitting..." : "Submit"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Details Modal */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-900 rounded-2xl p-6">
                    <DialogHeader>
                        <DialogTitle>Booking Details</DialogTitle>
                        <DialogDescription>
                            Here are the full details of your booking.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 mt-4 text-sm">
                        <p><strong>Title:</strong> {booking.listing.title}</p>
                        <p><strong>Itinerary:</strong> {booking.listing.itinerary}</p>
                        <p><strong>Date:</strong> {format(new Date(booking.date), "dd MMM yyyy • hh:mm a")}</p>
                        <p><strong>Guests:</strong> {booking.guests}</p>
                        <p><strong>Status:</strong> {booking.status}</p>
                        <p><strong>Guide:</strong> {booking.listing.guide?.name || "Not Assigned"}</p>
                        <p><strong>Price:</strong> ${booking.payment?.amount || booking.listing.price}</p>
                        <p><strong>Payment Status:</strong> {booking.payment?.status || "N/A"}</p>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => setIsDetailsOpen(false)}
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