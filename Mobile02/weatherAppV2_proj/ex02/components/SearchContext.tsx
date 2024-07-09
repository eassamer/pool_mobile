import React, { createContext, useState } from "react";

interface citySelectedInterface {
  name: string;
  admin1: string;
  country: string;
}
export const SearchContext = createContext({
  searchValue: "",
  setSearchValue: (value: string) => {},
  coordination: { latitude: 0, longitude: 0 },
  setCoordination: (value: { latitude: number; longitude: number }) => {},
  citySelected: {
    name: "",
    admin1: "",
    country: "",
  },
  setCitySelected: (value: citySelectedInterface) => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchValue, setSearchValue] = useState("");
  const [coordination, setCoordination] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [citySelected, setCitySelected] = useState<citySelectedInterface>({
    name: "",
    admin1: "",
    country: "",
  });
  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        coordination,
        setCoordination,
        citySelected,
        setCitySelected,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
