import {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import gsap from 'gsap';
import './BottomSheet.scss';

interface BottomSheetProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    children?: React.ReactNode;
}

export default function BottomSheet({open, setOpen, children}: BottomSheetProps) {
    const [shouldRender, setShouldRender] = useState(open);
    const sheetRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const dragStartY = useRef<number | null>(null);
    const isDragging = useRef(false);

    useEffect(() => {
        if (open) setShouldRender(true);
    }, [open]);

    useEffect(() => {
        if (!shouldRender) return;

        if (open) {
            gsap.set(sheetRef.current, {y: '100%'});
            gsap.to(sheetRef.current, {y: 0, duration: 0.4, ease: 'power2.out'});
            gsap.fromTo(overlayRef.current, {opacity: 0}, {opacity: 1, duration: 0.3});
        } else {
            gsap.to(sheetRef.current, {y: '100%', duration: 0.4, ease: 'power2.in'});
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => setShouldRender(false)
            });
        }
    }, [open, shouldRender]);

    const handlePointerDown = (e: React.PointerEvent) => {
        dragStartY.current = e.clientY;
        isDragging.current = true;
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
    };

    const handlePointerMove = (e: PointerEvent) => {
        if (!isDragging.current || dragStartY.current === null) return;
        const deltaY = e.clientY - dragStartY.current;
        if (deltaY > 0) {
            gsap.set(sheetRef.current, {y: deltaY});
        }
    };

    const handlePointerUp = (e: PointerEvent) => {
        if (!isDragging.current || dragStartY.current === null) return;
        const deltaY = e.clientY - dragStartY.current;

        isDragging.current = false;
        dragStartY.current = null;

        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);

        if (deltaY > 100) {
            // close
            setOpen(false);
        } else {
            // return to position
            gsap.to(sheetRef.current, {y: 0, duration: 0.3, ease: 'power2.out'});
        }
    };

    if (!shouldRender) return null;

    return createPortal(
        <div className="bottomsheet-overlay" onClick={() => setOpen(false)} ref={overlayRef}>
            <div className="bottomsheet-backdrop" />
            <div
                ref={sheetRef}
                className="bottomsheet-panel"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="bottomsheet-drag-handle"
                    onPointerDown={handlePointerDown}
                />
                {children ?? <div className="bottomsheet-placeholder">Bottom sheet content</div>}
            </div>
        </div>,
        document.body
    );
}
