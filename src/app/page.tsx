import CursorCircle from "../components/cursor-circle";
import Footer from "../components/layout/footer";
import NavigationMenu from "../components/layout/navigation";
import Contact from "../components/section/contact";
import Hero from "../components/section/hero";
import Projects from "../components/section/projects";
import Skills from "../components/section/skills";

export default function Home() {
    return (
        <div className="flex flex-col gap-20 w-full relative font-monos ">
            <NavigationMenu />
            <CursorCircle />
            <Hero />
            {/* <AnimatedSeparator /> */}
            <Projects />
            <Skills />
            <Contact/>
            <Footer/>
        </div>
    );
}
