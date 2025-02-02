import NavBar from "./components/Navbar";
import Background from "./components/Background";
import Hero from "./components/Hero";
import Features from "./components/Features";

export default function page(){
    return (
        <div className="relative min-h-screen w-full bg-black">
            <Background/>
            <div className="relative z-10">
                <NavBar/>
                <main className="relative min-h-screen">
                    <Hero key="hero" />
                    <Features/>
                </main>
            </div>
        </div>
    )
}