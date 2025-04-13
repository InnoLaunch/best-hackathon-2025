import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = L.icon({
    iconUrl: '/dog-icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const places = [
    {
        id: 1,
        name: 'McDonalds',
        address: 'Lypynslogo 19 street',
        lat: 40.7128,
        lng: -73.806,
    },
];

interface MapProps {
    onMarkerClick: (place: any) => void;
}

const Map: React.FC<MapProps> = ({ onMarkerClick }) => {
    return (
        <MapContainer center={[49.8397, 24.0297]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: 'min(100svw, 576px)' }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {places.map((place) => (
                <Marker
                    key={place.id}
                    position={[place.lat, place.lng]}
                    icon={customIcon}
                    eventHandlers={{
                        click: () => onMarkerClick(place),
                    }}
                />
            ))}
        </MapContainer>
    );
};

export default Map;
