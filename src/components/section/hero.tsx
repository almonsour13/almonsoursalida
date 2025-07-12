import GridLines from "../grid-lines";
import SectionWrapper from "../section-wrapper";

export default function Hero() {
    return (
        <SectionWrapper
            id="hero"
            className="flex items-center justify-center relative"
        >
            <div className=" md:max-w-6xl w-full flex items-center min-h-screen">
                <div className="flex-1 flex flex-col gap-2 md:gap-4">
                    <h1 className=" text-3xl md:text-7xl font-bold leading-tight ">
                        <span className="bg-background"> Hi,</span> <br />{" "}
                        
                        <span className="bg-background">{"I'm"}{" "}Al-Monsour Salida</span>
                    </h1>
                    <p className="text-sm md:text-base text-foreground bg-background">
                        {"I'm"} a Full Stack Web Developer with experience in
                        designing, developing, and deploying dynamic web
                        applications. I specialize in JavaScript, React,
                        Node.js, and SQL/NoSQL databases. I love solving
                        problems with clean code and intuitive design.
                    </p>
                    <div className="flex gap-2">
                        <a
                            href="#contact"
                            className="flex items-center justify-between px-3 py-1 bg-card border rounded-full text-xs md:text-sm"
                        >
                            Contact Me
                        </a>
                        <a
                            href=""
                            className="flex items-center justify-between px-3 py-1 bg-card border  rounded-full  text-xs md:text-sm"
                        >
                            Download CV
                        </a>
                    </div>
                </div>
            </div>
            <GridLines/>
        </SectionWrapper>
    );
}
