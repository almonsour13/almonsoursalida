import { socials } from "@/constant/social";

export default function Footer() {
    return (
        <div className="w-full px-6 py-12 bg-gradient-to-t from-muted/20 to-background">
            <div className="md:max-w-6xl mx-auto w-full">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    {/* Left Section - Brand/Name */}
                    <div className="flex-1 w-full text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            Al-Monsour Salida
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Crafting exceptional digital experiences
                        </p>
                    </div>

                    {/* Right Section - Social Links */}
                    <div className="flex-1 w-full flex justify-start md:justify-end">
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground font-medium">
                                Connect with me
                            </span>
                            <div className="flex gap-3">
                                {socials.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.link}
                                        className="group flex items-center justify-center h-10 w-10 bg-card border border-border rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300"
                                    >
                                        <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-card mb-6"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span>© 2025 Al-Monsour Salida.</span>
                        <span>All rights reserved.</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-xs uppercase tracking-widest">
                            Made with passion
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-xs">
                                Available for projects
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
