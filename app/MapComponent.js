// app/MapComponent.js
'use client'; // Add this line
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

const markers = [
    { position: [28.6139, 77.209], label: "New Delhi" },
    { position: [19.0760, 72.8777], label: "Mumbai" },
    { position: [13.0827, 80.2707], label: "Chennai" },
    { position: [22.5726, 88.3639], label: "Kolkata" },
    { position: [12.9716, 77.5946], label: "Bangalore" },
    { position: [26.9124, 75.7873], label: "Jaipur" },
    { position: [23.0225, 72.5714], label: "Ahmedabad" }
];


// Fixes the default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function CenterMap({ center }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);

    return null;
}

export default function MapComponent() {
    const [center, setCenter] = useState([28.6139, 77.209]);

    const centerFunction = (e) => {
        setCenter(e);
        console.log("coordinates:", e);
    };

    return (
        <MapContainer center={center} zoom={5} style={{ height: "550px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
                <div key={index} >
                    <Marker key={index} position={marker.position} eventHandlers={{
                        click: () => {
                            centerFunction(marker.position);
                        },
                    }}>
                        <Popup>
                            <div >
                                {marker.label}
                            </div>
                        </Popup>
                    </Marker>
                </div>
            ))}
            <CenterMap center={center} />
        </MapContainer>
    );
}
