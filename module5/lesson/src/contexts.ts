import { createContext } from 'react';
import { ROUTES } from "./Routes";

type ContextParams = { currentRoute: string; setCurrentRoute: (a: string) => void};

export const RouterContext = createContext<ContextParams>({
    currentRoute: ROUTES[0]?.id, 
    setCurrentRoute: () => {},
});
