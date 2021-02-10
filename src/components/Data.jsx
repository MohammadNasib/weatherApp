import React, { useEffect, useState } from "react";

import Error from "./Error";
import useGeolocation from "react-hook-geolocation";

const Data = (props) => {
  const [main, setMain] = useState("");
  const [sys, setSys] = useState("");
  const [city, setCity] = useState(undefined);
  let response, resJson, cityName, urlCity;

  const geoLocation = useGeolocation();
  const { latitude, longitude } = geoLocation;

  const api = "d20cf2a70f6b41a6b7d387eaf52aa76d";

  urlCity = `${
    city !== undefined && props.value === undefined
      ? city
      : city === undefined && props.value !== undefined
      ? props.value
      : city !== undefined && props.value !== undefined
      ? props.value
      : `cox's bazar`
  } `;

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.value}&units=metric&appid=002e96939a7ceff77fc0ee69e29dec79`;
      const response = await fetch(url);
      const resJson = await response.json();

      setMain(resJson.main);
      setSys(resJson.sys);
    };

    fetchApi();
  }, [urlCity, props.value]);

  const cageApi = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude} + ${longitude}&key=${api}
    `;
    response = await fetch(url);
    resJson = await response.json();
    cityName = resJson.results[0].components.city;
    setCity(cityName);
  };

  window.onload = cageApi;

  return (
    <>
      {!main || !sys ? (
        <Error />
      ) : (
        <>
          <div className="mx-auto">
            <h2 className="my-3 text-center">
              <svg className="svg-icon dataIcons" viewBox="0 0 20 20">
                <path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path>
              </svg>
              {urlCity.toUpperCase()} (<small>{sys.country}</small>)
            </h2>

            <h2 className="text-center">
              <svg className="svg-icon dataIcons" viewBox="0 0 20 20">
                <path
                  fill="black"
                  d="M10.867,12.751V7.4c0-0.478-0.388-0.866-0.866-0.866S9.134,6.923,9.134,7.4v5.351c-1.008,0.357-1.733,1.316-1.733,2.448c0,1.436,1.164,2.599,2.6,2.599c1.435,0,2.599-1.163,2.599-2.599C12.6,14.067,11.876,13.108,10.867,12.751 M12.6,11.739V3.068c0-1.436-1.164-2.6-2.599-2.6c-1.436,0-2.6,1.164-2.6,2.6v8.671c-1.05,0.79-1.733,2.044-1.733,3.46c0,2.393,1.939,4.332,4.333,4.332c2.392,0,4.333-1.939,4.333-4.332C14.333,13.783,13.65,12.529,12.6,11.739 M10,18.665c-1.914,0-3.466-1.552-3.466-3.466c0-1.282,0.698-2.399,1.733-2.999V3.068c0-0.957,0.776-1.733,1.733-1.733s1.733,0.776,1.733,1.733V12.2c1.035,0.6,1.732,1.717,1.732,2.999C13.466,17.113,11.914,18.665,10,18.665"
                ></path>
              </svg>
              {main.temp}℃{" "}
            </h2>
          </div>
        </>
      )}
    </>
  );
};

export default Data;
