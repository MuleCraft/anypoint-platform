import { Container,HStack,IconButton,Image,Link,Text,Flex, Avatar } from "@chakra-ui/react";
import { SiSalesforce } from "react-icons/si";
import { CiMenuBurger } from "react-icons/ci";
import { RxQuestionMarkCircled } from "react-icons/rx";

export default function PageHeader(){
    return(
        <Flex as="nav" direction={'column'}
            wrap="wrap" position="sticky"
            top={0} left={0} right={0}
            zIndex={1000} boxShadow={'rgba(17, 17, 26, 0.3) 0px 1px 0px;'}
        >
                <HStack h={'28px'} bgColor={'#eef4ff'} padding={'0px 16px'} alignItems={'center'}>
                    <SiSalesforce/>
                    <Text fontSize={'11px'} color={'#5c5c5c'}>Salesforce</Text>
                </HStack>
                <HStack h={'56px'} display={'flex'} justifyContent={'space-between'} p={'0px 16px'}>
                    <HStack maxW={'270px'}>
                        <IconButton variant={'text'} icon={<CiMenuBurger/>}
                            fontSize={'20px'}
                            _hover={{bgColor:'#eaeaea'}} borderRadius={'full'}>
                        </IconButton>
                        <Link href="accounts" display={'flex'} flexDirection={'row'} 
                            alignItems={'center'} justifyContent={'space-evenly'} 
                            _hover={{bgColor:'#eaeaea'}}
                            p={1} borderRadius={'25px'}>
                            <Image src="/Images/accessGear.webp" w={'20%'}/>
                            <Text fontWeight={600} fontSize={'16px'} w={'fit-content'} pr={'12px'}>Access Management</Text>
                        </Link>
                    </HStack>
                    <HStack>
                        <IconButton variant={'text'} icon={<RxQuestionMarkCircled/>}
                            fontSize={'20px'}
                            _hover={{bgColor:'#eaeaea'}} borderRadius={'full'}> 
                        </IconButton>
                        <IconButton variant={'text'} fontSize={'20px'} fontWeight={700} _hover={{bgColor:'#eaeaea'}} borderRadius={'full'}> 
                            <Avatar size={'sm'} bg='teal.500' name='Shanmathy Prabakaran' src='' color={'white'}/>
                        </IconButton>
                    </HStack>
                </HStack>
        </Flex>
    )
}