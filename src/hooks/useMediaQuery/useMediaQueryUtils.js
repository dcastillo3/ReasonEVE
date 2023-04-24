import { minDesktopWidth, minTabletWidth } from "./useMediaQueryConsts";

const getIsDesktop = currWindowWidth => currWindowWidth > minDesktopWidth

const getIsTablet = currWindowWidth => !getIsDesktop(currWindowWidth) && currWindowWidth > minTabletWidth;

const getIsMobile = currWindowWidth => currWindowWidth < minTabletWidth;

export {
    getIsDesktop,
    getIsTablet,
    getIsMobile
};