import React, { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Card from "./components/Card";
import Toaster from "./components/Toaster";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [trip, setTrip] = useState({
    pickup: { address: "", latitude: "", longitude: "" },
    dropoff: { address: "", latitude: "", longitude: "" }
  });

  const [toggleToast, setToggleToast] = useState(false);

  const handleChange = event => {
    const value = { address: event.target.value };
    const name = event.target.name;
    callApiGeolocate(value, name);
  };

  const callApiGeolocate = (value, key) => {
    axios
      .post("https://stuart-frontend-challenge.now.sh/geocode", value)
      .then(res => {
        const response = res.data;
        setTrip(prevState => ({
          ...prevState,
          [key]: {
            address: response.address,
            latitude: response.latitude,
            longitude: response.longitude
          }
        }));
      })
      .catch(error => {
        value.addess === ""
          ? setTrip(prevState => ({
              ...prevState,
              [key]: {
                address: "",
                latitude: "",
                longitude: ""
              }
            }))
          : setTrip(prevState => ({
              ...prevState,
              [key]: {
                address: null,
                latitude: null,
                longitude: null
              }
            }));
      });
  };

  return (
    <div>
      <Card
        handleChange={handleChange}
        trip={trip}
        setTrip={setTrip}
        setToggleToast={setToggleToast}
      />
      <Toaster toggleToast={toggleToast} setToggleToast={setToggleToast} />
      <Map trip={trip} />
    </div>
  );
};

export default App;
