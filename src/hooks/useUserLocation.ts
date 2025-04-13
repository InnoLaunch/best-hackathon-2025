import { useEffect, useState } from 'react';

interface Coordinates {
    lat: number;
    lng: number;
}

export default function useUserLocation() {
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (err) => {
                setError('Unable to retrieve your location');
            }
        );
    }, []);

    return { location, error };
}
