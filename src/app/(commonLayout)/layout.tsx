import Footer from "./_component/shared/Footer";
import NavbarServer from "./_component/shared/navbar/Navbar.server";

export default function CommonLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <NavbarServer />
            <main className="min-h-dvh">
                {children}
            </main>
            <Footer />
        </div>
    );
}