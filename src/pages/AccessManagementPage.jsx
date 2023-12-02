import { Container, Stack } from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";
import PageSidebar from "../components/PageSidebar";

export default function AccessManagementPage(){
    return(
        <Container minW={'100%'} m={0} p={0} display={'flex'} flexDirection={'column'}>
            <PageHeader/>
            <Stack>
                <PageSidebar/>
            </Stack>
        </Container>
    )
}