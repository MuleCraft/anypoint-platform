import {
    Menu, MenuButton, MenuList, MenuItem, IconButton, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody, Button, VStack,
    Input, FormLabel
} from "@chakra-ui/react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
// import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import deleteBusinessGroup from "../../Utils/BusinessGroupDelete";

export default function BusinessGroupMenu({ onOpenCreateChildGroup }) {

    // const { isOpen, onOpen, onClose } = useDisclosure();
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    // const [sandboxSliderValue, setSandboxSliderValue] = useState(0);
    // const [designSliderValue, setDesignSliderValue] = useState(0);

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

    // const handleSandboxSliderChange = (value) => {
    //     setSandboxSliderValue(value);
    // };

    // const handleSandboxInputChange = (event) => {
    //     const inputValue = parseFloat(event.target.value);
    //     setSandboxSliderValue(inputValue);
    // };

    // const handleDesignSliderChange = (value) => {
    //     setDesignSliderValue(value);
    // };

    // const handleDesignInputChange = (event) => {
    //     const inputValue = parseFloat(event.target.value);
    //     setDesignSliderValue(inputValue);
    // };


    const values = menuValue.filter(item => item.parentGroupID === '');

    console.log("values", values[0].businessGroupId);


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
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent minW={'600px'} >
                    <ModalHeader bg={'#f3f3f3'} fontSize={20} fontWeight={800} color={'#444444'}
                        borderTopRadius={15} borderBottom={'1px solid #e5e5e5'}>
                        Are you sure?
                    </ModalHeader>
                    <ModalBody p={'32px 32px'}>
                        <VStack spacing={4}>
                            <VStack spacing={0} fontSize={14} align={'flex-start'}>
                                <FormLabel color={'#747474'} fontWeight={500} fontSize={14}><b>This action cannot be undone.</b> This will delete the <b>{values[0].businessGroupId}</b> business group and all of its associated information. Please type the name of the business group to confirm.</FormLabel>
                                <Input placeholder='Business Group name' mt={1} fontSize={14} fontWeight={500} />
                            </VStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter borderBottomRadius={15} justifyContent={'space-between'} borderTop={'1px solid #e5e5e5'}>
                        <Button onClick={onClose} variant={'outline'} fontSize={14}>Cancel</Button>
                        <Button onClick={invokeGroupDeleteFunction} variant={'formButtons'} _hover={{ bgColor: 'navy' }}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}