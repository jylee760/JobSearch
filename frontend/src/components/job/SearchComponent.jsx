import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AppContext } from "./AppContext";
import MainComponent from "./MainComponent";
export default function SearchComponent() {
  const jobRef = useRef(null);
  const distRef = useRef(null);
  const {
    jobType,
    setJobType,
    location,
    setLocation,
    searchField,
    setSearchField,
    distanceFilter,
    setDistanceFilter,
  } = useContext(AppContext);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [jobOpen, setJobOpen] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  useEffect(() => {
    setLocation(query.get("location") || "");
    setSearchField(query.get("jobtitle") || "");
  }, []);
  useEffect(() => {
    function outsideClick(event) {
      if (jobRef.current && !jobRef.current.contains(event.target)) {
        setJobOpen(false);
      }
      if (distRef.current && !distRef.current.contains(event.target)) {
        setDistanceOpen(false);
      }
    }
    document.addEventListener("click", outsideClick);
    return () => {
      document.removeEventListener("click", outsideClick);
    };
  });

  /*useEffect(()=>{
        async function fetchData(){
            console.log(`${fulltime},${parttime},${contract},${permanent},${location},${searchField},${distanceFilter}`)

        }
        fetchData()
    },[fulltime,parttime,contract,permanent,location,searchField,distanceFilter])*/
  function setDistance(val) {
    setDistanceFilter(val);
    setDistanceOpen(false);
  }
  function toggle(setFunction, prev) {
    setFunction(!prev);
  }
  function setJob(val) {
    if (jobType === val) {
      setJobType(null);
    } else {
      setJobType(val);
    }
    setJobOpen(false);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <nav className="navbar" style={{ justifyContent: "flex-start" }}>
            <div className="fs-6 text-black navbar-brand">Filters:</div>
            <div ref={distRef} className="dropdown-c inc-d">
              <a
                className="nav-link clickable fs-6"
                onClick={() => toggle(setDistanceOpen, distanceOpen)}
              >
                Distance (KM)
              </a>
              {distanceOpen && (
                <ul className="dropdown-m">
                  <li
                    className={`fs-6 clickable ${
                      distanceFilter === 5 ? "selected" : ""
                    }`}
                    onClick={() => setDistance(5)}
                  >
                    5
                  </li>
                  <li
                    className={`fs-6 clickable ${
                      distanceFilter === 10 ? "selected" : ""
                    }`}
                    onClick={() => setDistance(10)}
                  >
                    10
                  </li>
                  <li
                    className={`fs-6 clickable ${
                      distanceFilter === 20 ? "selected" : ""
                    }`}
                    onClick={() => setDistance(20)}
                  >
                    20
                  </li>
                  <li
                    className={`fs-6 clickable ${
                      distanceFilter === 50 ? "selected" : ""
                    }`}
                    onClick={() => setDistance(50)}
                  >
                    50
                  </li>
                  <li
                    className={`fs-6 clickable ${
                      distanceFilter === -1 ? "selected" : ""
                    }`}
                    onClick={() => setDistance(-1)}
                  >
                    51+
                  </li>
                </ul>
              )}
            </div>
            <div ref={jobRef} className="dropdown-c">
              <a
                className="nav-link clickable fs-6"
                onClick={() => toggle(setJobOpen, jobOpen)}
              >
                Job Type
              </a>
              {jobOpen && (
                <ul className="dropdown-m">
                  <li
                    className={`fs-6 clickable ${
                      jobType === "full_time" ? "selected" : ""
                    }`}
                    onClick={() => setJob("full_time")}
                  >
                    Full Time
                  </li>
                  <li
                    className={`fs-6 clickable ${
                      jobType === "part_time" ? "selected" : ""
                    }`}
                    onClick={() => setJob("part_time")}
                  >
                    Part Time
                  </li>
                  <li
                    className={`fs-6 clickable ${
                      jobType === "contract" ? "selected" : ""
                    }`}
                    onClick={() => setJob("contract")}
                  >
                    Contract
                  </li>
                  <li
                    className={`fs-6 clickable ${
                      jobType === "permanent" ? "selected" : ""
                    }`}
                    onClick={() => setJob("permanent")}
                  >
                    Permanent
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </div>
      <MainComponent />
    </>
  );
}
