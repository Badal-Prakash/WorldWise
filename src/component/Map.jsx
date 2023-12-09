import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CitiesContexts";
function Map() {
  // const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setmapPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams();
  const maplat = searchParams.get("lat");
  const maplng = searchParams.get("lng");
  useEffect(
    function () {
      if (maplat && maplng) setmapPosition([maplat, maplng]);
    },
    [maplat, maplng]
  );
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
       
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
