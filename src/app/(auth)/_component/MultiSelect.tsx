"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";

export function MultiSelectLanguages({ name }: { name: string }) {
    const options = ["English", "Bangla", "Hindi", "Arabic", "Spanish"];
    const [selected, setSelected] = useState<string[]>([]);

    const toggleOption = (value: string) => {
        setSelected((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    return (
        <div className="w-full">
            {/* Hidden fields to submit actual array */}
            {selected.map((v) => (
                <input key={v} type="hidden" name={name} value={v} />
            ))}

            <Popover>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="w-full border p-2 rounded text-left"
                    >
                        {selected.length > 0
                            ? selected.join(", ")
                            : "Select languages"}
                    </button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option}
                                    onSelect={() => toggleOption(option)}
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${selected.includes(option)
                                                ? "opacity-100"
                                                : "opacity-0"
                                            }`}
                                    />
                                    {option}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}