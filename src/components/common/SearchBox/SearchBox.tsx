import React, {FC, useState} from 'react';
import './SearchBox.scss';
import dogIcon from '../../../assets/img/dog.png';
import microphoneIcon from '../../../assets/img/microphone.png';

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

const SearchBox: FC<SearchBoxProps> = ({setSelectedCategory}) => {
    const [open, setOpen] = useState(false);

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
                <div className="dropdown">
                    {categories.map((cat, index) => (
                        <div key={cat.key} className="dropdown-item" onClick={() => setSelectedCategory(cat.key)}>
                            {cat.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
