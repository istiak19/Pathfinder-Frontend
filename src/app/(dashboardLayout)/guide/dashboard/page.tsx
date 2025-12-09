import { getMeta } from "@/services/meta/meta.service";
import GuideMetaDashboard from "../../_component/Guide/GuideMetaDashboard";
import { Metadata } from "next";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Guide Dashboard – Pathfinder",
  description:
    "Dashboard for local guides to manage bookings, view analytics, and track performance on Pathfinder.",
  keywords: [
    "Pathfinder",
    "guide dashboard",
    "bookings management",
    "local guides",
    "travel analytics",
    "tour management",
  ],
};


const GuideDashboardPage = async () => {
  const meta = await getMeta();

  return <div>
    <Suspense fallback={null}>
      <GuideMetaDashboard meta={meta?.data} />
    </Suspense>
  </div>;
};

export default GuideDashboardPage;