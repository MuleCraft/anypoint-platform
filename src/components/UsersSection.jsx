import { Button, Container, HStack, Input, InputGroup, InputLeftElement, Checkbox, VStack,Text, InputRightElement } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Menu,MenuButton,MenuList,MenuItem } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';
import { FiSearch } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";

export default function UsersSection(){

    const tabSelectedStyle = {borderBottom:'4px solid #0077d4',fontWeight:700,color:'#0077d4'};
    const checkboxTextStyle = {fontSize:'14px',fontWeight:500};

    return(
        <Container p={0}>
            <Tabs>
            <TabList>
                <Tab fontSize='14px' fontWeight={500} _selected={tabSelectedStyle}>Users</Tab>
                <Tab fontSize='14px' fontWeight={500} _selected={tabSelectedStyle}>Pending invitations</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <HStack w={'700px'} display={'flex'} justifyContent={'space-between'} mb={'15px'}>
                        <Button bgColor={'#0077d4'} color={'white'} fontSize={'14px'} p={'0px 15px'} 
                            w={'109px'} minH={'40px'} _hover={{bgColor:'#0a5dac'}}>
                                Invite Users</Button>
                        <HStack>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <FiSearch color='grey' />
                            </InputLeftElement>
                            <Input variant='text' placeholder="Filter users" w={'200px'} fontSize={'14px'} fontWeight={500} >
                            </Input>
                        </InputGroup>
                        <InputGroup>
                        <Input variant='text' placeholder="Columns (5/10)" fontSize={'14px'} fontWeight={500} w={'200px'} p={'0px 15px'}></Input>
                            <InputRightElement>
                        <Menu>
                        <MenuButton
                            as={Button}
                            rounded={"full"}
                            variant={"link"}
                            cursor={"pointer"}
                            minW={0}
                            _hover={{ bg: "#e5e5e5" }}
                            borderRadius="40px"
                            px="10px"
                            py="10px"
                            fontSize="base"
                            color="navText"
                        >
                            <SlArrowDown size="15px" />
                        </MenuButton>
                        <MenuList alignItems={"center"} p={'15px'} mt="1">
                            <HStack spacing={2} mb={'10px'}>
                                <Button variant={'outline'} fontSize={'14px'} color={'grey'} _hover={{bgColor:'#444',color:'white'}}>Select All</Button>
                                <Button variant={'outline'} fontSize={'14px'} color={'grey'} _hover={{bgColor:'#444',color:'white'}}>Clear Selection</Button>
                            </HStack>
                            <VStack fontSize="xs" maxW="250px">
                            <MenuItem
                                border="1px soild #fff"
                                padding="2px"
                                borderRadius="4px"
                                _hover={{ bg: "#e5e5e5" }}
                            >
                                <Checkbox defaultChecked size={'lg'} mr={'10px'}></Checkbox>
                                <Text sx={checkboxTextStyle}>Name</Text>
                            </MenuItem>
                            <MenuItem
                                border="1px soild #fff"
                                padding="2px"
                                borderRadius="4px"
                                _hover={{ bg: "#e5e5e5" }}
                            >
                                <Checkbox defaultChecked size={'lg'} mr={'10px'}></Checkbox>
                                <Text sx={checkboxTextStyle}>Username</Text>
                            </MenuItem>
                            <MenuItem
                                border="1px soild #fff"
                                padding="2px"
                                borderRadius="4px"
                                _hover={{ bg: "#e5e5e5" }}
                            >
                                <Checkbox defaultChecked size={'lg'} mr={'10px'}></Checkbox>
                                <Text sx={checkboxTextStyle}>Email</Text>
                            </MenuItem>
                            <MenuItem
                                border="1px soild #fff"
                                padding="2px"
                                borderRadius="4px"
                                _hover={{ bg: "#e5e5e5" }}
                            >
                                <Checkbox defaultChecked size={'lg'} mr={'10px'}></Checkbox>
                                <Text sx={checkboxTextStyle}>Email verified date</Text>
                            </MenuItem>
                            <MenuItem
                                border="1px soild #fff"
                                padding="2px"
                                borderRadius="4px"
                                _hover={{ bg: "#e5e5e5" }}
                            >
                                <Checkbox defaultChecked size={'lg'} mr={'10px'}></Checkbox>
                                <Text sx={checkboxTextStyle}>Identity provider</Text>
                            </MenuItem>
                            <MenuItem
                                border="1px soild #fff"
                                padding="2px"
                                borderRadius="4px"
                                _hover={{ bg: "#e5e5e5" }}
                            >
                                <Checkbox defaultChecked size={'lg'} mr={'10px'}></Checkbox>
                                <Text sx={checkboxTextStyle}>Multi-factor auth</Text>
                            </MenuItem>
                            <MenuItem
                                border="1px soild #fff"
                                padding="2px"
                                borderRadius="4px"
                                _hover={{ bg: "#e5e5e5" }}
                            >
                                <Checkbox defaultChecked size={'lg'} mr={'10px'}></Checkbox>
                                <Text sx={checkboxTextStyle}>Created date</Text>
                            </MenuItem>
                            <MenuItem
                                border="1px soild #fff"
                                padding="2px"
                                borderRadius="4px"
                                _hover={{ bg: "#e5e5e5" }}
                            >
                                <Checkbox defaultChecked size={'lg'} mr={'10px'}></Checkbox>
                                <Text sx={checkboxTextStyle}>Last modified date</Text>
                            </MenuItem>
                            <MenuItem
                                border="1px soild #fff"
                                padding="2px"
                                borderRadius="4px"
                                _hover={{ bg: "#e5e5e5" }}
                            >
                                <Checkbox defaultChecked size={'lg'} mr={'10px'}></Checkbox>
                                <Text sx={checkboxTextStyle}>Last login date</Text>
                            </MenuItem>
                            <MenuItem
                                border="1px soild #fff"
                                padding="2px"
                                borderRadius="4px"
                                _hover={{ bg: "#e5e5e5" }}
                            >
                                <Checkbox defaultChecked size={'lg'} mr={'10px'}></Checkbox>
                                <Text sx={checkboxTextStyle}>Status</Text>
                            </MenuItem>
                            </VStack>
                        </MenuList>
                        </Menu>
                        </InputRightElement>
                        </InputGroup>
                        </HStack>
                    </HStack>
                    <HStack>
                    <TableContainer>
                        <Table size='sm'>
                            <Thead>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td>
                            </Tr>
                            </Tbody>
                            <Tfoot>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                            </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                    </HStack>
                </TabPanel>
                <TabPanel>
                <p>two!</p>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Container>
    )
}