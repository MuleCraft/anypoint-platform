import {
    Menu, MenuButton, MenuList, MenuItem, IconButton, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody, useDisclosure, Button, VStack, Text, Select, Checkbox,
    Input, InputGroup, InputLeftElement, InputRightElement, HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, FormControl, FormLabel
} from "@chakra-ui/react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function BusinessGroupMenu({ onOpenCreateChildGroup, menuValue }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [sandboxSliderValue, setSandboxSliderValue] = useState(0);
    const [designSliderValue, setDesignSliderValue] = useState(0);


    const handleSandboxSliderChange = (value) => {
        setSandboxSliderValue(value);
    };

    const handleSandboxInputChange = (event) => {
        const inputValue = parseFloat(event.target.value);
        setSandboxSliderValue(inputValue);
    };

    const handleDesignSliderChange = (value) => {
        setDesignSliderValue(value);
    };

    const handleDesignInputChange = (event) => {
        const inputValue = parseFloat(event.target.value);
        setDesignSliderValue(inputValue);
    };


    const values = menuValue.filter(item => item.parentGroupID === '');

    console.log("values", values[0].businessGroupId)


    return (
        <>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<HiEllipsisHorizontal />}
                    variant='outline'
                    h={'28px'} color="gray.500"
                    border={'1px solid #5c5c5c'}
                />
                <MenuList p={'5px 0'} minW={'150px'} maxW={'240px'}>
                    <MenuItem fontSize={14} onClick={onOpenCreateChildGroup}>
                        Create child group
                    </MenuItem>
                    {values.parentGroupID === "" &&
                        <MenuItem fontSize={14} onClick={handleDeleteOpen} color={'red.600'}
                            _hover={{ color: 'white', bgColor: 'red.600' }}>
                            Delete business group...
                        </MenuItem>
                    }
                </MenuList>
            </Menu>
            {/* <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent minW={'350px'}>
                    <ModalHeader bg={'#f3f3f3'} fontSize={20} fontWeight={800} color={'#444444'}
                        borderTopRadius={15} borderBottom={'1px solid #e5e5e5'}>
                        Create business group
                    </ModalHeader>
                    <ModalBody p={'32px 32px'}>
                        <FormControl>
                            <VStack spacing={4}>
                                <VStack spacing={0} fontSize={14} align={'flex-start'}>
                                    <FormLabel fontWeight={500} fontSize={14} color={'#444444'}>Name</FormLabel>
                                    <Text color={'#747474'} fontWeight={500}>You can use alphanumeric characters, hyphens, and spaces.</Text>
                                    <Input placeholder='Business Group name' mt={1} fontSize={14} fontWeight={500} />
                                </VStack>
                                <VStack spacing={0} fontSize={14} align={'flex-start'}>
                                    <FormLabel fontWeight={500} color={'#444444'} fontSize={14}>Parent business group</FormLabel>
                                    <Text color={'#747474'} fontWeight={500}>Select a group you’re an administrator of to be the parent of this group.</Text>
                                    <Select variant={'filled'} bgColor={'#e5e5e5'} fontSize={14} disabled border={'1px solid #c9c9c9'} mt={1}>
                                        <option value='option1'>MC</option>
                                        <option value='option2'>MuleCraft</option>
                                        <option value='option3'>Google</option>
                                    </Select>
                                </VStack>
                                <VStack spacing={0} fontSize={14} align={'flex-start'} minW={'-webkit-fill-available'}>
                                    <FormLabel fontWeight={500} color={'#444444'} fontSize={14}>Owner</FormLabel>
                                    <InputGroup >
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<FiSearch />}
                                            color="gray.500"
                                        />
                                        <Input placeholder="Add owner by name, username, or email." fontSize={14} />
                                    </InputGroup>
                                    <Checkbox size='lg' mt={1} >Can create business groups</Checkbox>
                                    <Checkbox size='lg' mt={1} >Can create environments</Checkbox>
                                </VStack>
                                <VStack align={'flex-start'} minW={'-webkit-fill-available'}>
                                    <FormLabel fontWeight={500} color={'#444444'} fontSize={14}>Sandbox vCores</FormLabel>
                                    <HStack minW={'-webkit-fill-available'} spacing={6}>
                                        <InputGroup w={'200px'}>
                                            <InputRightElement
                                                pointerEvents="none"
                                                children={<Text fontSize={14}>/ 1</Text>}
                                                color="gray.500"
                                            />
                                            <Input
                                                type="number"
                                                value={sandboxSliderValue}
                                                min={0}
                                                max={1}
                                                step={0.1}
                                                onChange={handleSandboxInputChange}
                                                fontSize={14}
                                            />
                                        </InputGroup>
                                        <Slider
                                            aria-label="slider-ex-1"
                                            value={sandboxSliderValue}
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            onChange={handleSandboxSliderChange}
                                        >
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb boxSize={5} bgColor={'#006dec'} />
                                        </Slider>
                                    </HStack>
                                    <FormLabel fontWeight={500} color={'#444444'} fontSize={14}>Design vCores</FormLabel>
                                    <HStack minW={'-webkit-fill-available'} spacing={6}>
                                        <InputGroup w={'200px'}>
                                            <InputRightElement
                                                pointerEvents="none"
                                                children={<Text fontSize={14}>/ 1</Text>}
                                                color="gray.500"
                                            />
                                            <Input
                                                type="number"
                                                value={designSliderValue}
                                                min={0}
                                                max={1}
                                                step={0.1}
                                                onChange={handleDesignInputChange}
                                                fontSize={14}
                                            />
                                        </InputGroup>
                                        <Slider
                                            aria-label="slider-ex-1"
                                            value={designSliderValue}
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            onChange={handleDesignSliderChange}
                                        >
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb boxSize={5} bgColor={'#006dec'} />
                                        </Slider>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter borderBottomRadius={15} justifyContent={'space-between'} borderTop={'1px solid #e5e5e5'}>
                        <Button onClick={onClose} variant={'outline'} fontSize={14}>Cancel</Button>
                        <Button onClick={onClose} variant={'formButtons'} isDisabled _hover={{ bgColor: 'navy' }}>Create</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
            <Modal onClose={handleDeleteClose} isOpen={isDeleteOpen} isCentered>
                <ModalOverlay />
                <ModalContent minW={'600px'} >
                    <ModalHeader bg={'#f3f3f3'} fontSize={20} fontWeight={800} color={'#444444'}
                        borderTopRadius={15} borderBottom={'1px solid #e5e5e5'}>
                        Are you sure?
                    </ModalHeader>
                    <ModalBody p={'32px 32px'}>
                        <VStack spacing={4}>
                            <VStack spacing={0} fontSize={14} align={'flex-start'}>
                                <FormLabel color={'#747474'} fontWeight={500} fontSize={14}><b>This action cannot be undone.</b> This will delete the <b>MuleCraft</b> business group and all of its associated information. Please type the name of the business group to confirm.</FormLabel>
                                <Input placeholder='Business Group name' mt={1} fontSize={14} fontWeight={500} />
                            </VStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter borderBottomRadius={15} justifyContent={'space-between'} borderTop={'1px solid #e5e5e5'}>
                        <Button onClick={handleDeleteClose} variant={'outline'} fontSize={14}>Cancel</Button>
                        <Button onClick={handleDeleteClose} variant={'formButtons'} isDisabled _hover={{ bgColor: 'navy' }}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}