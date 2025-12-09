"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputFieldError from "@/components/shared/InputFieldError";
import { IListing } from "@/types/listing.interface";
import { createListing, updateListing } from "@/services/listings/listingManagement";
import { UserInfo } from "@/types/user.interface";
import Image from "next/image";

interface IListingFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    listing?: IListing;
    user?: UserInfo;
}

const categories = ["NATURE", "CULTURE", "ADVENTURE", "HISTORY", "FOOD"] as const;

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ListingFormDialog = ({ open, onClose, onSuccess, listing, user }: IListingFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isEdit = !!listing;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            toast.error("Invalid file type! Only JPG, PNG, WEBP allowed.");
            e.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            toast.error("File too large! Maximum size is 2MB.");
            e.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    const [state, formAction, pending] = useActionState(
        isEdit ? updateListing.bind(null, listing.id!) : createListing,
        null
    );

    const handleClose = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
        setSelectedFile(null);
        formRef.current?.reset();
        onClose();
    };

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || (isEdit ? "Listing updated" : "Listing created"));

            // Reset form and clear selected file in next tick
            setTimeout(() => {
                formRef.current?.reset();
                setSelectedFile(null);
                onSuccess();
                onClose();
            }, 0);
        } else if (state && !state.success) {
            toast.error(state.message);
        }
    }, [state, onSuccess, onClose, isEdit]);
    console.log(state)

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 dark:bg-gray-900 dark:text-gray-100">

                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
                    <DialogTitle className="dark:text-white">
                        {isEdit ? "Edit Listing" : "Create New Listing"}
                    </DialogTitle>
                </DialogHeader>

                {/* Scrollable Form */}
                <form ref={formRef} action={formAction} className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Title */}
                        <Field>
                            <FieldLabel htmlFor="title" className="dark:text-gray-200">Title</FieldLabel>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Sylhet Tea Garden Adventure Tour"
                                defaultValue={state?.formData?.title || listing?.title}
                                className="dark:bg-gray-800 dark:text-gray-100"
                            />
                            <InputFieldError state={state} field="title" />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description" className="dark:text-gray-200">Description</FieldLabel>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Experience the lush greenery..."
                                defaultValue={state?.formData?.description || listing?.description}
                                className="dark:bg-gray-800 dark:text-gray-100"
                            />
                            <InputFieldError state={state} field="description" />
                        </Field>

                        {/* Itinerary */}
                        <Field>
                            <FieldLabel htmlFor="itinerary" className="dark:text-gray-200">Itinerary</FieldLabel>
                            <Textarea
                                id="itinerary"
                                name="itinerary"
                                placeholder="Tea garden visit, Ratargul swamp forest..."
                                defaultValue={state?.formData?.itinerary || listing?.itinerary}
                                className="dark:bg-gray-800 dark:text-gray-100"
                            />
                            <InputFieldError state={state} field="itinerary" />
                        </Field>

                        {/* Price */}
                        <Field>
                            <FieldLabel htmlFor="price" className="dark:text-gray-200">Price</FieldLabel>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="650"
                                min="0"
                                defaultValue={state?.formData?.price || listing?.price}
                                className="dark:bg-gray-800 dark:text-gray-100"
                            />
                            <InputFieldError state={state} field="price" />
                        </Field>

                        {/* Duration */}
                        <Field>
                            <FieldLabel htmlFor="duration" className="dark:text-gray-200">Duration</FieldLabel>
                            <Input
                                id="duration"
                                name="duration"
                                placeholder="7 hours"
                                defaultValue={state?.formData?.duration || listing?.duration}
                                className="dark:bg-gray-800 dark:text-gray-100"
                            />
                            <InputFieldError state={state} field="duration" />
                        </Field>

                        {/* Category */}
                        <Field>
                            <FieldLabel htmlFor="category" className="dark:text-gray-200">Category</FieldLabel>
                            <Input type="hidden" name="category" value={state?.formData?.category || listing?.category || ""} />
                            <Select
                                value={state?.formData?.category || listing?.category || ""}
                                onValueChange={(value) => (formRef.current!.category.value = value)}
                            >
                                <SelectTrigger className="dark:bg-gray-800 dark:text-gray-100">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                                    {categories.map((c) => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputFieldError state={state} field="category" />
                        </Field>

                        {/* Meeting Point */}
                        <Field>
                            <FieldLabel htmlFor="meetingPoint" className="dark:text-gray-200">Meeting Point</FieldLabel>
                            <Input
                                id="meetingPoint"
                                name="meetingPoint"
                                placeholder="Sylhet City Center"
                                defaultValue={state?.formData?.meetingPoint || listing?.meetingPoint}
                                className="dark:bg-gray-800 dark:text-gray-100"
                            />
                            <InputFieldError state={state} field="meetingPoint" />
                        </Field>

                        {/* Max Group Size */}
                        <Field>
                            <FieldLabel htmlFor="maxGroupSize" className="dark:text-gray-200">Max Group Size</FieldLabel>
                            <Input
                                id="maxGroupSize"
                                name="maxGroupSize"
                                type="number"
                                placeholder="15"
                                min="1"
                                defaultValue={state?.formData?.maxGroupSize || listing?.maxGroupSize}
                                className="dark:bg-gray-800 dark:text-gray-100"
                            />
                            <InputFieldError state={state} field="maxGroupSize" />
                        </Field>

                        {/* City */}
                        <Field>
                            <FieldLabel htmlFor="city" className="dark:text-gray-200">City</FieldLabel>
                            <Input
                                id="city"
                                name="city"
                                placeholder="Sylhet"
                                defaultValue={state?.formData?.city || listing?.city}
                                className="dark:bg-gray-800 dark:text-gray-100"
                            />
                            <InputFieldError state={state} field="city" />
                        </Field>

                        {/* Guide ID */}
                        <Field>
                            <FieldLabel htmlFor="guideId" className="dark:text-gray-200">Guide ID</FieldLabel>
                            <Input
                                id="guideId"
                                name="guideId"
                                placeholder="043564ad-d164-4e88-94ee-54721a38b108"
                                readOnly
                                defaultValue={user?.id || listing?.guideId}
                                className="dark:bg-gray-800 dark:text-gray-100"
                            />
                            <InputFieldError state={state} field="guideId" />
                        </Field>

                        {/* Single Image Upload */}
                        {!isEdit && (
                            <Field>
                                <FieldLabel htmlFor="file" className="dark:text-gray-200">Image</FieldLabel>
                                <Input
                                    ref={fileInputRef}
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept={ALLOWED_TYPES.join(",")}
                                    onChange={handleFileChange}
                                />
                                {selectedFile && (
                                    <div className="w-32 h-48 relative mt-2">
                                        <Image src={URL.createObjectURL(selectedFile)} alt="Preview" fill className="object-cover rounded-md" />
                                    </div>
                                )}
                            </Field>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t shrink-0 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <Button type="button" variant="outline" onClick={handleClose} disabled={pending} className="dark:border-gray-600 cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending} className="dark:bg-blue-600 cursor-pointer dark:hover:bg-blue-700 dark:text-white">
                            {pending ? "Saving..." : isEdit ? "Update Listing" : "Create Listing"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ListingFormDialog;