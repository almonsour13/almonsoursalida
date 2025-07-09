import GridLines from "../grid-lines";
import SectionWrapper from "../section-wrapper";

export default function Hero() {
    return (
        <SectionWrapper
            id="hero"
            className="flex items-center justify-center relative"
        >
            <div className="inset-0 overflow-hidden pointer-events-none absolute z-0">
                <div className="absolute -top-32 -right-32 w-72 md:w-96 h-72 md:h-96 rounded-full border-2 border-dashed opacity-20"></div>
                <div className="absolute bottom-0 md:-bottom-20 -left-40 w-60 md:w-80 h-60 md:h-80 rounded-full border-2 border-dashed opacity-20    "></div>
            </div>
            <div className=" md:max-w-6xl w-full flex items-center min-h-screen">
                <div className="flex-1">
                    <h1 className=" text-4xl md:text-7xl font-bold mb-4 leading-tight">
                        Hi, <br /> {"I'm"} Al-Monsour Salida
                    </h1>
                    <p className="text-base mb-6 text-gray-300">
                        {"I'm"} a Full Stack Web Developer with experience in
                        designing, developing, and deploying dynamic web
                        applications. I specialize in JavaScript, React,
                        Node.js, and SQL/NoSQL databases. I love solving
                        problems with clean code and intuitive design.
                    </p>
                    <div className="flex gap-2">
                        <a
                            href="#contact"
                            className="flex items-center justify-between bg-white/10 px-6 py-2 border border-white/10 rounded-full text-xs"
                        >
                            Contact Me
                        </a>
                        <a
                            href=""
                            className="flex items-center justify-between bg-white/10 px-6 py-2 border border-white/10 rounded-full  text-xs"
                        >
                            Download CV
                        </a>
                    </div>
                </div>
                {/* <div className="flex-1 flex items-center justify-center">
                            <Image
                                src="/images/hero-image.png"
                                alt="Hero Image"
                                width={500}
                                height={300}
                                className="rounded-lg shadow-lg"
                            />
                        </div> */}
            </div>
            <GridLines />
        </SectionWrapper>
    );
}
