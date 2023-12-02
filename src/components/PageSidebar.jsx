import { Container,Tabs, TabList, TabPanels, Tab, TabPanel, Text } from "@chakra-ui/react";
import "../App.css";
import UsersSection from "./UsersSection";

export default function PageSidebar(){

    const tabStyle = {maxHeight:'21px',fontSize:'14px',fontWeight:500,color:'#444',justifyContent:'left',alignItems:'center',margin:'0 0 10px 0',padding:'0 20px',borderInlineStart:'3px solid'};
    const tabSelectedStyle = {fontWeight:700,color:'#0077d4',borderInlineStart:'3px solid #0077d4'};

    return(
        <Container p={'20px 0px'} m={0} borderInlineEnd={'1px solid #e5e5e5'} maxW={'200px'} maxH={'100vh'} h={'100%'}>
            
            <Tabs orientation='vertical' isFitted={true} borderInlineStart={'-5px'}>
                <TabList minW={'200px'} borderInlineEnd={'1px solid #eaeaea'}>
                <Text fontWeight={700} fontSize={'14px'} mb={'20px'} p={'0px 20px'} maxW={'200px'}>Access Management</Text>
                    <Tab sx={tabStyle} _selected={tabSelectedStyle} _
                        hover={{borderInlineStart:'3px solid #0077d4'}} className="sidebar_tab">Users</Tab>
                    <Tab sx={tabStyle} _selected={tabSelectedStyle} 
                        _hover={{borderInlineStart:'3px solid #0077d4'}} className="sidebar_tab">Teams</Tab>
                    <Tab sx={tabStyle} _selected={tabSelectedStyle} 
                        _hover={{borderInlineStart:'3px solid #0077d4'}} className="sidebar_tab">Business Groups</Tab>
                </TabList>
                <TabPanels minW={'800px'} maxH={'100vh'} h={'100%'} display={'flex'} justifyContent={'left'} alignItems={'baseline'}> 
                    <TabPanel p={0}>
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