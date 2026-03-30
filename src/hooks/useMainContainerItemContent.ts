import { useEffect, useState } from "react";

export function useMainContainerContent(
    mainContaierRef: React.RefObject<any>,
    cardCompH: number,
) {
    const [windowLines, setWindowLine] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (cardCompH === 0) return;

        const windowContent = Math.ceil(
            mainContaierRef.current.clientHeight / cardCompH
        );

        if (windowContent !== windowLines) setWindowLine(windowContent);
    }, [cardCompH]);

    //le nombre de lignes que peut contenir la fenetre
    return { windowLines };
}

export default useMainContainerContent;