import {
  Heading,
  Image,
  Stack,
  Text,
  Flex,
  Button,
  Box,
  VStack,
  Divider,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import accessmanagement from "/Images/access-management-color.svg";
import apiManager from "/Images/api-manager-color.svg";
import designCenter from "/Images/design-center-color.svg";
import exchange from "/Images/xchange-color.svg";
import apiportal from "/Images/api-portal-color.svg";
import platform from "/Images/platform-services-color.svg";
import visualizer from "/Images/visualizer-color.svg";
import runtime from "/Images/runtime-manager-color.svg";
import monitoring from "/Images/monitoring-color.svg";
import servicemesh from "/Images/playground-color.svg";
import apigov from "/Images/edge-security-color.svg";
import { LiaUserGraduateSolid } from "react-icons/lia";
import { PiChatsFill, PiBookOpenText } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/Common.css";
import Slider from "react-slick";
export default function HomeMain() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    vertical: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <Stack
        direction={{ base: "column", lg: "row" }}
        justify="center"
        alignItems={{ base: "center", lg: "flex-start" }}
        spacing={16}
      >
        <VStack spacing="10" p={2} mt={5}>
          <Flex justifyContent="center" alignItems="flex-start" gap="5">
            <Image src={apiportal} alt="code builder" height="40px" />
            <Flex direction="column" align="flex-start" gap="2">
              <Heading fontSize="xl">Anypoint Code Builder</Heading>
              <Text maxW="350px" minW="280px">
                Design, develop, and deploy APIs and integrations.
              </Text>
              <Button variant="homePageButtons">Coming soon</Button>
            </Flex>
          </Flex>
          <Flex justifyContent="center" alignItems="flex-start" gap="5">
            <Image src={designCenter} alt="code builder" height="40px" />
            <Flex direction="column" align="flex-start" gap="2">
              <Heading fontSize="xl">Design Center</Heading>
              <Text maxW="350px">
                Get started creating Mule applications and APIs. Create visual
                flows, and build, test, and reuse API specifications and
                fragments.
              </Text>
              <Button variant="homePageButtons">Coming soon</Button>
            </Flex>
          </Flex>
          <Flex justifyContent="center" alignItems="flex-start" gap="5">
            <Image src={exchange} alt="code builder" height="40px" />
            <Flex direction="column" align="flex-start" gap="2">
              <Heading fontSize="xl">Exchange</Heading>
              <Text maxW="350px">
                Discover and share reusable APIs, connectors, and templates.
              </Text>
              <Button variant="homePageButtons">Coming soon</Button>
            </Flex>
          </Flex>
          <Flex justifyContent="center" alignItems="flex-start" gap="5">
            <Image src={platform} alt="code builder" height="40px" />
            <Flex direction="column" align="flex-start" gap="2">
              <Heading fontSize="xl">Anypoint Studio</Heading>
              <Text maxW="350px">
                The desktop IDE for building and testing APIs and integrations
                for Anypoint Platform.
              </Text>
              <Button variant="homePageButtons">Coming soon</Button>
            </Flex>
          </Flex>
          <Box
            maxW="450px"
            bg="#eef4ff"
            p={4}
            border="1px solid #eef4ff"
            _hover={{ borderColor: "#014486" }}
            className="Slide_comp"
          >
            <Slider {...sliderSettings}>
              <VStack
                spacing="60px"
                align="center"
                minheight="200px"
                width="100%"
              >
                <HStack>
                  <PiBookOpenText />
                  <Heading fontSize="sm">Tutorials</Heading>
                </HStack>
                <Box maxh="130">
                  <Flex gap="2">
                    <Heading fontSize="sm">
                      Getting started with MuleSoft - Hello Mule
                    </Heading>
                    <ArrowForwardIcon color="#014486" className="arrow-slide" />
                  </Flex>
                  <Text fontSize="2xl" maxW="430px">
                    First time using MuleSoft? Build an API in under 10 minutes
                    and deploy it to CloudHub.
                  </Text>
                </Box>
              </VStack>
              <VStack
                spacing="60px"
                align="center"
                minheight="200px"
                width="100%"
              >
                <HStack>
                  <PiBookOpenText />
                  <Heading fontSize="sm">Tutorials</Heading>
                </HStack>
                <Box maxh="110">
                  <Flex gap="2">
                    <Heading fontSize="sm">
                      Learn DataWeave with the DataWeave Playground.
                    </Heading>
                    <ArrowForwardIcon color="#014486" className="arrow-slide" />
                  </Flex>
                  <Text fontSize="2xl" maxW="430px">
                    The DataWeave playground enables developers to create mock
                    data transformations in their web browser based on an input
                    payload.
                  </Text>
                </Box>
              </VStack>
            </Slider>
          </Box>
        </VStack>
        <Box
          p={10}
          bg={"#f3f3f3"}
          maxH={"1000px"}
          minH={"650px"}
          border="1px solid #f3f3f3"
          borderRadius="10px"
          mt={10}
        >
          <Heading py={2}>Management Center</Heading>
          <Divider color="#747474" />
          <VStack spacing={8} pt={5} align="stretch">
            <Flex alignItems="center" gap={2}>
              <Image src={apiManager} alt="api-manager" />
              <Box flex="1">
                <Heading fontSize="sm">API Manager</Heading>
                <Text>
                  Manage clients, policies, SLAs, traffic, and alerts.
                </Text>
              </Box>
              <ArrowForwardIcon />
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Image src={apigov} />
              <Box flex="1">
                <Heading fontSize="sm">API Governance</Heading>
                <Text>Govern and monitor API conformance.</Text>
              </Box>
              <ArrowForwardIcon />
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Image src={runtime} />
              <Box flex="1">
                <Heading fontSize="sm">Runtime Manager</Heading>
                <Text>Deploy, manage, and monitor deployed applications.</Text>
              </Box>
              <ArrowForwardIcon />
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Image src={visualizer} />
              <Box flex="1">
                <Heading fontSize="sm">Visualizer</Heading>
                <Text>Visualize your Application Network.</Text>
              </Box>
              <ArrowForwardIcon />
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Image src={monitoring} />
              <Box flex="1">
                <Heading fontSize="sm">Monitoring</Heading>
                <Text>Create alerts for and troubleshoot applications.</Text>
              </Box>
              <ArrowForwardIcon />
            </Flex>
            <ChakraLink
              as={ReactRouterLink}
              to="/accounts/users"
              className="home-main__index"
            >
              <Flex alignItems="center" gap={2}>
                <Image src={accessmanagement} />
                <Box flex="1">
                  <Heading fontSize="sm">Access Management</Heading>
                  <Text className="home-main__indexText">
                    Manage users, business groups, and audit logs.
                  </Text>
                </Box>
                <ArrowForwardIcon className="arrow-movment" />
              </Flex>
            </ChakraLink>
            <Flex alignItems="center" gap={2}>
              <Image src={servicemesh} />
              <Box flex="1">
                <Heading fontSize="sm">Secrets Manager</Heading>
                <Text>Manage public keys for SSL communication.</Text>
              </Box>
              <ArrowForwardIcon />
            </Flex>
          </VStack>
        </Box>
      </Stack>
      <Box mt="100px" mb="100px">
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-evenly"
        >
          {" "}
          <ChakraLink fontWeight="medium" variant="heroSetupLink">
            <HStack>
              <PiBookOpenText />
              <Text fontSize="xs">Documentation</Text>
            </HStack>
          </ChakraLink>
          <ChakraLink fontWeight="medium" variant="heroSetupLink">
            <HStack>
              <PiChatsFill />
              <Text fontSize="xs"> Forums</Text>
            </HStack>
          </ChakraLink>
          <ChakraLink fontWeight="medium" variant="heroSetupLink">
            <HStack>
              {" "}
              <BiSupport />
              <Text fontSize="xs"> Help center</Text>
            </HStack>
          </ChakraLink>
          <ChakraLink fontWeight="medium" variant="heroSetupLink">
            <HStack>
              <LiaUserGraduateSolid />
              <Text fontSize="xs"> Training</Text>
            </HStack>
          </ChakraLink>
        </Stack>
      </Box>
    </>
  );
}
