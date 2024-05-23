import { Image, Text, VStack } from "@chakra-ui/react";
import EmptyRowsImage from "../../assets/images/NoDataImageCAP.webp";

export default function EmptyRows({ message }) {
    return (
        <VStack>
            <Image src={EmptyRowsImage} w={'10%'} />
            <Text fontSize={14} color={'#5c5c5c'} fontWeight={500}>
                {message}
            </Text>
        </VStack>
    )
}