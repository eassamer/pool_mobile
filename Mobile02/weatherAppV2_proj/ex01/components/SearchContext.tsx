import React, { createContext, useState } from "react";

export const SearchContext = createContext({
  searchValue: "",
  setSearchValue: (value: string) => {},
  coordination: { latitude: 0, longitude: 0 },
  setCoordination: (value: { latitude: number; longitude: number }) => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchValue, setSearchValue] = useState("");
  const [coordination, setCoordination] = useState({
    latitude: 0,
    longitude: 0,
  });
  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        coordination,
        setCoordination,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
