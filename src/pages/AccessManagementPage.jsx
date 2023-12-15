import { Container, Stack } from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";
import PageSidebar from "../components/PageSidebar";

export default function AccessManagementPage(){
    return(
        <Container minW={'100%'} h={'100vh'} m={0} p={0} display={'flex'} flexDirection={'column'}>
            <PageHeader/>
            <Stack display={'flex'} flex={1} w={'100%'} maxH={'100vh'} h={'100%'}>
                <PageSidebar/>
            </Stack>
        </Container>
    )
}