import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";

const Home = lazy(() => import("./pages/Home"));
const List = lazy(() => import("./pages/List"));
const Trash = lazy(() => import("./pages/Trash"));
const Loading = lazy(() => import("./pages/Loading"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/:id"
            element={
              <Suspense fallback={<Loading />}>
                <List />
              </Suspense>
            }
          />
          <Route
            path="/trash"
            element={
              <Suspense fallback={<Loading />}>
                <Trash />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
