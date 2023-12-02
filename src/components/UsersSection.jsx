import { Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

export default function UsersSection(){
    return(
        <Container>
            <Tabs>
            <TabList>
                <Tab>Users</Tab>
                <Tab>Pending Invitations</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                <p>one!</p>
                </TabPanel>
                <TabPanel>
                <p>two!</p>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Container>
    )
}