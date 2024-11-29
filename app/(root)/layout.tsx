import Navbar from "@/components/Navbar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode}>) {
    return (
        <main className="font-work-sans">
            {/* Navigation bar. */}
            <Navbar />

            {children}
        </main>
    )
}