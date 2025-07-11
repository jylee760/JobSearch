import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent.jsx";
import HomeComponent from "./HomeComponent.jsx";
import SearchComponent from "./SearchComponent.jsx";
import SavedComponent from "./SavedComponent.jsx";
import LoginComponent from "./LoginComponent.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { AppProvider } from "./AppContext.jsx";
import RegisterComponent from "./RegisterComponent.jsx"
import LogoutComponent from "./LogoutComponent.jsx"
export default function JobApp() {
  return (
    <div>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/logout" element={<LogoutComponent/>}/>
            <Route path="/home" element={<PrivateRoute><HeaderComponent /><HomeComponent /></PrivateRoute>} />
            <Route path="/search/jobs" element={<PrivateRoute><HeaderComponent /><SearchComponent /></PrivateRoute>} />
            <Route path="/saved" element={<PrivateRoute><HeaderComponent /><SavedComponent /></PrivateRoute>} />
            <Route path="*" element={<ErrorComponent/>} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}
