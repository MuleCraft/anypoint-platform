import { useState } from "react";
import Nav from "../../components/NavbarHome";
import Sidebar from "../../components/sidebar";
import sections from "../utils/AM-sidebar";


export default function AMBusinessGroup({ name, pathValue }) {
    const [activeItem, setActiveItem] = useState('BusinessGroups');


    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };
    return (
        <>
            <div className="home">

                <Nav name={name} pathValue={pathValue} />
                <div className="Wrapper">
                    <Sidebar
                        sections={sections}
                        activeItem={activeItem}
                        onItemSelect={handleItemSelect}
                    />
                </div>
            </div>
        </>
    );
}
