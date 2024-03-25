import { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Input,
    Box,
    Flex,
} from '@chakra-ui/react';
import BusinessGroupMenu from './BusinessGroupMenu';

const BusinessGroupTable = () => {
    const [filter, setFilter] = useState('');
    const groupDetails = [
        { name: 'inches', environments: 'millimetres (mm)', totalvCores: 25.4 },
        { name: 'feet', environments: 'centimetres (cm)', totalvCores: 30.48 },
        { name: 'yards', environments: 'metres (m)', totalvCores: 0.91444 },
    ];

    const columnTitleStyle = { fontSize:14, color: '#444444', fontWeight:800, textTransform:'capitalize', padding:'10px' };
    const rowValueStyle = { fontSize:14, padding:'10px' };

    // const filteredGroup = groupDetails.filter(conversion =>
    //     conversion.from.toLowerCase().includes(filter.toLowerCase())
    // );

    return (
            <TableContainer>
                <Table variant="simple" size="md" >
                    <Thead borderBottomWidth="3px">
                        <Tr>
                            <Th style={columnTitleStyle}>Name</Th>
                            <Th style={columnTitleStyle} w={'150px'}>Environments</Th>
                            <Th style={columnTitleStyle} w={'120px'}>Total vCores</Th>
                            <Th style={columnTitleStyle} w={'80px'}></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {groupDetails.map((conversion, index) => (
                            <Tr key={index}>
                                <Td style={rowValueStyle}>{conversion.name}</Td>
                                <Td style={rowValueStyle}>{conversion.environments}</Td>
                                <Td style={rowValueStyle}>{conversion.totalvCores}</Td>
                                <Td style={rowValueStyle}><BusinessGroupMenu/></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
    );
};

export default BusinessGroupTable;
