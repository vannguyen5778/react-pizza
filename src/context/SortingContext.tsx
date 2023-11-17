import { createContext, ReactNode, useContext, useState } from "react";

interface SortingContextProps {
    sortID: number;
    clickedCategory: number;
    setClickedCategory: React.Dispatch<React.SetStateAction<number>>;
    setSortID: React.Dispatch<React.SetStateAction<number>>;
}

interface SortingProviderProps {
    children: ReactNode;
}
const SortingContext = createContext<SortingContextProps>({} as SortingContextProps);

export const useSorting = (): SortingContextProps => {
    return useContext(SortingContext);
}

export function SortingProvider({ children }: SortingProviderProps) {
  const [clickedCategory, setClickedCategory] = useState<number>(0);
  const [sortID, setSortID] = useState<number>(0);
  return(
      <SortingContext.Provider
        value={{ clickedCategory, setClickedCategory, sortID, setSortID }}
      >
        {children}
      </SortingContext.Provider>
  )
}
