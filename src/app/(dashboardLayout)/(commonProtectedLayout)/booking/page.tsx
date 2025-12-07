import BookingPage from "../../_component/Booking/Booking";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Booking Details – Pathfinder",
  description:
    "View and manage details of individual bookings on Pathfinder. Check tourist information, booking status, payment details, and update booking progress as a local guide.",
  keywords: [
    "Pathfinder",
    "booking details",
    "guide dashboard",
    "tourist information",
    "booking management",
    "local guide bookings",
    "payment status",
    "tour updates",
  ],
};

export default function Page() {
  return <BookingPage />;
}