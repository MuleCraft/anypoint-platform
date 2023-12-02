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
  HStack,
  Center,
  Link,
  Container,
} from "@chakra-ui/react";
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
import datagraph from "/Images/service-mesh-color.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function HomeMain() {
  const settings = {
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };
  return (
    <>
      <Stack
        direction={{ base: "column", lg: "row" }}
        justify="center"
        alignItems="center"
        spacing={16}
      >
        <VStack spacing="8" p={2} mt={5}>
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
        </VStack>
        <Box p={10} bg={"#f3f3f3"} maxH={"1000px"} minH={"650px"}>
          <Heading py={2}>Management Center</Heading>
          <Divider />
          <VStack spacing={8} pt={5} align="stretch">
            <Flex alignItems="center" gap={2}>
              <Image src={apiManager} />
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
            <Flex alignItems="center" gap={2}>
              <Image src={accessmanagement} />
              <Box flex="1">
                <Heading fontSize="sm">Access Management</Heading>
                <Text>Manage users, business groups, and audit logs.</Text>
              </Box>
              <ArrowForwardIcon />
            </Flex>
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

      <Stack
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-around"
        spacing="10"
        mt={20}
        mb={10}
      >
        <Link>Documentation</Link>
        <Link>Forums</Link>
        <Link>Help center</Link>
        <Link>Training</Link>
      </Stack>
    </>
  );
}
