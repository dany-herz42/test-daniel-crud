import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

interface PropTypes {
  children: React.ReactNode;
  enableBack?: boolean;
}
const AuthLayout: React.FC<PropTypes> = ({ children, enableBack }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <AppBar>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse" }}>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogOut}>
            Cerrar sesion
          </Button>
          {enableBack && <Button color="inherit" onClick={() => navigate(-1)}>Regresar</Button>}
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default AuthLayout;
