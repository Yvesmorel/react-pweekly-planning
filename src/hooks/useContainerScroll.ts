import { useState, useEffect, useLayoutEffect } from "react";




export function useContainerScroll(
    mainContaierRef: React.RefObject<any>,
    cardHeight: number,
    gridGap: number
) {
    const [sliceIndex, setSliceIndex] = useState(0);

    useEffect(() => {
        const mainContainer = mainContaierRef.current;

        const handleScroll = () => {
            const computeIndex = Math.floor(
                mainContainer.scrollTop / (cardHeight + gridGap),
            );
            setSliceIndex(computeIndex);
        };

        mainContainer.addEventListener("scroll", handleScroll);
        return () => mainContainer.removeEventListener("scroll", handleScroll);

    }, [cardHeight, gridGap]);

    return { sliceIndex };
}