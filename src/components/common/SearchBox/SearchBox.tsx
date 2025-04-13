import React, { FC, useEffect, useRef, useState } from 'react';
import './SearchBox.scss';
import dogIcon from '../../../assets/img/dog.png';
import microphoneIcon from '../../../assets/img/microphone.png';
import gsap from 'gsap';

const categories = [
    { title: "Hospital", key: "hospital" },
    { title: "Pharmacy", key: "pharmacy" },
    { title: "Park", key: "park" },
    { title: "Museum", key: "museum" },
    { title: "Hotel", key: "hotel" },
    { title: "Bank", key: "bank" },
    { title: "Fuel", key: "fuel" },
    { title: "Entertainment", key: "entertainment" },
    { title: "Food Market", key: "foodmarket" },
    { title: "Restaurant", key: "restaurant" },
    { title: "Post Office", key: "postoffice" },
    { title: "Electric Shop", key: "electricshop" },
];

interface SearchBoxProps {
    setSelectedCategory: (category: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ setSelectedCategory }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open && dropdownRef.current) {
            gsap.fromTo(
                dropdownRef.current,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [open]);

    const handleItemClick = (catKey: string, el: HTMLDivElement) => {
        gsap.fromTo(
            el,
            { scale: 1 },
            {
                scale: 1.1,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power1.inOut',
                onComplete: () => {
                    setSelectedCategory(catKey);
                    setOpen(false);
                },
            }
        );
    };

    return (
        <div className="searchbox-wrapper">
            <div className="searchbox" onClick={() => setOpen(!open)}>
                <img src={dogIcon} alt="dog" className="dog-icon" />
                <span className="placeholder">Search here</span>
                <button className="mic-btn">
                    <img src={microphoneIcon} alt="mic" width={24} height={24} />
                </button>
            </div>

            {open && (
                <div className="dropdown" ref={dropdownRef}>
                    {categories.map((cat) => (
                        <div
                            key={cat.key}
                            className="dropdown-item"
                            onClick={(e) => handleItemClick(cat.key, e.currentTarget)}
                        >
                            {cat.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
