"use client";
import { createContext, useState, useContext, ReactNode } from "react";

// Definir a interface para o valor do contexto
interface SearchContextType {
  searchTerm: string;
  filteredData: any[]; // Se souber o tipo exato, substitua 'any' pelo tipo correto
  updateSearchTerm: (term: string) => void;
  updateFilteredData: (data: any[]) => void; // Novamente, se souber o tipo, substitua 'any[]'
}

// Criar o contexto com um valor inicial do tipo SearchContextType ou null
const SearchContext = createContext<SearchContextType | null>(null);

// Tipar as props do SearchProvider
interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]); // Novamente, use o tipo correto se conhecido

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

// Hook para acessar o contexto
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de um SearchProvider");
  }
  return context;
};
