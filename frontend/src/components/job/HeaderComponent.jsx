import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AppContext } from "./AppContext";
export default function HeaderComponent() {
  const profileRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { searchField, location, setLocation, setSearchField, setCurrentItem } =
    useContext(AppContext);
  const [validInput, setValidInput] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    function outsideClick(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", outsideClick);
    return () => {
      document.removeEventListener("click", outsideClick);
    };
  });
  function reset() {
    setCurrentItem(null);
  }
  function toggleDrop() {
    setOpen(!open);
  }
  function onSubmit(values) {
    reset();
    const zipRegex = /^\d{5}$/;
    let valid = true;
    if (!zipRegex.test(values.location)) {
      valid = false;
    }
    if (valid) {
      setSearchField(values.search);
      setLocation(values.location);
      navigate(
        `/search/jobs?location=${values.location}&jobtitle=${values.search}`
      );
    } else {
      navigate("/");
    }
    setValidInput(valid);
  }
  return (
    <header className="border-bottom border-light border-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to="/">
              Job Finder
            </Link>
            <div className="collapse navbar-collapse"></div>
            <ul className="navbar-nav">
              <div>
                <Formik
                  initialValues={{ searchField, location }}
                  enabileReinitialize={true}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={onSubmit}
                >
                  {(props) => (
                    <Form className="search-box">
                      <fieldset>
                        <Field
                          type="text"
                          className="search-text"
                          placeholder="Enter job title"
                          name="search"
                        />
                      </fieldset>
                      <fieldset>
                        <Field
                          type="text"
                          className="search-text"
                          placeholder="Enter a 5 digit zipcode"
                          name="location"
                        />
                      </fieldset>
                      <button type="submit">Search</button>
                    </Form>
                  )}
                </Formik>
                {!validInput && (
                  <div
                    style={{ display: "inline" }}
                    className="invalid-feedback"
                  >
                    Please enter a valid 5-digit zipcode.
                  </div>
                )}
              </div>
              <div ref={profileRef} className="dropdown-c">
                <li className="nav-item fs-5">
                  <a className="nav-link clickable" onClick={toggleDrop}>
                    Profile
                  </a>
                </li>
                {open && (
                  <ul className="dropdown-m">
                    <li>
                      {
                        <Link
                          className="dropdown-i"
                          to="/saved"
                          onClick={reset}
                        >
                          Saved
                        </Link>
                      }
                    </li>
                    <li>
                      {
                        <Link className="dropdown-i" to="/logout" onClick={reset}>
                          Logout
                        </Link>
                      }
                    </li>
                  </ul>
                )}
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
