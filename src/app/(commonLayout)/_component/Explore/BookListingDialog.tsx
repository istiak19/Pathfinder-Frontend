"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

interface BookListingDialogProps {
    listingId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function BookListingDialog({
    listingId,
    isOpen,
    onClose,
}: BookListingDialogProps) {
    const router = useRouter();

    const [date, setDate] = useState<Date | null>(null);
    const [guests, setGuests] = useState<number>(1);

    const handleContinue = () => {
        if (!date || guests < 1) return;

        const dateISO = date.toISOString();
        router.push(
            `/booking?listingId=${listingId}&date=${dateISO}&guests=${guests}`
        );
    };

    const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        if (isNaN(value) || value < 1) value = 1;
        setGuests(Math.floor(value));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Book This Tour</DialogTitle>
                    <DialogDescription>
                        Choose your date and number of guests
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Date Picker */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Pick a Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : "Select date"}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="p-0">
                                <Calendar
                                    mode="single"
                                    selected={date ?? undefined}
                                    onSelect={(d) => d && setDate(d)}
                                    disabled={(d) => d < new Date()}
                                    className="rounded-md border"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Guests Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Guests</label>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <Input
                                type="number"
                                min={1}
                                step={1}
                                value={guests}
                                onChange={handleGuestsChange}
                                className="w-24"
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline"
                        className="cursor-pointer"
                        onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleContinue}
                        className="cursor-pointer"
                        disabled={!date || guests < 1}>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}