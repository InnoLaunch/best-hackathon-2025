import React, {FC, useCallback, useEffect, useState} from 'react';
import './Dashboard.scss';
import BottomSheet from '../../common/BottomSheet/BottomSheet';
import Map from '../../features/Map/Map';
import SearchBox from "../../common/SearchBox/SearchBox";
import MapService from "../../../services/MapService";

const Dashboard: FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState('foodmarket');
    const [locations, setLocations] = useState([])

    const getLocations = useCallback(async () => {
        const response = await MapService.getLocations(
            'wheelchair',
            selectedCategory,
            49.8397,
            24.0297,
        );
        console.log(response);
    }, [selectedCategory]);

    useEffect(() => {
        getLocations().then((data) => {
            // setLocations(data.data);
        })

    }, [getLocations, selectedCategory]);

    const handleMarkerClick = (place: any) => {
        setSelectedPlace(place);
        setOpen(true);
    };

    return (
        <main className='container'>
            <SearchBox setSelectedCategory={setSelectedCategory} />
            <Map onMarkerClick={handleMarkerClick} />
            <BottomSheet open={open} setOpen={setOpen}>
                {selectedPlace && (
                    <>
                        <h2>{selectedPlace.name}</h2>
                        <p>{selectedPlace.address}</p>
                        <button onClick={() => window.open(`https://maps.google.com?q=${selectedPlace.lat},${selectedPlace.lng}`, '_blank')}>
                            Open in Google Maps
                        </button>
                    </>
                )}
            </BottomSheet>
        </main>
    );
};

export default Dashboard;
