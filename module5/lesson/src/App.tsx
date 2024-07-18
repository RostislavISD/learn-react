import { useEffect, useState } from 'react'
import './App.css'
import { RouterContext } from "./contexts";
import { UserContext } from './contexts/UserContext';
import { ROUTES } from "./Routes";
import { BaseLayout } from './ui/BaseLayout/BaseLayout';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  const [user, setUser] = useState<{name: string; phone: string}>({ name: '', phone: ''});
  const [currentRoute = '', setCurrentRoute] = useState(
    ROUTES.find(route => location.pathname.includes(route.path))?.id,
  );

  useEffect(() => {
    const [name, phone] = [localStorage.getItem('username'), localStorage.getItem('phone')];

    if (name && phone) {
      setUser({
        name,
        phone,
      });  
    }
  }, []);

  return (
    <RouterContext.Provider value={{ currentRoute, setCurrentRoute }}>
      <UserContext.Provider value={{ name: user?.name || '', phone: user?.phone || '' }}>
        <QueryClientProvider client={queryClient}>
            <BaseLayout />
        </QueryClientProvider>
      </UserContext.Provider>
    </RouterContext.Provider>
  )
}

export default App
