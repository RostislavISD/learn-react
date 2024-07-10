import { createContext } from 'react';

type ContextParams = { name: string; phone: string; };

export const UserContext = createContext<ContextParams>(
    {
        name: '', 
        phone: '',
    }
);


