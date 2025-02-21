import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "../App";

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-wg30jekgae6ys6sy.us.auth0.com"
    clientId="Em9G9IKfIyprnmNqh6mTmeTfcvaOJ9mZ"
    authorizationParams={{
        redirect_uri: window.location.origin
    }}
  >
    <App />
</Auth0Provider>,
);
