import { Stack, Box, Input, CloseButton, Textarea, ButtonGroup, Button } from "@chakra-ui/react"
import { useState } from "react";

export const Properties = () => {
    const [view, setView] = useState();
    return (
        <>
            <Box p={4}>
                <ButtonGroup isAttached variant="outline" >
                    <Button
                        borderRadius="0"
                        borderWidth={8}
                        color="#414141"
                        variant={view === 'table' ? 'outline' : 'solid'}
                        onClick={() => setView('table')}
                        fontSize="xs"
                    >
                        Table view
                    </Button>
                    <Button
                        borderRadius="0"
                        borderWidth={8}
                        color="#414141"
                        variant={view === 'text' ? 'outline' : 'solid'}
                        onClick={() => setView('text')}
                        fontSize="xs"
                    >
                        Text view
                    </Button>
                </ButtonGroup>

                {view === 'table' ? (
                    <Box pt={4} backgroundColor="white">
                        <Stack display="flex" direction={["column", "row"]} alignItems="center" >
                            <Box width="45%" p={2}>
                                <Input bgColor="#f4f5f6" variant='filled' value="anypoint.platform.config.analytics.agent.enabled" borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Name' size='sm' height="40px" />
                            </Box>
                            <Box width="60%" p={2}>
                                <Input bgColor="#f4f5f6" value="true" variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Name' size='sm' height="40px" />
                            </Box>
                            <CloseButton size='lg' color="#cacbcc" />
                        </Stack >
                        <Stack display="flex" direction={["column", "row"]} alignItems="center" >
                            <Box width="46%" p={2}>
                                <Input bgColor="#f4f5f6" variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Key' size='sm' height="40px" />
                            </Box>
                            <Box width="65%" p={2}>
                                <Input bgColor="#f4f5f6" variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Value' size='sm' height="40px" />
                            </Box>

                        </Stack >
                    </Box>
                ) : (
                    <Box pt={4} backgroundColor="white">
                        <Textarea bgColor="#f4f5f6" value="anypoint.platform.config.analytics.agent.enabled=true" borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} size='sm' height="200px" />
                    </Box>
                )}
            </Box>


        </>
    )
}
