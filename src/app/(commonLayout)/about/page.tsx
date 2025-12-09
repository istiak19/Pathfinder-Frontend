import { Metadata } from "next";
import About from "../_component/About/About";

export const metadata: Metadata = {
    title: "About Pathfinder – Discover Bangladesh with Local Guides",
    description:
        "Learn about Pathfinder, Bangladesh’s leading platform connecting travelers with trusted local guides. Discover our mission, vision, and how we enhance travel experiences across the country.",
    keywords: [
        "About Pathfinder",
        "Pathfinder Bangladesh",
        "travel platform",
        "local guide platform",
        "Bangladesh tourism",
        "travel service",
        "about us",
        "tour guide information",
        "Pathfinder mission",
        "travel company Bangladesh",
    ],
};

const AboutPage = () => {
    return (
        <div>
            <About />
        </div>
    );
};

export default AboutPage;