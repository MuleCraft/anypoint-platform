import { Container,Tabs, TabList, TabPanels, Tab, TabPanel, Text } from "@chakra-ui/react";
import "../App.css";
import UsersSection from "./UsersSection";

export default function PageSidebar(){

    const tabStyle = {height:'21px',fontWeight:400,justifyContent:'left',margin:'0 0 10px 0',padding:'0 20px',borderInlineStart:'3px solid'};

    return(
        <Container p={'20px 0px'}>
            <Text fontWeight={700} mb={'20px'} p={'0px 20px'}>Access Management</Text>
            <Tabs orientation='vertical' isFitted={true} borderInlineStart={'-5px'}>
                <TabList minW={'200px'} borderInlineEnd={'1px solid #eaeaea'}>
                    <Tab sx={tabStyle} _focus={{fontWeight:700}} className="sidebar_tab">One</Tab>
                    <Tab sx={tabStyle} _focus={{fontWeight:700}} className="sidebar_tab">Two</Tab>
                    <Tab sx={tabStyle} _focus={{fontWeight:700}} className="sidebar_tab">Three</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <UsersSection/>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    )
}