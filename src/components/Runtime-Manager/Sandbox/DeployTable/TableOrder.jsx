import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Flex, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Box } from '@chakra-ui/react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { FaCircle } from "react-icons/fa6";
import { IoMdCloudOutline } from "react-icons/io";
import { IoArrowRedo } from "react-icons/io5";
const TableOrder = ({ data }) => {
    const defaultSortField = 'Name';
    const defaultHeaderBorderWidth = 5;
    const defaultHeaderBorderColor = '#6b8a99';

    const [sortField, setSortField] = useState(defaultSortField);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedHeader, setSelectedHeader] = useState(defaultSortField);
    const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortField && sortOrder === 'asc') {
            return a[sortField] > b[sortField] ? 1 : -1;
        } else if (sortField && sortOrder === 'desc') {
            return a[sortField] < b[sortField] ? 1 : -1;
        } else {
            return 0;
        }
    });

    const handleSort = (field) => {
        setSortField(field);
        toggleSortOrder();
        setSelectedHeader(field);
    };

    const headers = [
        'Name',
        'Target Name',
        'Target Type',
        'Status',
        'Runtime Version',
        'Update Available',
        'Date Modified',
    ];

    const columnTitleStyle = {
        fontSize: 14,
        color: '#444444',
        fontWeight: 800,
        textTransform: 'capitalize',
    };

    const rowValueStyle = { fontSize: 14 };
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <Box>
            <Box style={{ marginRight: isDrawerOpen ? '400px' : 0 }}>
                <Table>
                    <Thead>
                        <Tr>
                            {headers.map(header => (
                                <Th
                                    key={header}
                                    onClick={() => handleSort(header)}
                                    borderBottomWidth={selectedHeader === header ? defaultHeaderBorderWidth : 1}
                                    borderColor={selectedHeader === header ? defaultHeaderBorderColor : 'inherit'}
                                    style={{ ...columnTitleStyle, borderBottomWidth: 3 }}
                                >
                                    <Flex alignItems="center" gap={3}>
                                        {header}{' '}
                                        {sortField === header && (
                                            <>
                                                {sortOrder === 'asc' ? (
                                                    <IoIosArrowUp />
                                                ) : (
                                                    <IoIosArrowDown />
                                                )}
                                            </>
                                        )}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sortedData.map((item) => (
                            <Tr key={item.id} onClick={toggleDrawer}>
                                <Td style={rowValueStyle} _hover={{ color: "boxColor" }}
                                    onMouseEnter={() => setHoveredRow(item)}
                                    onMouseLeave={() => setHoveredRow(null)}><NavLink to={`/accounts/users/`}>
                                        <NavLink to={`/accounts/users/`}>
                                            <Flex gap={2} align="center">
                                                {item.Name}
                                                {hoveredRow === item && <IoArrowRedo />}
                                            </Flex>
                                        </NavLink>
                                    </NavLink></Td>
                                <Td style={rowValueStyle}><Flex gap={2} align="center"><IoMdCloudOutline style={{ height: 25 }} />{item.TargetName}</Flex></Td>
                                <Td style={rowValueStyle}>{item.TargetType}</Td>
                                <Td style={rowValueStyle} textColor="#18bc65"><Flex gap={2} align="center"><FaCircle color='#18bc65' />{item.Status}</Flex></Td>
                                <Td style={rowValueStyle}>{item.RuntimeVersion}</Td>
                                <Td style={rowValueStyle}>{item.UpdateAvailable}</Td>
                                <Td style={rowValueStyle}>{item.DateModified}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            <Box>hello</Box>
        </Box>
    );
};

export default TableOrder;
