import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@hoqs/routes';
import { Provider } from "@hoqs/core-components";
import { AuthProvider, messages } from "@hoqs-features";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider messages={messages}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
);
