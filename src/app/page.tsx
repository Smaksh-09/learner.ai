import NavBar from "./components/Navbar";

import Hero from "./components/Hero";
import Features from "./components/Features";

import Pricing from "./components/Pricing";

export default function page(){
    return (
        <div className="relative min-h-screen w-full bg-white">
            <div className="relative z-10">
                <NavBar/>
                <main className="relative min-h-screen">
                    <Hero key="hero" />
                    <Features/>
                    <Pricing/>
                </main>
            </div>
        </div>
    )
}