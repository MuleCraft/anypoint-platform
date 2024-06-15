import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
    Text, VStack, Input, HStack, InputGroup, InputLeftElement, InputRightElement, Checkbox, Slider,
    SliderTrack, SliderFilledTrack, SliderThumb, FormControl, FormLabel, Box,
    Menu, MenuButton, MenuItem, MenuList, useToast
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import { useState, useEffect } from "react";
import createNewBusinessGroup from "../../Utils/BusinessGroupCreate";

function CreateBusinessGroup({ currentUserEmail, currentUserName, currentOrganization, currentOrgId,filteredTableData, isOpen, onOpen, onClose }) {
    const toast = useToast();
    // console.log('filtered table data:',filteredTableData);
    const [sandboxSliderValue, setSandboxSliderValue] = useState(0);
    const [designSliderValue, setDesignSliderValue] = useState(0);

    const [isGroupSelected, setIsGroupSelected] = useState(false);
    const [selectedGroupValue, setSelectedGroupValue] = useState("");

    const [groupName, setGroupName] = useState("");
    const [ownerName, setOwnerName] = useState("");

    const [isGroupCheckboxSelected, setIsGroupCheckboxSelected] = useState(false);
    const [isEnvCheckboxSelected, setIsEnvCheckboxSelected] = useState(false);

    const [nameError, setNameError] = useState('');
    const [sandboxSliderError, setSandboxSliderError] = useState('');
    const [designSliderError, setDesignSliderError] = useState('');

    const isCreateButtonDisabled = !groupName || !selectedGroupValue || !ownerName || nameError || sandboxSliderError || designSliderError;

    const selectedGroupData = filteredTableData.find(group => group.businessGroupName === selectedGroupValue);

    const sandboxVcoresMax = selectedGroupData ? selectedGroupData.sandboxVcores : 1;
    const designVcoresMax = selectedGroupData ? selectedGroupData.designVcores : 1;

    const [isCreateGroupButtonDisabled, setIsCreateGroupButtonDisabled] = useState();
    const [parentGroupName, setParentGroupName] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [filteredOwners, setFilteredOwners] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [isOwnerMenuOpen, setIsOwnerMenuOpen] = useState(false);
    const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);

    const [selectedGroupParentId, setSelectedGroupParentId] = useState('');

  const handleOwnerChange = (e) => {
    const value = e.target.value;
    setOwnerName(value);
    setSearchInput(value);

    const uniqueItems = new Set();
    const filtered = filteredTableData.filter((item) => {
        const isMatch =
        (typeof item.groupOwner === 'string' && item.groupOwner.toLowerCase().includes(value.toLowerCase())) ||
        (typeof item.userName === 'string' && item.userName.toLowerCase().includes(value.toLowerCase()));

        if (isMatch) {
            const uniqueKey = item.userName;
            if (!uniqueItems.has(uniqueKey)) {
                uniqueItems.add(uniqueKey);
                return true;
            }
        }
        return false;
    });
        setFilteredOwners(filtered);
        setIsOwnerMenuOpen(true);
    };

  const handleOwnerSelect = (owner) => {
    setOwnerName(`${owner.groupOwner} (username: ${owner.userName})`);
    setIsOwnerMenuOpen(false);
  };

  const handleGroupChange = (e) => {
    const value = e.target.value;
    setParentGroupName(value);
    setSearchInput(value);
    setSelectedGroupValue(value);
    setIsGroupSelected(value !== "");

    const filtered = filteredTableData.filter((item) =>
        (typeof item.groupOwner === 'string' && item.groupOwner.toLowerCase().includes(value.toLowerCase())) ||
        (typeof item.businessGroupId === 'string' && item.businessGroupId.toLowerCase().includes(value.toLowerCase()))
      );
      console.log('filtered id:',filtered);
    setFilteredGroups(filtered);
    setIsGroupMenuOpen(true);
  };

  const filterBusinessGroupId = (data, groupName) => {

    const result = data.filter(item => item.businessGroupName === groupName);
    console.log('result:',result[0].businessGroupId);
    setSelectedGroupParentId(result[0].businessGroupId);
  };

  const handleGroupSelect = (group) => {
    setParentGroupName(group.businessGroupName);
    setSearchInput(group.businessGroupName);
    setSelectedGroupValue(group.businessGroupName);
    setIsGroupMenuOpen(false);
    setIsGroupSelected(true);
    filterBusinessGroupId(filteredTableData, group.businessGroupName);
  };

  const handleInputFocus = () => {
    setIsGroupMenuOpen(true);
    setIsOwnerMenuOpen(false);
    setFilteredGroups(filteredTableData);
  };

    useEffect(() => {
        if (filteredTableData.length > 0) {
            setIsCreateGroupButtonDisabled(false);
        }
        else {
            setIsCreateGroupButtonDisabled(true);
        }
    }, [filteredTableData]);

    const handleSandboxSliderChange = (value) => {
        setSandboxSliderValue(value);
    };

    const handleSandboxInputChange = (event) => {
        const inputValue = parseFloat(event.target.value);
        setSandboxSliderValue(inputValue);

        if (inputValue > sandboxVcoresMax) {
            setSandboxSliderError(`Must be between 0 and ${sandboxVcoresMax}`);
        }
        else {
            setSandboxSliderError('');
        }
    };

    const handleDesignSliderChange = (value) => {
        setDesignSliderValue(value);
    };

    const handleDesignInputChange = (event) => {
        const inputValue = parseFloat(event.target.value);
        setDesignSliderValue(inputValue);

        if (inputValue > designVcoresMax) {
            setDesignSliderError(`Must be between 0 and ${designVcoresMax}`);
        }
        else {
            setDesignSliderError('');
        }
    };

    const handleNameChange = (event) => {
        setGroupName(event.target.value);
        const value = event.target.value;
        const isValid = /^[a-zA-Z0-9\s',._-]+$/.test(value);
        if (value.trim() === '') {
            setNameError('Required');
        } else if (value.length < 2 && !isValid) {
            setNameError(`Name must only contain alphanumeric characters, spaces, and the following symbols: ' , . _ - Name must be between 2 and 255 characters.`);
        } 
        else if (value.length < 2) {
            setNameError('Name must be between 2 and 255 characters.');
        }
        else if(!isValid){
            setNameError(`Name must only contain alphanumeric characters, spaces, and the following symbols: ' , . _ -`);
        } 
        else {
            setNameError('');
        }
    }

    const handleGroupCheckboxChange = () => {
        setIsGroupCheckboxSelected(!isGroupCheckboxSelected);
    }

    const handleEnvCheckboxChange = () => {
        setIsEnvCheckboxSelected(!isEnvCheckboxSelected);
    }

    

    const groupCreateParams = {
        groupName: groupName,
        selectedGroupValue: selectedGroupValue,
        ownerName: ownerName,
        isGroupCheckboxSelected: isGroupCheckboxSelected,
        isEnvCheckboxSelected: isEnvCheckboxSelected,
        sandboxSliderValue: sandboxSliderValue,
        designSliderValue: designSliderValue,
        currentUserName: currentUserName,
        currentUserEmail: currentUserEmail,
        currentOrganization: currentOrganization,
        organizationId: currentOrgId,
        parentGroupId: selectedGroupParentId
    };

    async function invokeGroupCreateFunction() {
        try {
            const response = await createNewBusinessGroup(groupCreateParams);
            onClose();

            if (response === "Error occurred!") {
                toast({
                    title: "Error",
                    description: "Error occurred.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
            else {
                toast({
                    description: "Business group successfully created.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
            setTimeout(() => {
                window.location.reload();
            }, 800);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    const handleFormClose = () => {
        setGroupName('');
        setSelectedGroupValue('');
        setParentGroupName('');
        setOwnerName('');
        setSandboxSliderValue(0);
        setDesignSliderValue(0);
        onClose();
      };

    return (
        <>
            <Button variant="formButtons" onClick={onOpen} minW={'fit-content'}
                isDisabled={isCreateGroupButtonDisabled}>
                Create business group
            </Button>
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
                                    <HStack position={'relative'} justify={'space-between'}
                                        w={nameError ? '385px':'full'} maxW={'401px'}
                                        >
                                        <Input placeholder='Business Group name' mt={1} fontSize={14} fontWeight={500}
                                                value={groupName}
                                                autoComplete="off"
                                                onChange={handleNameChange}
                                                onFocus={()=> {setIsGroupMenuOpen(false);setIsOwnerMenuOpen(false);}}
                                                isInvalid={!!nameError}
                                                borderColor={nameError ? '#ba0516':''} 
                                                w={nameError ? '':'full'}
                                                />
                                        {nameError && (
                                            <Text color="#ba0516" fontWeight={500}
                                                fontSize={14} ml={'20px'} maxW={'228px'}>
                                                {nameError}
                                            </Text>
                                        )}
                                    </HStack>
                                </VStack>
                                <VStack spacing={0} fontSize={14} align={'flex-start'}>
                                    <FormLabel fontWeight={500} fontSize={14} color={'#444444'}>Parent business group</FormLabel>
                                    <Text color={'#747474'} fontWeight={500}>Select a group you’re an administrator of to be the parent of this group.</Text>
                                    <InputGroup mt={1} zIndex={3}>
                                        <InputRightElement
                                        pointerEvents="none"
                                        children={<SlArrowDown />}
                                        color="gray.500"
                                        />
                                        <Input
                                        placeholder="Select..."
                                        autoComplete="off"
                                        fontSize={14} color={'#747474'}
                                        value={parentGroupName}
                                        onChange={handleGroupChange}
                                        onFocus={handleInputFocus}
                                        />
                                        {isGroupMenuOpen && (
                                        <Box>
                                            <Menu isOpen={isGroupMenuOpen}>
                                            <MenuButton as="div" width="100%" height="0" visibility="hidden" />
                                            <MenuList position="absolute" width='384px'right={0} top={'35px'}>
                                                {filteredGroups.length === 0 ? (
                                                    <MenuItem disabled fontStyle={'italic'} color={'gray.500'} fontWeight={500}>
                                                        No results found
                                                    </MenuItem>
                                                ) : (
                                                    filteredGroups.map((group, index) => (
                                                        <MenuItem key={index} onClick={() => handleGroupSelect(group)}>
                                                            {group.businessGroupName}
                                                        </MenuItem>
                                                    ))
                                                )}
                                            </MenuList>
                                            </Menu>
                                        </Box>
                                        )}
                                    </InputGroup>
                                </VStack>
                                {isGroupSelected && (
                                    <>
                                        <VStack spacing={0} fontSize={14} align={'flex-start'} minW={'-webkit-fill-available'}>
                                            <FormLabel fontWeight={500} fontSize={14} color={'#444444'}>Owner</FormLabel>
                                            <InputGroup zIndex={2}>
                                                <InputLeftElement
                                                pointerEvents="none"
                                                children={<FiSearch />}
                                                color="gray.500"
                                                />
                                                <Input
                                                placeholder="Add owner by name, username, or email."
                                                fontSize={14}
                                                autoComplete="off"
                                                value={ownerName}
                                                onChange={handleOwnerChange}
                                                onFocus={()=>{setIsGroupMenuOpen(false)}}
                                                />
                                                {isOwnerMenuOpen && (
                                                <Box>
                                                    <Menu isOpen={isOwnerMenuOpen} onClose={isOwnerMenuOpen}>
                                                        <MenuButton as="div" height="0" visibility="hidden" />
                                                        <MenuList position="absolute" width='384px'right={0} top={'35px'}>
                                                        {filteredOwners.length === 0 ? (
                                                            <MenuItem disabled fontStyle={'italic'} color={'gray.500'} fontWeight={500}>
                                                                No results found
                                                            </MenuItem>
                                                        ) : (
                                                            filteredOwners.map((owner, index) => (
                                                            <MenuItem key={index} onClick={() => handleOwnerSelect(owner)}>
                                                                {owner.groupOwner} (username: {owner.userName})
                                                            </MenuItem>
                                                            ))
                                                        )}
                                                        </MenuList>
                                                    </Menu>
                                                </Box>
                                                )}
                                            </InputGroup>
                                            <Checkbox size='lg' mt={2} value={isGroupCheckboxSelected} 
                                                onChange={handleGroupCheckboxChange}
                                                onFocus={()=>{setIsGroupMenuOpen(false);}}>Can create business groups</Checkbox>
                                            <Checkbox size='lg' mt={2} value={isEnvCheckboxSelected}
                                                onChange={handleEnvCheckboxChange}
                                                onFocus={()=>{setIsGroupMenuOpen(false);}}>Can create environments</Checkbox>
                                        </VStack>
                                        <VStack align={'flex-start'} minW={'-webkit-fill-available'}>
                                            <FormLabel fontWeight={500} color={'#444444'} fontSize={14}>Sandbox vCores</FormLabel>
                                            <HStack minW={'-webkit-fill-available'} spacing={6}>
                                                <InputGroup w={'200px'}>
                                                    <InputRightElement
                                                        pointerEvents="none"
                                                        children={<Text fontSize={14}>/ {sandboxVcoresMax}</Text>}
                                                        color="gray.500"
                                                    />
                                                    <Input
                                                        type="number"
                                                        value={sandboxSliderValue}
                                                        min={0}
                                                        max={sandboxVcoresMax}
                                                        step={0.1}
                                                        onChange={handleSandboxInputChange}
                                                        onFocus={()=>{setIsGroupMenuOpen(false);}}
                                                        fontSize={14}
                                                    />
                                                </InputGroup>
                                                <Slider
                                                    aria-label="slider-ex-1"
                                                    value={sandboxSliderValue}
                                                    min={0}
                                                    max={sandboxVcoresMax}
                                                    step={0.1}
                                                    onChange={handleSandboxSliderChange}
                                                    onFocus={()=>{setIsGroupMenuOpen(false);}}
                                                >
                                                    <SliderTrack>
                                                        <SliderFilledTrack />
                                                    </SliderTrack>
                                                    <SliderThumb boxSize={5} bgColor={'#006dec'} />
                                                </Slider>
                                            </HStack>
                                                {sandboxSliderError && (
                                                    <Text color="#ba0516" fontWeight={500} 
                                                        fontSize={14} maxW={'234px'}>
                                                        {sandboxSliderError}
                                                    </Text>
                                                )}
                                            <FormLabel fontWeight={500} color={'#444444'} fontSize={14}>Design vCores</FormLabel>
                                            <HStack minW={'-webkit-fill-available'} spacing={6}>
                                                <InputGroup w={'200px'}>
                                                    <InputRightElement
                                                        pointerEvents="none"
                                                        children={<Text fontSize={14}>/ {designVcoresMax}</Text>}
                                                        color="gray.500"
                                                    />
                                                    <Input
                                                        type="number"
                                                        value={designSliderValue}
                                                        min={0}
                                                        max={designVcoresMax}
                                                        step={0.1}
                                                        onChange={handleDesignInputChange}
                                                        onFocus={()=>{setIsGroupMenuOpen(false);}}
                                                        fontSize={14}
                                                    />
                                                </InputGroup>
                                                <Slider
                                                    aria-label="slider-ex-1"
                                                    value={designSliderValue}
                                                    min={0}
                                                    max={designVcoresMax}
                                                    step={0.1}
                                                    onChange={handleDesignSliderChange}
                                                    onFocus={()=>{setIsGroupMenuOpen(false);}}
                                                >
                                                    <SliderTrack>
                                                        <SliderFilledTrack />
                                                    </SliderTrack>
                                                    <SliderThumb boxSize={5} bgColor={'#006dec'} />
                                                </Slider>
                                            </HStack>
                                                {designSliderError && (
                                                    <Text color="#ba0516" fontWeight={500} 
                                                        fontSize={14} maxW={'234px'}>
                                                        {designSliderError}
                                                    </Text>
                                                )}
                                        </VStack>
                                    </>
                                )}
                            </VStack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter borderBottomRadius={15} justifyContent={'space-between'} borderTop={'1px solid #e5e5e5'}>
                        <Button onClick={handleFormClose} variant={'outline'} fontSize={14}>Cancel</Button>
                        <Button
                            onClick={invokeGroupCreateFunction}
                            variant={'formButtons'}
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
