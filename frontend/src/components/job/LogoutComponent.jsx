import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
const LogoutComponent = () =>{
    const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); 
    navigate("/login");
  }, [navigate]);

  return null;
}

export default LogoutComponent