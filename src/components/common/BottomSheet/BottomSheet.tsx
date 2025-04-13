import {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import gsap from 'gsap';
import './BottomSheet.scss';
import {ILocation} from "../../../interfaces/common";
import { Rating } from 'react-simple-star-rating'
import useUserLocation from "../../../hooks/useUserLocation";


interface BottomSheetProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    selectedPlace: ILocation
    children?: React.ReactNode;
}

export default function BottomSheet({open, setOpen, selectedPlace, children}: BottomSheetProps) {
    const [shouldRender, setShouldRender] = useState(open);
    const sheetRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const dragStartY = useRef<number | null>(null);
    const isDragging = useRef(false);
    const { location, error } = useUserLocation();

    const [rating, setRating] = useState(() => Math.random() * (5 - 3) + 3);

    const handleRating = (rate: number) => {
        setRating(rate)
    }

    const getRouteForMaps = (destination: {lat: number, long: number}) => {
        if (!location) return '';
        return `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${destination.lat},${destination.long}
`
    }


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
                    className="bottomsheet-drag-zone"
                    onPointerDown={handlePointerDown}
                >
                    <div className="bottomsheet-drag-handle" />
                </div>
                <div className='content'>
                    <div>
                        <p>{selectedPlace.name}</p>
                        <Rating
                            initialValue={rating }
                            onClick={handleRating}
                        />
                        <a href={getRouteForMaps({lat: selectedPlace.lat, long: selectedPlace.long})} target='_blank'>Go</a>
                    </div>
                    <span>How wheelchair accessible is this palce?</span>
                    <div>
                        <button className='state-btn green'>Fully</button>
                        <button className='state-btn yellow'>Partially</button>
                        <button className='state-btn red'>Not at all</button>
                    </div>
                    <a
                        className="black"
                        href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.lat},${selectedPlace.long}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open in Google Maps
                    </a>                    <a className='black' href='tel:+3822222222'>Contact us</a>

                </div>
            </div>
        </div>,
        document.body
    );
}
