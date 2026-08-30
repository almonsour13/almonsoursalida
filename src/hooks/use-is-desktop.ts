import { useEffect, useState } from "react";

export const useIsDesktop = ({
    breakpointPx = 768,
}: {
    breakpointPx?: number;
}) => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${breakpointPx}px)`);
        const update = () => setIsDesktop(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, [breakpointPx]);

    return isDesktop;
};
