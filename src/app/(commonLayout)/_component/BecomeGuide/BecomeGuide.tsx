"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/shared/MultiSelect";
import { toast } from "sonner";
import { registerUser } from "@/services/auth/registerUser";
import { useActionState } from "react";
import InputFieldError from "@/components/shared/InputFieldError";
import { Eye, EyeOff } from "lucide-react";

enum ListingCategory {
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

const BecomeGuideForm = () => {
    // ✅ All hooks at the top
    const [state, formAction, isPending] = useActionState(registerUser, null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (state && !state.success && state.message) toast.error(state.message);
    }, [state]);

    return (
        <motion.form
            action={formAction}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto p-8 my-16 bg-white dark:bg-gray-900 rounded-3xl shadow-xl space-y-6"
        >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Become a Guide
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
                Share your city, your passions, and earn by hosting experiences.
            </p>

            {/* Full Name */}
            <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                />
                <InputFieldError field="name" state={state} />
            </Field>

            {/* Email */}
            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@example.com" />
                <InputFieldError field="email" state={state} />
            </Field>

            {/* Bio */}
            <Field>
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    placeholder="Tell us about yourself"
                    className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                />
                <InputFieldError field="bio" state={state} />
            </Field>

            {/* Password */}
            <Field className="relative">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <InputFieldError field="password" state={state} />
            </Field>

            {/* Confirm Password */}
            <Field className="relative">
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <InputFieldError field="confirmPassword" state={state} />
            </Field>

            {/* Languages */}
            <Field>
                <MultiSelect
                    label="Languages Spoken"
                    name="languages"
                    options={["English", "Bangla", "Hindi", "Arabic", "Spanish"]}
                    disabled={isPending}
                    placeholder="Select languages"
                />
                <InputFieldError field="languages" state={state} />
            </Field>

            {/* Expertise */}
            <Field>
                <MultiSelect
                    label="Expertise / Tour Categories"
                    name="expertise"
                    options={Object.values(ListingCategory)}
                    disabled={isPending}
                    placeholder="Select expertise"
                />
                <InputFieldError field="expertise" state={state} />
            </Field>

            {/* Daily Rate */}
            <Field>
                <FieldLabel htmlFor="dailyRate">Daily Rate ($)</FieldLabel>
                <Input
                    id="dailyRate"
                    type="number"
                    min={10}
                    placeholder="50"
                    className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                />
                <InputFieldError field="dailyRate" state={state} />
            </Field>

            {/* Hidden Status */}
            <input type="hidden" name="status" value="Inactive" />

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isPending}
                className="w-full py-3 text-base font-medium rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-all duration-300"
            >
                {isPending ? "Submitting..." : "Submit Application"}
            </Button>
        </motion.form>
    );
};

export default BecomeGuideForm;