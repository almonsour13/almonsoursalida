import ProfileBadge from "../common/profile-badge";
import Footer from "./footer";
import ScrollDownButton from "@/components/common/scroll-down-button";

export default function AppLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col gap-20 w-full relative ">
            {children}
            <Footer />
            <ScrollDownButton />
            <ProfileBadge/>
        </div>
    );
}
