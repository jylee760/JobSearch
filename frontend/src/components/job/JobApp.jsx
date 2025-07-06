import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent.jsx";
import HomeComponent from "./HomeComponent.jsx";
import SearchComponent from "./SearchComponent.jsx";
import SavedComponent from "./SavedComponent.jsx";
import LoginComponent from "./LoginComponent.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
import { AppProvider } from "./AppContext.jsx";
export default function JobApp() {
  return (
    <div>
      <AppProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/home/:username" element={<HomeComponent />} />
            <Route path="/search/jobs" element={<SearchComponent />} />
            <Route path="/saved" element={<SavedComponent />} />
            <Route path="*" element={ErrorComponent} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}
