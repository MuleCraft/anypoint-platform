import { useContext, useState } from "react";
import Nav from "../../../components/NavbarHome";
import Sidebar from "../../../components/sidebar";
import sections from "../utils/AM-sidebar";
import ChildTeams from "../../../components/AM-Component/AM-Teams/Childteams";
import {
    Box,
    Flex, Link,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
} from "@chakra-ui/react";
import CreateTeams from "../../../components/AM-Component/AM-Teams/CreateTeams";
import TeamsTable from "../../../components/AM-Component/AM-Teams/TeamsTable";
import EmptyRows from "../../../components/AM-Component/EmptyRows";
import fetchTeamsTableRows from "../../../Utils/TeamsTableRows";
import { AuthContext } from "../../../Utils/AuthProvider";
import { FiSearch } from "react-icons/fi";
export default function AMChildTeams({ name }) {
    const { userData } = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState('teams');
    const [teamsTableData, setTeamsTableData] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [currentOrganization, setCurrentOrganization] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const fetchRows = async () => {
        const tableRowData = await fetchTeamsTableRows(currentOrganization);
        setTeamsTableData(tableRowData);

    }
    if (userData && (teamsTableData.length === 0)) {
        fetchRows();
    }

    const filteredTableData = teamsTableData.filter((data) =>
        data.teamname.toLowerCase().includes(filterValue.toLowerCase())
    );


    if (userData && (currentUserName === '')) {
        setCurrentUserEmail(userData.email);
        setCurrentUserName(userData.display_name);
        setCurrentOrganization(userData.organizationId);
    }
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

