import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure,

    Text, VStack, Select, Input, HStack, InputGroup, InputLeftElement, InputRightElement, Checkbox, Slider,
    SliderTrack, SliderFilledTrack, SliderThumb, FormControl, FormLabel
} from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";
import { useState } from "react";

function CreateBusinessGroup() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [sandboxSliderValue, setSandboxSliderValue] = useState(0);
    const [designSliderValue, setDesignSliderValue] = useState(0);

    const [isGroupSelected, setIsGroupSelected] = useState(false);
    const [selectedGroupValue, setSelectedGroupValue] = useState("");

    const [groupName, setGroupName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const isCreateButtonDisabled = !groupName || !selectedGroupValue || !ownerName;

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedGroupValue(value);
        setIsGroupSelected(value !== "");
    };

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

    const handleNameChange = (event) => {
        setGroupName(event.target.value);
        console.log(groupName);
    }

    const handleOwnerChange = (event) => {
        setOwnerName(event.target.value);
        console.log(ownerName);
    }

    return (
        <>
            <Button variant="formButtons" onClick={onOpen} minW={'fit-content'}>Create Business Group</Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
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
                                    <Input placeholder='Business Group name' mt={1} fontSize={14} fontWeight={500} value={groupName} onChange={handleNameChange} />
                                </VStack>
                                <VStack spacing={0} fontSize={14} align={'flex-start'}>
                                    <FormLabel fontWeight={500} fontSize={14} color={'#444444'}>Parent business group</FormLabel>
                                    <Text color={'#747474'} fontWeight={500}>Select a group you’re an administrator of to be the parent of this group.</Text>
                                    <Select variant={'outlined'} placeholder="Select..." color={'#747474'} fontSize={14} border={'1px solid #747474'} mt={1}
                                        value={selectedGroupValue}
                                        onChange={handleSelectChange}>
                                        <option value='option1'>MC</option>
                                        <option value='option2'>MuleCraft</option>
                                        <option value='option3'>Google</option>
                                    </Select>
                                </VStack>
                                {isGroupSelected && (
                                    <>
                                        <VStack spacing={0} fontSize={14} align={'flex-start'} minW={'-webkit-fill-available'}>
                                            <FormLabel fontWeight={500} fontSize={14} color={'#444444'}>Owner</FormLabel>
                                            <InputGroup >
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<FiSearch />}
                                                    color="gray.500"
                                                />
                                                <Input placeholder="Add owner by name, username, or email." fontSize={14} value={ownerName} onChange={handleOwnerChange} />
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
                                    </>
                                )}
                            </VStack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter borderBottomRadius={15} justifyContent={'space-between'} borderTop={'1px solid #e5e5e5'}>
                        <Button onClick={onClose} variant={'outline'} fontSize={14}>Cancel</Button>
                        <Button onClick={onClose} variant={'formButtons'}
                            isDisabled={isCreateButtonDisabled}
                            _hover={{ bgColor: 'navy' }}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateBusinessGroup;
