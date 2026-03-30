import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "./useWindowsSize";

export const useGridContainer = (gridContaineRef: React.RefObject<any>) => {
    const [cardCompH, setCardCompH] = useState(0);
    const [itemsByLine, setItemsByLines] = useState(1);

    const cardRef = useRef<any>(undefined);

    const { width } = useWindowSize();

    useEffect(() => {
        if (typeof window === "undefined") return;

        //si le parent n'a aucun enfant on sort
        if (gridContaineRef.current.hasChildNodes() === false) return;

        //la hauteur du premier enfant de la grid
        const cardH = gridContaineRef.current.firstChild.clientHeight;

        if (cardH !== cardCompH) {
            const gridW = gridContaineRef.current.clientWidth;
            const cardW = gridContaineRef.current.firstChild.clientWidth;

            setCardCompH(cardH);
            setItemsByLines(Math.floor(gridW / cardW));
        }
    }, [width]);

    return { cardCompH, cardRef, itemsByLine };
};