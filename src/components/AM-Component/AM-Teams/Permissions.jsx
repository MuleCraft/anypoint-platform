import { useState, useContext } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    Stack,
    HStack,
    InputGroup,
    InputLeftElement,
    Input,
    Text,
    Icon,
    Tooltip, 
    Switch
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import FlexableTabs from "../../FlexableTabs";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import CreatePermissions from "./CreatePermissions";
import "../../../assets/Common.css";
import PermissionsTable from "./PermissionTable";
import EmptyRows from "../EmptyRows";
import { AuthContext } from "../../../Utils/AuthProvider";
import fetchPermissionsTableRows from "../../../Utils/PermissionsData";
import fetchTeamsTableRows from "../../../Utils/TeamsTableRows";

const Permissions = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const { userData } = useContext(AuthContext);

    const [isChecked, setIsChecked] = useState(false);
    const [permissionsTableData, setPermissionsTableData] = useState([]);
    const [businessGroups, setBusinessGroups] = useState([]);
    const [permissionData, setPermissionData] = useState([]);
    const [teamsData, setTeamsData] = useState([]);
    const [permissions, setPermissions] = useState({});

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    const fetchPermissions = async (roleIds) => {
        const { data, error } = await supabase
        .schema('mc_cap_develop')
          .from('permissions')
          .select('roleid, rolename')
          .in('roleid', roleIds);
        if (error) {
          console.error('Error fetching permissions:', error);
          return [];
        }
        return data;
      };

    const fetchRows = async () => {
        const tableRowData = await fetchPermissionsTableRows(id);
        setPermissionsTableData(tableRowData);
        console.log("permissions data:",tableRowData);
      
            // const roleIds = tableRowData.flatMap(group => group.permissionsData?.map(permission => permission.roleid) || []);
            // const uniqueRoleIds = [...new Set(roleIds)];
            // console.log("unique role ids:",uniqueRoleIds);
            // const permissionsData = await fetchPermissions(uniqueRoleIds);
            // console.log("permissionsData:",permissionsData);
            // const permissionsMap = permissionsData.reduce((acc, permission) => {
            //   acc[permission.roleid] = permission.rolename;
            //   return acc;
            // }, {});
            // setPermissions(permissionsMap);
            // console.log("permissions map:",permissionsMap);
    }

    const fetchBgData = async () => {
        const { data, error } = await supabase
            .schema("mc_cap_develop")
            .from("businessgroup")
            .select()
            .eq("organizationId", userData.organizationId);

            if (error) {
                console.error('Error fetching business group names:', error);
                return [];
              }
              return data;
    }
    const fetchBgNames = async () => {
        const bgNames = await fetchBgData();
        setBusinessGroups(bgNames);
        console.log("bg names:",bgNames);
    }

    const fetchPermissionData = async () => {
        const { data, error } = await supabase
            .schema("mc_cap_develop")
            .from("permissions")
            .select("*");

            if (error) {
                console.error('Error fetching permission names:', error);
                return [];
              }
              return data;
    }
    const fetchPermissionNames = async () => {
        const permissionDetails = await fetchPermissionData(id);
        setPermissionData(permissionDetails);
        console.log("permissions names:",permissionDetails);
    }

    const fetchTeamDetails = async () => {
        const teamdetails = await fetchTeamsTableRows(userData.organizationId);
        setTeamsData(teamdetails);
        console.log("team details:",teamdetails);
    }

    if (userData && (permissionsTableData.length === 0)) {
        fetchRows();
        fetchBgNames();
        fetchPermissionNames();
        fetchTeamDetails();
    }

    const [activeItem, setActiveItem] = useState("Permissions");
    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };

    const userId = [
        {
            heading: 'Access Management',
            items: [

                { name: 'Members', label: 'Members', path: `/accounts/teams/${id}/users` },
                { name: 'Permissions', label: 'Permissions', path: `/accounts/teams/${id}/permissions` },
                { name: 'ChildTeams', label: 'Child teams', path: `/accounts/teams/${id}/child_teams` },
                { name: 'Settings', label: 'Settings', path: `/accounts/teams/${id}/settings` },
                { name: 'Limits', label: 'Limits', path: `/accounts/teams/${id}/limits` },

            ],
        },

    ];


    return (
        <Box h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={205} mt={'90px'}>
            <Flex alignItems="center" justify="space-between">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/teams/">
                            Teams
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {group?.parentGroupID === "" ? (
                        ""
                    ) : (
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                fontSize="lg"
                                fontWeight="400"
                                href={`/accounts/businessGroups/${group?.businessGroupId}`}
                            >
                                {group?.organizationName}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )

                    }
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            fontSize="lg"
                            fontWeight="600"
                            href={`/accounts/businessGroups/${id}`}
                        >
                            {group?.businessGroupName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<HiEllipsisHorizontal width="10px" />}
                        variant="outline"
                        h={"30px"}
                        color="gray.500"
                        border={"1px solid #5c5c5c"}
                        right={30}
                    />
                    <MenuList borderRadius={0}>
                        <MenuItem fontSize="base" color="white" onClick="" bgColor="delete" >
                            Delete team...
                        </MenuItem>
                    </MenuList>
                </Menu>

            </Flex>
            <Flex direction={'column'}>
                <Box pt={7}>
                    <FlexableTabs
                        sections={userId}
                        activeItem={activeItem}
                        onItemSelect={handleItemSelect}
                    />
                </Box>
                <Flex direction="column" mt="70" p={"20px 25px"} gap={8} w={'-webkit-fill-available'}>
                    <Stack mt={"-60px"} direction={"row"} spacing={6} align={'center'} justifyContent={'space-between'}>
                        <HStack spacing={5} >
                            <CreatePermissions
                            permissionData={permissionData}
                            bgNames={businessGroups}
                            teamId={id}
                            />
                            <HStack>
                                <Flex align="center">
                                    <Box
                                        position="relative"
                                        display="inline-block"
                                        width="40px"
                                        height="20px"
                                        mr="-35px"
                                        zIndex={1}
                                        pointerEvents="none"
                                    >
                                        {isChecked && (
                                            <Box
                                                position="absolute"
                                                top="50%"
                                                left="50%"
                                                transform="translate(-50%, -50%)"
                                                color="white"
                                            >
                                                <FaCheck fontSize={10} />
                                            </Box>
                                        )}
                                    </Box>
                                    <Switch size="lg" isChecked={isChecked} onChange={handleToggle} />
                                </Flex>

                                <Text fontSize={14} color={"#444444"} fontWeight={500} >
                                    Show inherited permissions
                                </Text>
                                <Tooltip label={'Inherited permissions come from parents of this team'}
                                    bg={'#5c5c5c'}
                                    fontSize={12} noOfLines={1} py={2} minW={'335px'}>
                                    <Icon fontSize={20} mt={1}><IoInformationCircleOutline /></Icon>
                                </Tooltip>
                            </HStack>
                            </HStack>
                            <InputGroup maxW={"fit-content"}>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<FiSearch />}
                                    color="gray.500"
                                />
                                <Input placeholder="Filter permissions" fontSize={14} fontWeight={500}
                                    // onChange={(e) => { setFilterValue(e.target.value) }}
                                />
                            </InputGroup>
                        </Stack>
                        {permissionsTableData.length === 0 ? (
                            <EmptyRows message={'No data to show'} />
                        ) : (
                            <PermissionsTable 
                                tableData={teamsData}
                                permissionData={permissionsTableData[0].permissions}
                                bgNames={businessGroups}
                                teamId={id}
                                userData={userData}
                            />
                        )}
                        </Flex>
            </Flex>

        </Box >
    );
};

export default Permissions;
