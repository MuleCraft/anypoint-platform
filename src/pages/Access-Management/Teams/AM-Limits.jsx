import { useState } from "react";
import Nav from "../../../components/NavbarHome";
import Sidebar from "../../../components/sidebar";
import sections from "../utils/AM-sidebar";
import TeamLimits from "../../../components/AM-Component/AM-Teams/TeamsLimit";


export default function AMTeamsLimits({ name }) {
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
                        activeItem={activeItem}
                        onItemSelect={handleItemSelect}
                    />
                    <TeamLimits />
                </div>
            </div >
        </>
    );
}
