import { useState } from "react";
import Nav from "../../components/NavbarHome";
import Sidebar from "../../components/sidebar";
import sections from "../utils/AM-sidebar";

export default function AMTeams({ name }) {
    const [activeItem, setActiveItem] = useState('teams');


    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };
    return (
        <>
            <div className="home">

                <Nav name={name} />
                <div className="Wrapper">
                    <Sidebar
                        sections={sections}
                        activeItem={activeItem} // The name of the currently active item
                        onItemSelect={handleItemSelect} // Function to handle item selection
                    />
                </div>
            </div>
        </>
    );
}
