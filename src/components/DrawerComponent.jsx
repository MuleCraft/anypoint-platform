import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Heading,
  Image,
  HStack,
  ListItem,
  UnorderedList,
  Text,
} from "@chakra-ui/react";
import muleicon from "/Images/mulecommunity.svg";
import accessmanagement from "/Images/access-management-color.svg";
import apiManager from "/Images/api-manager-color.svg";
import designCenter from "/Images/design-center-color.svg";
import exchange from "/Images/xchange-color.svg";
import apiportal from "/Images/api-portal-color.svg";
import visualizer from "/Images/visualizer-color.svg";
import runtime from "/Images/runtime-manager-color.svg";
import monitoring from "/Images/monitoring-color.svg";
import servicemesh from "/Images/playground-color.svg";
import apigov from "/Images/edge-security-color.svg";
import datagraph from "/Images/service-mesh-color.svg";
const DrawerComponent = ({ isOpen, onClose }) => {
  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton mt="7px" borderRadius={"40px"} />
            <DrawerHeader>
              <HStack>
                <Image
                  src={muleicon}
                  alt="mule icon"
                  className="mule-icon"
                ></Image>
                <Heading fontSize="sm" fontWeight="medium">
                  Community Platform
                </Heading>
              </HStack>
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="start" my={6}>
                <Heading fontSize="base">INTEGRATIONS</Heading>
                <UnorderedList
                  listStyleType="none"
                  fontSize="sm"
                  fontWeight={"medium"}
                >
                  <ListItem
                    _hover={{ bg: "#e5e5e5" }}
                    minw="300px"
                    border={"1px solid #fff"}
                    p={1}
                    borderRadius="20px"
                  >
                    <HStack>
                      <Image src={apiportal} alt="code builder icon" />
                      <Text>Code Builder (BETA)</Text>
                    </HStack>
                  </ListItem>
                </UnorderedList>
              </VStack>
              <VStack spacing={4} align="start" my={6}>
                <Heading fontSize="base">APIS</Heading>
                <UnorderedList
                  listStyleType="none"
                  spacing={6}
                  fontSize="sm"
                  fontWeight={"medium"}
                >
                  <ListItem
                    _hover={{ bg: "#e5e5e5" }}
                    minw="300px"
                    border={"1px solid #fff"}
                    p={1}
                    borderRadius="20px"
                  >
                    <HStack>
                      <Image
                        src={designCenter}
                        alt="design center icon"
                      ></Image>
                      <Text>Design Center</Text>
                    </HStack>
                  </ListItem>
                  <ListItem
                    _hover={{ bg: "#e5e5e5" }}
                    minw="300px"
                    border={"1px solid #fff"}
                    p={1}
                    borderRadius="20px"
                  >
                    <HStack>
                      <Image src={exchange} alt="exchange icon" />
                      <Text>Exchange</Text>
                    </HStack>
                  </ListItem>
                  <ListItem
                    _hover={{ bg: "#e5e5e5" }}
                    minw="300px"
                    border={"1px solid #fff"}
                    p={1}
                    borderRadius="20px"
                  >
                    <HStack>
                      <Image src={datagraph} alt="datagraph icon" />
                      <Text> DataGraph</Text>
                    </HStack>
                  </ListItem>
                  <ListItem
                    _hover={{ bg: "#e5e5e5" }}
                    minw="300px"
                    border={"1px solid #fff"}
                    p={1}
                    borderRadius="20px"
                  >
                    <HStack>
                      <Image src={apiManager} alt="api manager icon"></Image>
                      <Text>API Manager</Text>
                    </HStack>
                  </ListItem>
                  <ListItem
                    _hover={{ bg: "#e5e5e5" }}
                    minw="300px"
                    border={"1px solid #fff"}
                    p={1}
                    borderRadius="20px"
                  >
                    <HStack>
                      <Image src={apigov} alt="api gov icon" />
                      <Text> API Governance</Text>
                    </HStack>
                  </ListItem>
                </UnorderedList>
              </VStack>
              <VStack spacing={4} align="start" my={6}>
                <Heading fontSize="base">RUNTIMES</Heading>
                <UnorderedList
                  listStyleType="none"
                  spacing={6}
                  fontSize="sm"
                  fontWeight={"medium"}
                >
                  <ListItem
                    _hover={{ bg: "#e5e5e5" }}
                    minw="300px"
                    border={"1px solid #fff"}
                    p={1}
                    borderRadius="20px"
                  >
                    <HStack>
                      <Image src={runtime} alt="runtime icon" />
                      <Text>Runtime Manager</Text>
                    </HStack>
                  </ListItem>
                  <ListItem
                    _hover={{ bg: "#e5e5e5" }}
                    minw="300px"
                    border={"1px solid #fff"}
                    p={1}
                    borderRadius="20px"
                  >
                    <HStack>
                      <Image src={visualizer} alt="visualizer icon" />
                      <Text>Visualizer</Text>
                    </HStack>
                  </ListItem>
                  <ListItem
                    _hover={{ bg: "#e5e5e5" }}
                    minw="300px"
                    border={"1px solid #fff"}
                    p={1}
                    borderRadius="20px"
                  >
                    <HStack>
                      <Image src={monitoring} alt="monitoring icon" />
                      <Text>Monitoring</Text>
                    </HStack>
                  </ListItem>
                </UnorderedList>
              </VStack>
              <VStack spacing={4} align="start" my={6}>
                <Heading fontSize="base">ADMIN</Heading>
                <UnorderedList
                  listStyleType="none"
                  spacing={6}
                  fontSize="sm"
                  fontWeight={"medium"}
                >
                  <ListItem
                    _hover={{ bg: "#e5e5e5" }}
                    minw="300px"
                    border={"1px solid #fff"}
                    p={1}
                    borderRadius="20px"
                  >
                    <HStack>
                      <Image
                        src={accessmanagement}
                        alt="access management icon"
                      ></Image>
                      <Text>Access Management</Text>
                    </HStack>
                  </ListItem>
                  <ListItem
                    _hover={{ bg: "#e5e5e5" }}
                    minw="300px"
                    border={"1px solid #fff"}
                    p={1}
                    borderRadius="20px"
                  >
                    <HStack>
                      <Image src={servicemesh} alt="secrets manager icon" />
                      <Text>Secrets Manager</Text>
                    </HStack>
                  </ListItem>
                </UnorderedList>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
