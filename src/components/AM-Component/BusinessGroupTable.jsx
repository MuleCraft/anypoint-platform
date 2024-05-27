import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  VStack,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  ModalContent,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import supabase from "../../Utils/supabase";
import deleteBusinessGroup from "../../Utils/BusinessGroupDelete";

const BusinessGroupTable = ({ tableData, onOpenCreateChildGroup, userData }) => {
  const [ownerData, setOwnerData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchBusinessGroups = async () => {
      const { data, error } = await supabase
        .schema("mc_cap_develop")
        .from("businessgroup")
        .select("*")
        .eq("businessGroupName", userData.company)


      if (error) {
        console.error("Error fetching business groups:", error);
      } else {
        setOwnerData(data[0]);
      }
    };

    if (userData) {
      fetchBusinessGroups();
    }
  }, [userData.company]);

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [deleteInputValue, setDeleteInputValue] = useState("");
  const [isDeleteButtonDisabled, setDeleteButtonDisabled] = useState(true);

  const [selectedBusinessGroupId, setSelectedBusinessGroupId] = useState(null);
  const [targetGroupName, setTargetGroupName] = useState("");


  useEffect(() => {
    if (selectedBusinessGroupId) {
      setTargetGroupName(selectedBusinessGroupId.businessGroupName);
    }
  }, [selectedBusinessGroupId]);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
    setTargetGroupName(selectedBusinessGroupId.businessGroupName);
  }
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteInputValue("");
    setDeleteButtonDisabled(true);
    setTargetGroupName(selectedBusinessGroupId.businessGroupName);
  }

  const handleDeleteInputChange = (e) => {
    const value = e.target.value;
    setDeleteInputValue(value);
    const matchingGroup = tableData.find(
      (group) =>
        group.businessGroupName.toLowerCase() === value.toLowerCase() &&
        group.organizationName.toLowerCase() === ownerData.organizationName.toLowerCase()
    );
    console.log('matching group:',matchingGroup.businessGroupId);
    setDeleteButtonDisabled(!matchingGroup);
  };

  const [hoveredRows, setHoveredRows] = useState([]);
  const rows = tableData || [];

  const handleRowHover = (index) => {
    setHoveredRows((prevHoveredRows) => {
      const newHoveredRows = [...prevHoveredRows];
      newHoveredRows[index] = true;
      return newHoveredRows;
    });
  };

  const handleRowNotHover = (index) => {
    setHoveredRows((prevHoveredRows) => {
      const newHoveredRows = [...prevHoveredRows];
      newHoveredRows[index] = false;
      return newHoveredRows;
    });
  };


  const columnTitleStyle = {
    fontSize: 14,
    color: "#444444",
    fontWeight: 800,
    textTransform: "capitalize",
    padding: "10px",
  };
  const rowValueStyle = { fontSize: 14, padding: "10px" };

  const handleMenuOpen = (businessGroupId) => {
    setSelectedBusinessGroupId(businessGroupId);
  };
  

  async function invokeGroupDeleteFunction(selectedBusinessGroupId) {
    try {
        // console.log("group id to be deleted:",selectedBusinessGroupId.businessGroupId);
        const response = await deleteBusinessGroup(selectedBusinessGroupId);
        handleDeleteClose();

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
                description: "Business group successfully deleted.",
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

  return (
    <TableContainer>
      <Table variant="simple" size="md">
        <Thead borderBottomWidth="3px">
          <Tr>
            <Th style={columnTitleStyle}>Name</Th>
            <Th style={columnTitleStyle} w={"150px"}>
              Environments
            </Th>
            <Th style={columnTitleStyle} w={"120px"}>
              Total vCores
            </Th>
            <Th style={columnTitleStyle} w={"80px"}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((dataValue, index) => (
            <Tr
              key={index}
              fontWeight={500}
              onMouseOver={() => handleRowHover(index)}
              onMouseLeave={() => handleRowNotHover(index)}
              _hover={{ bgColor: "#ececec" }}
            >
              <Td style={rowValueStyle}>
                <Link href={`/accounts/businessGroups/${dataValue.businessGroupId}`}
                  _hover={{ textDecoration: "underline" }}
                  color={hoveredRows[index] ? "#0176d3" : "#444444"}
                >
                  {dataValue.businessGroupName}
                </Link>
              </Td>
              <Td style={rowValueStyle}>{dataValue.environments.length}</Td>
              <Td style={rowValueStyle}>{dataValue.totalVcores}</Td>
              <Td style={rowValueStyle}>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<HiEllipsisHorizontal />}
                    variant='outline'
                    h={'28px'} color="gray.500"
                    border={'1px solid #5c5c5c'}
                    onClick={() => handleMenuOpen(dataValue)}
                  />
                  <MenuList p={'5px 0'} minW={'150px'} maxW={'240px'}>
                    <Tooltip label='This business group is not entitled to create child groups' placement='auto' fontSize="4xl" isDisabled={selectedBusinessGroupId?.canCreateChildGroup !== false}>
                      <MenuItem fontSize={14} onClick={() => onOpenCreateChildGroup(dataValue.businessGroupId)} isDisabled={selectedBusinessGroupId?.canCreateChildGroup === false}>
                        Create child group
                      </MenuItem>
                    </Tooltip>
                    {ownerData.id !== selectedBusinessGroupId?.id &&
                      <Tooltip label='Cannot delete a Business Group with children' placement='auto' fontSize="4xl" isDisabled={selectedBusinessGroupId?.childGroups === false}>
                        <MenuItem fontSize={14} onClick={handleDeleteOpen} color={'red.600'} isDisabled={selectedBusinessGroupId?.childGroups !== false}
                          _hover={{ color: selectedBusinessGroupId?.childGroups !== false ? '#000' : "white", bgColor: selectedBusinessGroupId?.childGroups !== false ? '' : 'red.600' }}>
                          Delete business group...
                        </MenuItem>
                      </Tooltip>
                    }

                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
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
                <FormLabel color={'#747474'} fontWeight={500} fontSize={14}>
                  <b>This action cannot be undone.</b> This will delete the <b>{targetGroupName}</b> business group and all of its associated information. Please type the name of the business group to confirm.</FormLabel>
                <Input placeholder='Business Group name' mt={1} fontSize={14} fontWeight={500}
                  value={deleteInputValue}
                  onChange={handleDeleteInputChange}
                  />
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter borderBottomRadius={15} justifyContent={'space-between'} borderTop={'1px solid #e5e5e5'}>
            <Button onClick={handleDeleteClose} variant={'outline'} fontSize={14}>Cancel</Button>
            <Button onClick={() => invokeGroupDeleteFunction(selectedBusinessGroupId)}
              variant={"formButtons"}
              isDisabled={isDeleteButtonDisabled} _hover={{ bgColor: 'navy' }}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </TableContainer>
  )
}

export default BusinessGroupTable