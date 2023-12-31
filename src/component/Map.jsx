import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useCities } from "../Contexts/CitiesContexts";
import Button from "./Button";
import { UseUrlPosition } from "../hooks/UseUrlPosition";
function Map() {
  // const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setmapPosition] = useState([40, 0]);
  const [maplat,maplng]=UseUrlPosition();
  // const [searchParams] = useSearchParams();
  // const maplat = searchParams.get("lat");
  // const maplng = searchParams.get("lng");
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  useEffect(
    function () {
      if (maplat && maplng) setmapPosition([maplat, maplng]);
    },
    [maplat, maplng]
  );
  useEffect(
    function()
    {
      if(geolocationPosition) setmapPosition([geolocationPosition.lat,geolocationPosition.lng])

    },[geolocationPosition]
  )
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition&&<Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "loading..." : "use your position"}
      </Button>}
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
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
          
        ) )}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
