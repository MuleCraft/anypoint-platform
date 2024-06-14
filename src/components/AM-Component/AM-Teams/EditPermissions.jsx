import { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Divider,
    ModalBody,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Accordion,
    ModalFooter,
    Stack,
    HStack,
    FormLabel,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import { FiSearch } from "react-icons/fi";
import CustomAccordionItem from "../../Accordion";
import CustomSwitch from "../../Switch";

const EditPremissions = () => {
    const { id } = useParams();
    const [permissions, setPermissions] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [filterValue, setFilterValue] = useState("");
    const [activeItem, setActiveItem] = useState("ChildTeams");
    const [selectedIds, setSelectedIds] = useState([]);
    const [showSelectedOnly, setShowSelectedOnly] = useState(false); // Switch state

    useEffect(() => {
        fetchPermissionsData();
    }, []);

    const fetchPermissionsData = async () => {
        try {
            // Fetch all permissions
            const { data: permissionsData, error: permissionsError } = await supabase
                .schema("mc_cap_develop")
                .from("permissions")
                .select("*");

            if (permissionsError) {
                console.error("Error fetching permissions:", permissionsError.message);
                return;
            }

            setPermissions(permissionsData);

            // Fetch team's permissions
            const { data: teamData, error: teamError } = await supabase
                .schema("mc_cap_develop")
                .from("teams")
                .select("permissions")
                .eq("teamid", id)
                .single();

            if (teamError) {
                console.error("Error fetching team data:", teamError.message);
                return;
            }

            if (teamData && teamData.permissions) {
                const initialSelectedIds = teamData.permissions.map(permission => permission.roleid);
                setSelectedIds(initialSelectedIds);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCheckboxChange = (id, isChecked) => {
        setSelectedIds(prevIds => {
            if (isChecked) {
                return [...prevIds, id];
            } else {
                return prevIds.filter(selectedId => selectedId !== id);
            }
        });
    };

    // Filter permissions based on targetmodule, switch state, and filter value
    const filteredPermissions = permissions.filter(item => {
        if (item.targetmodule !== 'Access Management') return false;
        if (showSelectedOnly && !selectedIds.includes(item.roleid)) return false;
        if (filterValue && !item.rolename.toLowerCase().includes(filterValue.toLowerCase())) return false;
        return true;
    });

    // Map filtered permissions to subtitles for CustomAccordionItem
    const subtitles = filteredPermissions.map((perm) => ({
        title: perm.rolename,
        tooltip: perm.roledetail,
        id: perm.id,
        roleid: perm.roleid,
        isChecked: selectedIds.includes(perm.roleid)
    }));

    const handleUpdatePermissions = async () => {
        try {
            const selectedPermissions = permissions.filter(permission => selectedIds.includes(permission.roleid));
            const updatedPermissions = selectedPermissions.map(permission => ({
                groupid: id,
                roleid: permission.roleid,
                rolename: permission.rolename,
                roledetail: permission.roledetail,
                targetmodule: permission.targetmodule
            }));

            const { data, error } = await supabase
                .schema("mc_cap_develop")
                .from("teams")
                .update({ permissions: updatedPermissions })
                .eq("teamid", id);

            if (error) {
                console.error("Error updating permissions:", error.message);
            } else {
                console.log("Permissions updated:", data);
                onClose();
            }
        } catch (error) {
            console.error("Error updating permissions:", error);
        }
    };

    return (
        <Box h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={205} mt={'90px'}>

            <Flex mt={6} justify="space-between" px={5}>
                <Button colorScheme="blue" onClick={onOpen} fontSize="xs">
                    Edit
                </Button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
                <ModalOverlay />
                <ModalContent>
                    <Box bg="modelColor" borderRadius="4px" p={3}>
                        <ModalHeader fontSize="lg" fontWeight="800">
                            Edit Permissions
                        </ModalHeader>
                    </Box>
                    <Divider />
                    <ModalBody pb={7} minH={500}>
                        <Flex justify="space-between" align="center" mt={6}>
                            <Text fontSize="base" color={"#747474"} fontWeight={500}>
                                Select permissions this team should have for MC.
                            </Text>
                            <InputGroup maxW={"fit-content"} ml={0}>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<FiSearch />}
                                    color="gray.500"
                                />
                                <Input
                                    placeholder="Filter"
                                    fontSize={14}
                                    fontWeight={500}
                                    onChange={(e) => { setFilterValue(e.target.value) }}
                                />
                            </InputGroup>
                        </Flex>
                        <Stack mt={"18px"} direction={"row"} spacing={6} align={'center'} justify={'space-between'}>
                            <HStack spacing={6}>
                                <FormLabel fontWeight={600} fontSize="base">
                                    Permissions
                                </FormLabel>
                            </HStack>
                            <Flex alignItems="center" gap={3} justifyContent="center">
                                <Text fontSize="xs">Show Selected Only</Text>
                                <CustomSwitch isChecked={showSelectedOnly} onToggle={setShowSelectedOnly} />
                            </Flex>
                        </Stack>
                        <Accordion allowToggle mt={6}>
                            <CustomAccordionItem
                                sectionTitle="Access Management"
                                subtitles={subtitles}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        </Accordion>
                    </ModalBody>
                    <Divider />
                    <ModalFooter justifyContent="space-between">
                        <Button variant="homePageButtons" onClick={onClose} fontSize="base">
                            Cancel
                        </Button>
                        <Button variant="homePageButtons" fontSize="base" onClick={handleUpdatePermissions}>
                            Done
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default EditPremissions;
