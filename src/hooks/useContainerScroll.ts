import { useState, useEffect, useRef } from "react";

export function useContainerScroll(
    mainContaierRef: React.RefObject<any>,
    cardHeight: number,
    gridContaineRef: React.RefObject<any>
) {
    const [rowSliceIndexStart, setRowSliceIndexStart] = useState(0);
    const [rowSliceIndexEnd, setRowSliceIndexEnd] = useState(15);
    const [taskSliceIdexStart, setTaskSliceIdexStart] = useState(0);
    const [taskSLiceIdexEnd, setTaskSLiceIdexEnd] = useState(30);

    const [rowHeight, setRowHeight] = useState(0);

    const visibleRows = useRef<Set<number>>(new Set());

    useEffect(() => {
        const mainContainer = mainContaierRef.current;
        const gridContainer = gridContaineRef.current;

        if (!mainContainer || !gridContainer) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const row = entry.target as HTMLElement;
                    const indexAttr = row.getAttribute('data-index');
                    if (!indexAttr) return;

                    const index = parseInt(indexAttr, 10);

                    if (entry.isIntersecting) {
                        visibleRows.current.add(index);
                    } else {
                        visibleRows.current.delete(index);
                    }
                });
            },
            {
                root: mainContainer,
                threshold: 0,
            }
        );

        const observedElements = new Set<Element>();

        const observeChildren = () => {
            if (!gridContainer.children) return;
            for (let i = 0; i < gridContainer.children.length; i++) {
                const element = gridContainer.children[i] as Element;
                if (!observedElements.has(element)) {
                    observer.observe(element);
                    observedElements.add(element);
                }
            }
        };

        const mutationObserver = new MutationObserver(() => {
            observeChildren();
        });

        observeChildren();
        mutationObserver.observe(gridContainer, { childList: true });

        const handleScroll = () => {
            const scrollTop = mainContainer.scrollTop;
            const containerHeight = mainContainer.clientHeight || 800;

            // ---- CALCUL POUR LES ROWS ----
            const baseRowHeight = 72;
            let startRowIndex = Math.floor(scrollTop / baseRowHeight);

            if (visibleRows.current.size > 0) {
                const firstVisibleRowIndex = Math.min(...Array.from(visibleRows.current));
                if (startRowIndex > firstVisibleRowIndex) {
                    startRowIndex = firstVisibleRowIndex;
                }
            }

            // Calcul de la fin (avec un buffer de vue de 2 éléments)
            const visibleRowsCount = Math.ceil(containerHeight / baseRowHeight);
            const endRowIndex = startRowIndex + visibleRowsCount + 2;


            // ---- CALCUL POUR LES TASKS ----
            // Base théorique pour une task (environ 40px minimum)
            const baseTaskHeight = 40;
            // Attention : Ceci est une estimation globale. Si chaque ROW scrolle individuellement, 
            // cette formule devra être ajustée.
            const startTaskIndex = Math.floor(Math.max(0, scrollTop) / baseTaskHeight);
            const visibleTasksCount = Math.ceil(containerHeight / baseTaskHeight);
            const endTaskIndex = startTaskIndex + visibleTasksCount + 5;


            setRowSliceIndexStart(startRowIndex);
            setRowSliceIndexEnd(endRowIndex);
            setTaskSliceIdexStart(startTaskIndex);
            setTaskSLiceIdexEnd(endTaskIndex);

        };

        mainContainer.addEventListener("scroll", handleScroll);

        // Exécution initiale
        handleScroll();

        return () => {
            mainContainer.removeEventListener("scroll", handleScroll);
            observer.disconnect();
            mutationObserver.disconnect();
        };

    }, [mainContaierRef, gridContaineRef]);

    return {
        rowSliceIndexStart,
        rowSliceIndexEnd,
        taskSliceIdexStart,
        taskSLiceIdexEnd,
        rowHeight
    };
}