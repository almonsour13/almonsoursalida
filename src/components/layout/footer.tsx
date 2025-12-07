
export default function Footer() {
    return (
        <div className="w-full px-6 py-12">
            <div className="md:max-w-7xl mx-auto w-full">
                {/* Divider */}
                <div className="w-full h-px bg-border mb-6"></div>

                {/* Bottom Section */}
                <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 text-sm text-muted-foreground">
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
