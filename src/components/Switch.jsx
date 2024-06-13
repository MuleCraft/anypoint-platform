import { useState } from 'react';
import { Box, Switch, Flex } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const CustomSwitch = () => {
    const [isChecked, setIsChecked] = useState(false);
    const handleToggle = () => setIsChecked(!isChecked);

    return (
        <Flex alignItems="center">
            <Box position="relative" display="inline-block" w="52px"
                h="37px"
                width="62px"
                borderWidth={isChecked ? "3px" : ""}
                borderRadius="20px"
                _hover={{ borderColor: 'boxColor' }}
                _focus={{ outline: 'none' }}
            >
                <Switch
                    id="custom-switch"
                    size="lg"
                    isChecked={isChecked}
                    onChange={handleToggle}
                    display="inline-block"
                    w="52px"
                    h="25px"
                    left="3px"
                    sx={{
                        'span.chakra-switch__track': {
                            background: isChecked ? 'boxColor' : '#c9c9c9',
                            borderRadius: '20px',
                            position: 'relative',
                            transition: 'background-color 0.2s',
                        },
                        'span.chakra-switch__thumb': {
                            width: '22px',
                            height: '22px',
                            backgroundColor: isChecked ? 'white' : 'white',
                            borderRadius: '50%',
                            transition: 'transform 0.2s, background-color 0.2s',
                            transform: isChecked ? 'translateX(26px)' : 'translateX(2px)',
                        },
                    }}
                />
                {isChecked && (
                    <Box
                        position="absolute"
                        top="10px"
                        left="10px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        zIndex="1"
                    >
                        <CheckIcon color="white" w={3} h={3} />
                    </Box>
                )}
            </Box>
        </Flex>
    );
};

export default CustomSwitch;
