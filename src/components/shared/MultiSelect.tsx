"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface MultiSelectProps {
    label: string;
    name: string;
    options: string[];
    defaultValue?: string[];
    disabled?: boolean;
    placeholder?: string;
}

export function MultiSelect({
    label,
    name,
    options,
    defaultValue = [],
    disabled = false,
    placeholder = "Select options",
}: MultiSelectProps) {
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        setSelected(defaultValue);
    }, [defaultValue]);

    const toggleOption = (value: string) => {
        setSelected((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    return (
        <div className="space-y-2 md:col-span-2 w-full">
            <Label htmlFor={name}>{label}</Label>

            {/* Hidden inputs for FormData submission */}
            {selected.map((v) => (
                <input key={v} type="hidden" name={name} value={v} />
            ))}

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-between"
                        disabled={disabled}
                    >
                        {selected.length > 0 ? selected.join(", ") : placeholder}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem key={option} onSelect={() => toggleOption(option)}>
                                    <Check
                                        className={`mr-2 h-4 w-4 ${selected.includes(option) ? "opacity-100" : "opacity-0"
                                            }`}
                                    />
                                    {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}