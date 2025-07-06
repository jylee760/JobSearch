import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [jobType, setJobType] = useState(null);
  const [location, setLocation] = useState("");
  const [searchField, setSearchField] = useState("");
  const [distanceFilter, setDistanceFilter] = useState(5);
  const [currentItem, setCurrentItem] = useState(null);
  const [timeEst, setTimeEst] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AppContext.Provider
      value={{
        jobType,
        setJobType,
        location,
        setLocation,
        searchField,
        setSearchField,
        distanceFilter,
        setDistanceFilter,
        currentItem,
        setCurrentItem,
        timeEst,
        setTimeEst,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
