import { createContext, ReactNode, useContext, useState } from "react";

export type ItemProps = {
  id: number;
  imageUrl: string;
  title: string;
  types: object;
  sizes: object;
  price: number;
  category: number;
  rating: number;
};

interface SearchingContextProps {
  sortID: number;
  clickedCategory: number;
  setClickedCategory: React.Dispatch<React.SetStateAction<number>>;
  setSortID: React.Dispatch<React.SetStateAction<number>>;
  searchedValue: string;
  setSearchedValue: React.Dispatch<React.SetStateAction<string>>;

  // items: ItemProps[];
  // setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>;
  // isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SearchingProviderProps {
  children: ReactNode;
}
const SearchingContext = createContext<SearchingContextProps>(
  {} as SearchingContextProps
);

export const useSearching = (): SearchingContextProps => {
  return useContext(SearchingContext);
};

export function SearchingProvider({ children }: SearchingProviderProps) {
  const [clickedCategory, setClickedCategory] = useState<number>(0);
  const [sortID, setSortID] = useState<number>(0);
  const [searchedValue, setSearchedValue] = useState<string>('')
  // const [items, setItems] = useState<ItemProps[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  return (
    <SearchingContext.Provider
      value={{
        clickedCategory,
        setClickedCategory,
        sortID,
        setSortID,
        searchedValue,
        setSearchedValue,
        // items,
        // setItems,
        // isLoading,
        // setIsLoading,
      }}
    >
      {children}
    </SearchingContext.Provider>
  );
}
