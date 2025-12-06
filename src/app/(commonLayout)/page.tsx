import Head from "next/head";
import HeroSection from "./_component/Home/HeroSection";
import FeaturedCities from "./_component/Home/FeaturedCities";
import TopGuides from "./_component/Home/TopGuides";
import HowItWorks from "./_component/Home/HowItWorks";
import Categories from "./_component/Home/Categories";
// import Testimonials from "./_component/Home/Testimonials";
import BecomeGuideCTA from "./_component/Home/BecomeGuideCTA";

export default function Home() {
    return (
        <>
            <Head>
                <title>Local Guide Platform</title>
                <meta name="description" content="Explore the world like a local" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="overflow-x-hidden">
                <HeroSection/>
                <FeaturedCities />
                <TopGuides />
                <HowItWorks />
                <Categories />
                {/* <Testimonials /> */}
                <BecomeGuideCTA />
            </main>
        </>
    );
}