import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Calendar from "./components/Calendar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static" sx={{ background: "rgb(70, 66, 66)" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ERP System
            </Typography>
            <Box
              sx={{
                mr: 8,
                display: "flex",
                justifyContent: "space-evenly",
                gap: 5,
              }}
            >
              <Button
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                color="inherit"
                component={Link}
                to="/"
              >
                Dashboard
              </Button>
              <Button
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                color="inherit"
                component={Link}
                to="/products"
              >
                Products
              </Button>
              <Button
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                color="inherit"
                component={Link}
                to="/orders"
              >
                Orders
              </Button>
              <Button
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                color="inherit"
                component={Link}
                to="/calendar"
              >
                Calendar
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
