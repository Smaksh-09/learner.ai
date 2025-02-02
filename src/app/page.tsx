import NavBar from "./components/Navbar";
import Background from "./components/Background";
import Hero from "./components/Hero";

export default function page(){
    return (
        <div className="relative min-h-screen min-w-screen bg-black overflow-hidden">
            <Background/>
            <div className="absolute inset-0 z-10">
                <NavBar/>
                <main className="relative">
                    <Hero key="hero" />
                </main>
            </div>
        </div>
    )
}