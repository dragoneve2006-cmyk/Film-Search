import {QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {AppRouter} from "./router/AppRouter";
import CustomCursor from "./components/CustomCursor";
import './App.css'



//Configuring React Query Client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000,
        },
    },
});

function App() {
    return(
        <QueryClientProvider client={queryClient}>
            <CustomCursor />
            <AppRouter />
        </QueryClientProvider>
    );
}

export default App;
