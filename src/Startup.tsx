import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./Components/Custom/public_route/PublicRoute.index";
import PrivateRoute from "./Components/Custom/private_route/PrivateRoute.index";
import NotFound from "./Components/Basic/not_found/NotFound.index";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./Config/routes";
import FullPageLoader from "./Components/Basic/full_page_loader/FullPageLoader.index";
import NotLicensedIndex from "./Components/Basic/not_licensed/NotLicensed.index";

const Startup = () => {
  return (
    <Routes>
      {PRIVATE_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PrivateRoute>
              {route?.layout !== undefined ? (
                <FullPageLoader>
                  <route.layout>
                    {" "}
                    <route.element />
                  </route.layout>
                </FullPageLoader>
              ) : (
                <FullPageLoader>
                  <route.element />
                </FullPageLoader>
              )}
            </PrivateRoute>
          }
        />
      ))}
      {PUBLIC_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PublicRoute>
              <FullPageLoader>
                <route.element />
              </FullPageLoader>
            </PublicRoute>
          }
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Startup;
