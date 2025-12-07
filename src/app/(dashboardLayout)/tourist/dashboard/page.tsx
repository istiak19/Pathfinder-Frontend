import { getMeta } from "@/services/meta/meta.service";
import { Metadata } from "next";
import { Suspense } from "react";
import TouristDashboard from "../../_component/tourists/TouristDashboard";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tourist Dashboard – Pathfinder",
  description:
    "Admin dashboard for Pathfinder to monitor users, bookings, payments, and revenue. Get insights through charts and analytics for better management.",
  keywords: [
    "Pathfinder",
    "admin dashboard",
    "users management",
    "bookings analytics",
    "payments tracking",
    "tourism platform",
    "travel insights",
    "revenue overview",
  ],
};

const TouristDashboardPage = async () => {
  const meta = await getMeta();

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <Suspense fallback={null}>
        <TouristDashboard data={meta?.data} />
      </Suspense>
    </div>
  );
};

export default TouristDashboardPage;