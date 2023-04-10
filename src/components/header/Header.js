import "./header.css";
// React-leaflet
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Icon, latLng } from "leaflet";

// components
import LocationMarker from "../location-marker/LocationMarker";

//rtk query
import { useTrackIPQuery } from "../../services/ipServices";
import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// function LocationMarker({ position }) {
//   const map = useMap();
//   map.panTo({ lat: position.lat, lng: position.lng });

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// }

const Header = () => {
  const [inputValue, setInputValue] = useState("");

  const [skip, setSkip] = useState(true);
  const [searchTerm, setSearchTerm] = useState(skipToken);

  //   console.log(process.env.REACT_APP_API_KEY);

  // type in put and fet the get request

  const handleFetch = (e) => {
    e.preventDefault();
    // setSkip(!skip);
    setSearchTerm(inputValue);
  };

  // Conditional fetching, see docs
  const { data, error, isLoading } = useTrackIPQuery(searchTerm);

  return (
    <>
      <section className="header-container">
        <h1>IP Address Tracker</h1>
        <form className="input-container" onSubmit={handleFetch}>
          <input
            type="text"
            placeholder="Search for IP address"
            className="search-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="input-arrow">
            <i
              className="fa-solid fa-angle-right fa-xl"
              style={{ color: "#fff" }}
            ></i>
          </button>
        </form>

        <div className={data === undefined ? "hide" : "data-container"}>
          {error ? (
            <>Oh no, error occurred</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <>
              <div className="address data-container-items">
                <p className="data-title">ip address</p>
                <p className="data">{data.ip}</p>
              </div>

              <div className="location data-container-items">
                <p className="data-title">location</p>
                <p className="data">
                  {data.location.city},{data.location.region},
                  {data.location.country}
                </p>
              </div>

              <div className="timezone data-container-items">
                <p className="data-title">timezone</p>
                <p className="data">UTC {data.location.timezone}</p>
              </div>

              <div className="isp data-container-items">
                <p className="data-title">isp</p>
                <p className="data">{data.location.lat}</p>
              </div>
            </>
          ) : null}
        </div>
      </section>
      {data ? (
        <MapContainer
          center={[data.location.lat, data.location.lng]}
          zoom={11}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker
            key={data.location.geonameId}
            position={[data.location.lat, data.location.lng]}
            icon={locationPin}
          ></Marker> */}
          <LocationMarker
            position={{ lat: data.location.lat, lng: data.location.lng }}
          />
        </MapContainer>
      ) : (
        <MapContainer
          center={[37.40599, -122.078514]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[37.40599, -122.078514]}></Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Header;
