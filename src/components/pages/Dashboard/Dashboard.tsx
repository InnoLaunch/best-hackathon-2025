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
        setLocations(response.data.locations)
    }, [selectedCategory]);

    useEffect(() => {
        getLocations().then((data) => {
        })

    }, [getLocations, selectedCategory]);

    const handleMarkerClick = (place: any) => {
        setSelectedPlace(place);
        setOpen(true);
    };

    return (
        <main className='container'>
            <SearchBox setSelectedCategory={setSelectedCategory} />
            <Map onMarkerClick={handleMarkerClick} locations={locations}/>
            <BottomSheet open={open} setOpen={setOpen} selectedPlace={selectedPlace} />
        </main>
    );
};

export default Dashboard;
