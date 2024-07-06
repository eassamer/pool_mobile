import React, { createContext, useState } from "react";

export const SearchContext = createContext({
  searchValue: "",
  setSearchValue: (value: string) => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
