import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./Router";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div>
      여행조각
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </div>
  );
}

export default App;
