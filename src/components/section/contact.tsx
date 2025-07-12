import { Mail, Phone, MapPin } from "lucide-react";
import SectionWrapper from "../section-wrapper";

export default function Contact() {
    return (
        <SectionWrapper
            id="contact"
            className="flex items-center justify-center relative py-6 min-h-screen"
        >
            <div className=" md:max-w-6xl w-full flex flex-col items-center gap-4">
                <div className="flex-1 w-full">
                    <h1 className=" text-2xl md:text-7xl font-bold mb-4 leading-tight">
                        Get in touch
                    </h1>
                    <p className="text-sm md:text-base mb-6 text-foreground">
                        Ready to bring your ideas to life? {"I'm"} always excited to
                        work on new projects and collaborate with amazing
                        people.
                    </p>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-8">
                    <div className="flex-1 flex flex-col gap-2 items-start justify-start text-sm md:text-base">
                        <div className="flex items-center space-x-4">
                            <div className="py-2 ">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-muted-foreground">Email</p>
                                <p className="">almonsoursalida@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="py-2 rounded-lg">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-muted-foreground">Phone</p>
                                <p className="">+639569932496</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 ">
                            <div className="py-2 rounded-lg">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-muted-foreground">Location</p>
                                <p className="">
                                    Lupon, Davao Oriental, Philippines
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="border rounded-2xl">
                            <div className="p-4 md:p-8">
                                <form className="space-y-4 md:space-y-6 text-sm ">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-mediummb-2">
                                                Name
                                            </label>
                                            <input
                                                className="p-2 w-full rounded border bg-card "
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="blockmb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="p-2 w-full rounded border bg-card "
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-2">
                                            Subject
                                        </label>
                                        <input
                                            className="p-2 w-full rounded border bg-card "
                                            placeholder="Project inquiry"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            className="p-2 w-full rounded border bg-card   min-h-[120px]"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    <button className="w-full rounded border bg-primary py-2 text-background">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
