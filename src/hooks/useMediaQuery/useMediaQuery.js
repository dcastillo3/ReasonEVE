import { useEffect, useState } from "react";
import { intialWindowWidth, useMediaQueryEvent } from "./useMediaQueryConsts";
import { getIsDesktop, getIsMobile, getIsTablet } from "./useMediaQueryUtils";

const useMediaQuery = () => {
    const [windowWidth, setWindowWidth] = useState(intialWindowWidth);
    const [isMobile, setIsMobile] = useState(() => getIsMobile(intialWindowWidth));
    const [isTablet, setIsTablet] = useState(() => getIsTablet(intialWindowWidth));
    const [isDesktop, setIsDesktop] = useState(() => getIsDesktop(intialWindowWidth));

    useEffect(() => {
        const handleResizeWindow = () => {
            const currWindowWidth = window.innerWidth;

            setIsMobile(getIsMobile(currWindowWidth));

            setIsTablet(getIsTablet(currWindowWidth));

            setIsDesktop(getIsDesktop(currWindowWidth));

            setWindowWidth(currWindowWidth);
        };

        window.addEventListener(useMediaQueryEvent, handleResizeWindow);

        return () => window.removeEventListener(useMediaQueryEvent, handleResizeWindow);
    }, [windowWidth]);

    return {
        windowWidth,
        isMobile,
        isTablet,
        isDesktop
    };
};

export default useMediaQuery;