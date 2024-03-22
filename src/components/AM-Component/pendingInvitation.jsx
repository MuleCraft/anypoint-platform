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

const ConversionTable = () => {
    const [filter, setFilter] = useState('');
    const conversions = [
        { from: 'inches', to: 'millimetres (mm)', multiplier: 25.4 },
        { from: 'feet', to: 'centimetres (cm)', multiplier: 30.48 },
        { from: 'yards', to: 'metres (m)', multiplier: 0.91444 },
    ];

    const filteredConversions = conversions.filter(conversion =>
        conversion.from.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <Box ><Flex>
            <Input
                placeholder="Filter by 'To convert'..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                my={4}
            />
        </Flex>
            <TableContainer>
                <Table variant="simple" size="md" >
                    <Thead borderBottomWidth="3px">
                        <Tr>
                            <Th>Email</Th>
                            <Th>Send</Th>
                            <Th>Expires</Th>
                            <Th>Teams</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredConversions.map((conversion, index) => (
                            <Tr key={index}>
                                <Td >{conversion.from}</Td>
                                <Td>{conversion.to}</Td>
                                <Td >{conversion.multiplier}</Td>
                                <Td >{conversion.multiplier}</Td>
                            </Tr>
                        ))}
                    </Tbody>

                </Table>
            </TableContainer>
        </Box >
    );
};

export default ConversionTable;
