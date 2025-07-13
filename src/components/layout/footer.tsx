import { socials } from "@/constant/social";

export default function Footer() {
    return (
        <div className="w-full px-6 flex items-center justify-center ">
            <div className=" md:max-w-6xl py-6 w-full flex flex-col md:flex-row items-center justify-between gap-4  border-0 border-t  ">
                <div className="flex-1 w-full text-xs md:text-sm">
                    © 2024 Al-Monsour Salida. All rights reserved.
                </div>
                <div className="flex-1 w-full flex justify-start md:justify-end gap-2">
                    {socials.map((social, index) => (
                        <a
                            key={index}
                            href={social.link}
                            className="flex items-center justify-center h-8 w-8 py-1 bg-card border  rounded-full  text-xs md:text-sm"
                        >
                            {<social.icon className="h-4 w-4" />}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
