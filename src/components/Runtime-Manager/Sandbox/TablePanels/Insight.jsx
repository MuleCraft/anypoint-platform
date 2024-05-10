import { Box, Button, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, Stack, Text, Link, Checkbox } from "@chakra-ui/react";
import { useState } from "react";

export const Ingress = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleRadioClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleApplyChanges = () => {
        setIsModalOpen(false);
        setIsChecked(true); // Mark the radio button as checked when Apply Changes is clicked
    };

    return (
        <Stack display="flex" direction={["column"]} gap={10}>
            <Box>
                <Radio size='lg' name='1' color='boxColor' defaultChecked>
                    <Text fontSize="sm"> Disabled</Text>
                </Radio>
                <Box ml={7} mt={4}>
                    <Text fontSize="sm" textColor="#adadad">Do not store any metadata.</Text>
                </Box>
            </Box>

            <Box>
                <Radio size='lg' name='1' color='boxColor' onClick={handleRadioClick}>
                    <Text fontSize="sm">Metadata</Text>
                </Radio>
                <Box ml={7} mt={4}>
                    <Text fontSize="sm" textColor="#adadad">Store message metadata of every Mule transaction.</Text>
                </Box>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
                    <ModalOverlay />
                    <ModalContent borderRadius={0}>
                        <Box bg="#d1344e" p={4}>
                            <ModalHeader fontSize="xl" fontWeight="200" textColor="white">Enabling Insight</ModalHeader>
                        </Box>
                        <Divider />
                        <ModalCloseButton size="lg" color="#fff" />
                        <ModalBody>
                            <Box display="flex" gap={1} py={5}>
                                <Text fontSize="xs">When Insight is enabled, data processing performance and memory consumption can be significantly impacted. Do not enable Insight for long periods of time in production environments. To monitor a production environment or for everyday monitoring, use the tools listed in the <Text color="boxColor" fontSize="xs" display="inline"><Link>Monitoring Section</Link></Text></Text>
                            </Box>
                            <Box py={5}>
                                <Checkbox borderRadius="0" size='lg' color='boxColor' defaultChecked={isChecked} onChange={handleCheckboxChange}>
                                    yes, I understand
                                </Checkbox>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                borderRadius={0}
                                borderColor={isChecked ? "#ff6c6c" : "gray"}
                                variant="outline"
                                textColor={isChecked ? "#ff6c6c" : "gray"}
                                fontSize="xs"
                                onClick={handleApplyChanges}
                                isDisabled={!isChecked}
                            >
                                Apply Changes
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>

            <Box>
                <Radio size='lg' name='1' color='boxColor' isDisabled>
                    <Text fontSize="sm">Metadata and Replay</Text>
                </Radio>
                <Box ml={7} mt={4}>
                    <Text fontSize="sm" textColor="#adadad">Store message metadata and additional information needed to allow transaction replay.</Text>
                </Box>
            </Box>

        </Stack>
    )
}
