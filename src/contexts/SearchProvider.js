// src/contexts/SearchContext.js
import { createContext, useContext, useState } from "react";

const defaultContext = {
  filters: {
    destinationName: "",
    startDate: "",
    endDate: "",
  },
  setFilters: () => {},
};

const SearchContext = createContext(defaultContext);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    destinationName: "",
    startDate: "",
    endDate: "",
  });

  return (
    <SearchContext.Provider value={{ filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
};
