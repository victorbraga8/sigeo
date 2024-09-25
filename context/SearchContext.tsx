"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface SearchContextType {
  searchTerm: string;
  filteredData: any[];
  updateSearchTerm: (term: string) => void;
  updateFilteredData: (data: any[]) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const updateFilteredData = (data: any[]) => {
    setFilteredData(data);
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm, filteredData, updateSearchTerm, updateFilteredData }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de um SearchProvider");
  }
  return context;
};
