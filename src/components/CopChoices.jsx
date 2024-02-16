import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"; // Assuming you use Axios for HTTP requests
import { cities, vehicles, initialState } from "../data";
import "../component-css/CopChoices.css";
import Carousel from "./Carousel";
import Swal from "sweetalert2";
import Results from "./Results";

const CopChoices = () => {
  const [appState, setAppState] = useState(initialState);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [copIndex, setCopIndex] = useState(0);
  const [copName, setCopName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const resetAppState = () => {
    setAppState(initialState);
  };

  const backend_url="https://catchfugitive-backend.netlify.app"

  // Function to fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cities and vehicles data from the backend
        const citiesResponse = await axios.get(backend_url + "/cities");
        const vehiclesResponse = await axios.get(
          backend_url+"/vehicles"
        );

        setAvailableCities(citiesResponse.data);
        setAvailableVehicles(vehiclesResponse.data);
        await simulateFugitiveLocation();
        const handleBeforeUnload = (event) => {
          // Reset the app state when the page is reloaded or closed
          resetAppState();
        };

        // Attach the event listener when the component mounts
        window.addEventListener("beforeunload", handleBeforeUnload);

        // Cleanup: Remove the event listener when the component unmounts
        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      } catch (error) {
        console.error("Error fetching data from the backend", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Function to simulate fugitive location
  const simulateFugitiveLocation = async () => {
    try {
      const fugitiveLocationResponse = await axios.get(
        backend_url+"/simulate-fugitive-location"
      );
      setAppState((prevState) => ({
        ...prevState,
        fugitiveLocation: fugitiveLocationResponse.data,
      }));
      console.log(fugitiveLocationResponse.data);
    } catch (error) {
      console.error("Error simulating fugitive location", error);
    }
  };

  // Function to handle cop's choice
  const handleCopChoice = async () => {
    if (copName.length == 0) {
      Swal.fire("Error", "Please enter cop name", "error");
      return;
    } else if (!appState.copsChoices[copIndex]) {
      Swal.fire("Error", "Please select city or vehicle", "error");
      return;
    }

    const obj = {
      copName: copName,
      city: appState.copsChoices[copIndex].city,
      vehicle: appState.copsChoices[copIndex].vehicle,
    };

    try {
      await axios.post(backend_url+"/cop-choice", obj);

      setCopIndex((prevIndex) => prevIndex + 1);
      setCopName("");
      setAvailableCities(availableCities.filter((ele) => ele.name != obj.city));
      setAvailableVehicles(
        availableVehicles.filter((ele) => ele.name != obj.vehicle)
      );
      setSelectedOption(null);
    } catch (error) {
      console.error("Error handling cop choice", error);
    }
  };

  // Function to determine capture results
  const determineCaptureResults = async () => {
    try {
      // Fetch capture results from the backend
      const resultsResponse = await axios.get(
        backend_url+"/capture-results"
      );
      setAppState((prevState) => ({
        ...prevState,
        captureResults: resultsResponse.data,
      }));
      console.log(resultsResponse.data);
    } catch (error) {
      console.error("Error fetching capture results from the backend", error);
    }
  };

  const handleCitySelection = (cityValue) => {
    setAppState((prevState) => {
      const updatedChoices = [...prevState.copsChoices];
      updatedChoices[copIndex] = {
        ...updatedChoices[copIndex],
        city: cityValue.name,
      };
      return { ...prevState, copsChoices: updatedChoices };
    });
    console.log(appState)
  };

  const handleVehicleSelection = (vehicleValue) => {
    setAppState((prevState) => {
      const updatedChoices = [...prevState.copsChoices];
      updatedChoices[copIndex] = {
        ...updatedChoices[copIndex],
        vehicle: vehicleValue.name,
      };
      return { ...prevState, copsChoices: updatedChoices };
    });
    console.log(appState)
  };

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="copChoicesContainer">
      {copIndex < 3 ? (
        <div className="choiceSubContainer">
          <div className="choicesHeader">
            <h2>Enter details for Cop {copIndex + 1}</h2>
          </div>
          {copIndex == 0 ? (
            <div className="copImgContainer">
              <img src="cop1.png" className="copPic" />
            </div>
          ) : copIndex == 1 ? (
            <div>
              <img src="cop2.png" className="copPic" />
            </div>
          ) : copIndex == 2 ? (
            <div>
              <img src="cop3.png" className="copPic" />
            </div>
          ) : null}
          <div className="inputContainer">
            <label className="labelText">Cop Name :</label>
            <input
              type="text"
              value={copName}
              onChange={(e) => setCopName(e.target.value)}
              className="input"
            />
          </div>
          <div className="carouselContainer">
            <label className="labelText">Select City :</label>
            <Carousel
              data={availableCities}
              onSelect={handleCitySelection}
              selectedOption={selectedOption}
              onCheckboxChange={handleCheckboxChange}
            />
          </div>
          <div className="carouselContainer">
            <label className="labelText">Select Vehicle :</label>
            <Carousel
              data={availableVehicles}
              onSelect={handleVehicleSelection}
              selectedOption={selectedOption}
              onCheckboxChange={handleCheckboxChange}
            />
          </div>
          <button onClick={handleCopChoice} className="howToPlay">
            Next
          </button>
        </div>
      ) : (
        <div>
          <h2>Results</h2>
          {appState.captureResults.length==0 && <button onClick={determineCaptureResults} className="howToPlay">
            Lets begin the pursuit
          </button> }
          {appState.captureResults.length!=0 && 
          <div style={{display: 'flex', justifyContent:'center', alignItems: 'center' }}>
          <Results captureResults={appState.captureResults} />
          </div>}
        </div>
      )}
    </div>
  );
};

export default CopChoices;
