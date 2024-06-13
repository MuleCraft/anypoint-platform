import { useState } from "react";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
// import { useParams } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";
import createNewTeams from "../../../Utils/TeamsCreate";
import { v4 as uuidv4 } from "uuid";

const CreateTeams = ({ filteredTeamsTableData, orgId }) => {

    console.log('filteredTeamsTableData:', filteredTeamsTableData);
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [teamName, setTeamName] = useState('');
    const [teamNameError, setTeamNameError] = useState('');
    const [parentTeamName, setParentTeamName] = useState('');

    if (filteredTeamsTableData.length > 0 && parentTeamName === '') {
        setParentTeamName(filteredTeamsTableData[filteredTeamsTableData.length - 1].teamname);
    }

    const [searchInput, setSearchInput] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [isTeamsMenuOpen, setIsTeamsMenuOpen] = useState(false);

    const isCreateTeamsButtonDisabled = !teamName || !parentTeamName || teamNameError;

    const teamId = uuidv4();

    const teamsCreateParams = {
        teamid: teamId,
        teamname: teamName,
        teamtype: 'internal',
        organizationId: orgId,
        parentTeam: parentTeamName,
        members: []
    };

    async function invokeTeamsCreate() {
        try {
            const response = await createNewTeams(teamsCreateParams);
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
                    description: "Team successfully created.",
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

    const handleTeamNameChange = (event) => {
        setTeamName(event.target.value);
        const value = event.target.value;
        const isValid = /^[a-zA-Z0-9\s_-]+$/.test(value);
        if (value.trim() === '') {
            setTeamNameError(`Required. Team name must only contain alphanumeric characters, spaces, and the following symbols: _ -`);
        }
        else if (!isValid) {
            setTeamNameError(`Team name must only contain alphanumeric characters, spaces, and the following symbols: _ -`);
        }
        else {
            setTeamNameError('');
        }
    }

    const handleParentTeamChange = (e) => {
        const value = e.target.value;
        setParentTeamName(value);
        setSearchInput(value);

        const filtered = filteredTeamsTableData.filter((item) =>
            (typeof item.teamname === 'string' && item.teamname.toLowerCase().includes(value.toLowerCase()))
        );
        console.log('filtered id:', filtered);
        setFilteredTeams(filtered);
        setIsTeamsMenuOpen(true);
    };

    //   const filterBusinessGroupId = (data, groupName) => {
    //     const result = data.filter(item => item.businessGroupName === groupName);
    //     console.log('result:',result[0].businessGroupId);
    //     setSelectedGroupParentId(result[0].businessGroupId);
    //   };

    const handleTeamSelect = (team) => {
        setParentTeamName(team.teamname);
        setSearchInput(team.teamname);
        // setSelectedParentValue(team.teamname);
        setIsTeamsMenuOpen(false);
        // filterBusinessGroupId(filteredTeamsTableData, team.teamname);
    };

    const handleInputFocus = () => {
        setIsTeamsMenuOpen(true);
        setFilteredTeams(filteredTeamsTableData);
    };

    return (

        <>
            <Button variant="formButtons" onClick={onOpen} >
                Create Team
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'#f3f3f3'} fontSize={20} fontWeight={800} color={'#444444'}
                        borderTopRadius={15} borderBottom={'0.5px solid #e5e5e5'} p={6}>
                        Create Team
                    </ModalHeader>
                    <Divider />
                    <ModalBody>
                        <FormControl id="email" p={4}>
                            <FormLabel fontWeight={500} fontSize={14} color={'#444444'} >Name</FormLabel>
                            <Text pb={1} maxW="450px" color={'#747474'} fontSize={14} fontWeight={500}>
                                You can use alphanumeric characters, hyphens, and spaces.
                            </Text>
                            <HStack position={'relative'} justify={'space-between'}
                                w={teamNameError ? '432px' : 'full'} maxW={'432px'}
                            >
                                <Input
                                    type="text"
                                    fontSize={14}
                                    color={'#747474'}
                                    fontWeight={500}
                                    value={teamName}
                                    onChange={handleTeamNameChange}
                                    placeholder="e.g. MyTeam"
                                    onFocus={() => { setIsTeamsMenuOpen(false); }}
                                    isInvalid={!!teamNameError}
                                    borderColor={teamNameError ? '#ba0516' : ''}
                                    w={teamNameError ? '' : 'full'}
                                    autoComplete="off"
                                />
                                {teamNameError && (
                                    <Text color="#ba0516" fontWeight={500}
                                        fontSize={14} ml={'20px'} maxW={'240px'}>
                                        {teamNameError}
                                    </Text>
                                )}
                            </HStack>
                            <FormLabel fontWeight={500} fontSize={14} color={'#444444'} mt={5}>
                                Parent team
                            </FormLabel>
                            <Text pb={1} maxW="450px" color={'#747474'} fontSize={14} fontWeight={500}>
                                Teams inherit permissions from their parents.
                            </Text>
                            <InputGroup mt={1} zIndex={3}>
                                <InputRightElement
                                    pointerEvents="none"
                                    children={<SlArrowDown />}
                                    color="gray.500"
                                />
                                <Input
                                    // /placeholder="Select..."
                                    autoComplete="off"
                                    fontSize={14} color={'#747474'}
                                    value={parentTeamName}
                                    onChange={handleParentTeamChange}
                                    onFocus={handleInputFocus}
                                />
                                {isTeamsMenuOpen && (
                                    <Box>
                                        <Menu isOpen={isTeamsMenuOpen}>
                                            <MenuButton as="div" width="100%" height="0" visibility="hidden" />
                                            <MenuList position="absolute" width='432px' right={0} top={'35px'}>
                                                {filteredTeams.length === 0 ? (
                                                    <MenuItem disabled fontStyle={'italic'} color={'gray.500'} fontSize={14} fontWeight={500}>
                                                        No results found
                                                    </MenuItem>
                                                ) : (
                                                    filteredTeams.map((team, index) => (
                                                        <MenuItem key={index} fontSize={14}
                                                            onClick={() => handleTeamSelect(team)}
                                                        >
                                                            {team.teamname}
                                                        </MenuItem>
                                                    ))
                                                )}
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                )}
                            </InputGroup>
                        </FormControl>
                    </ModalBody>
                    <Divider />
                    <ModalFooter justifyContent="space-between">
                        <Button variant="homePageButtons" onClick={onClose} fontSize="base">
                            Cancel
                        </Button>
                        <Button onClick={invokeTeamsCreate}
                            variant={'formButtons'}
                            isDisabled={isCreateTeamsButtonDisabled}
                            _hover={{ bgColor: 'navy' }}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ >
    );
};

export default CreateTeams;
