import { useState } from "react";
import {
  Stack,
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import Nav from "../../components/NavbarHome";
import Sidebar from "../../components/sidebar";
import sections from "./utils/AM-sidebar";
import CreateBusinessGroup from "../../components/AM-Component/CreateBusinessGroup";
import BusinessGroupTable from "../../components/AM-Component/BusinessGroupTable";
import { FiSearch } from "react-icons/fi";

export default function AMBusinessGroup({ name, pathValue }) {
  const [activeItem, setActiveItem] = useState("BusinessGroups");

  const handleItemSelect = (itemName) => {
    setActiveItem(itemName);
  };
  return (
    <>
      <div className="home">
        <Nav name={name} pathValue={pathValue} />
        <div className="Wrapper">
          <Flex>
            <Box>
              <Sidebar
                sections={sections}
                activeItem={activeItem}
                onItemSelect={handleItemSelect}
              />
            </Box>
            <Flex direction="column" ml="200" mt="150" p={"20px 25px"} gap={8}>
              <Stack mt={"-60px"} direction={"row"} spacing={6}>
                <CreateBusinessGroup />
                <Text fontSize={14} color={"#747474"} fontWeight={500}>
                  Business groups are isolated scopes for managing access. Users
                  and teams may access resources in a business group through
                  their permissions.{" "}
                  <Link
                    color={"#0176d3"}
                    textDecoration={"underline"}
                    href="https://docs.mulesoft.com/access-management/business-groups"
                    target="_blank"
                  >
                    Learn more
                  </Link>
                </Text>
                <InputGroup maxW={"fit-content"}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiSearch />}
                    color="gray.500"
                  />
                  <Input placeholder="Filter Business Group" fontSize={14} />
                </InputGroup>
              </Stack>
              <BusinessGroupTable />
            </Flex>
          </Flex>
        </div>
      </div>
    </>
  );
}
