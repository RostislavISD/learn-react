import "./styles.css";
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";
import { CardList } from "./components/cardList/CardList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
          <main>
            <CardList />            
          </main>
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default App;
