import React from "react";
import GoogleMap from "./components/GoogleMap";
import { CustomAppBar } from "./components/appBar/CustomAppBar"
import './App.css';
import {MenuLateral} from "./components/menuLateral/MenuLateral";

function App() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className="App">
            <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
            <MenuLateral open={open} handleDrawerClose={handleDrawerClose} />
            <GoogleMap />
        </div>
    );
}

export default App;