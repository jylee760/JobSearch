import { Map, getZipCode } from "./mapapi/MapApiService";
import { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AppContext } from "./AppContext";
import { retrieveJobs } from "./adzunzaapi/AdzunzaApiService";
import Item from "./ItemComponent";
export default function MainComponent() {
  const {
    jobType,
    isLoading,
    location,
    searchField,
    distanceFilter,
    currentItem,
    setCurrentItem,
    setTimeEst,
    timeEst,
  } = useContext(AppContext);
  const [allowMap, setAllowMap] = useState(false);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [collection, setCollection] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setCollection(null);
      setTimeEst(null);
      changeTopBox(null);
      changeBottomBox(null);
      if (location !== "") {
        let distance = distanceFilter;
        if (distanceFilter === -1) distance = 10000;
        console.log(`${jobType},${location},${searchField},${distance}`);
        const collection = await retrieveJobs(
          jobType,
          location,
          searchField,
          distance,
          timeEst
        );
        setCollection(collection.results);
      }
    }
    fetchData();
  }, [jobType, location, searchField, distanceFilter]);

  function changeTopBox(item) {
    console.log("changing");
    const topBox = document.querySelector(".topbox");
    setCurrentItem(item);
    if (item === null) {
      topBox.innerHTML = "";
    } else {
      let html = "";
      if (timeEst !== null) {
        html = `
        <h5>${item.title}</h5>
        <h6>${item.company.display_name}</h6>
        <h6>${item.location.area[3]}, ${item.location.area[1]}</h6>
        <h6>Salary:${item.salary_min}-${item.salary_max}</h6>
        <h6>Est. travel time: ${timeEst.text}</h6>
        <button class="apply-button"><a href=${item.redirect_url}>Apply</a></button>
        `;
      } else {
        html = `
        <h5>${item.title}</h5>
        <h6>${item.company.display_name}</h6>
        <h6>${item.location.area[3]}, ${item.location.area[1]}</h6>
        <h6>Salary:${item.salary_min}-${item.salary_max}</h6>
        <button class="apply-button"><a href=${item.redirect_url}>Apply</a></button>
        `;
      }
      topBox.innerHTML = html;
    }
  }
  function changeBottomBox(item) {
    const bottomBox = document.querySelector(".bottombox");
    if (item === null) {
      bottomBox.innerHTML = "";
    } else {
      const html = `
        <h5>Description</h5>
        <p class="job-description">${item.description}</p>
        `;
      bottomBox.innerHTML = html;
    }
  }
  function pos() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  async function getPosition() {
    const test = await pos();
    return test;
  }
  async function generateMapFromCurrent() {
    setAllowMap(true);
    const info = await getPosition();
    setLat(info.coords.latitude);
    setLong(info.coords.longitude);
  }
  return (
    <div className="main-body">
      <div className="main-content">
        <div className="top-content-container">
          <div className="topbox"></div>
          {allowMap && currentItem !== null ? (
            <Map
              latitude={lat}
              longitude={long}
              destLat={currentItem.latitude}
              destLong={currentItem.longitude}
            />
          ) : (
            collection?.length > 0 &&
            currentItem !== null && (
              <div id="map">
                <button className="map-button" onClick={generateMapFromCurrent}>
                  Generate map from current location
                </button>
              </div>
            )
          )}
        </div>
        <div className="bottombox"></div>
      </div>
      <div className="sidebar">
        {collection?.length > 0 ? (
          <Item
            collection={collection}
            changeTopBox={changeTopBox}
            changeBottomBox={changeBottomBox}
          />
        ) : (
          <p>no results found</p>
        )}
      </div>
    </div>
  );
}
