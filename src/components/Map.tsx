import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@/styles/leaflet.css';

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  className?: string;
}

export default function Map({ className = '' }: MapProps) {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([-29.9330556, 30.9830556], 15);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add marker
    const marker = L.marker([-29.9330556, 30.9830556]).addTo(map);
    
    // Add popup
    marker.bindPopup(`
      <div class="p-2">
        <h3 class="font-semibold">Abbaquar-san Dream Centre</h3>
        <p>61 Gardenia Road, Wentworth, Durban, 4052</p>
      </div>
    `).openPopup();

    // Cleanup
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className={className}>
      <div id="map" className="w-full h-full rounded-lg" />
    </div>
  );
} 