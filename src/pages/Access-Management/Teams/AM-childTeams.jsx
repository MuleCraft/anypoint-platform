import { useState } from "react";
import Nav from "../../../components/NavbarHome";
import Sidebar from "../../../components/sidebar";
import sections from "../utils/AM-sidebar";
import ChildTeams from "../../../components/AM-Component/AM-Teams/Childteams";


export default function AMChildTeams({ name }) {
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
                    <ChildTeams />
                </div>
            </div >
        </>
    );
}
