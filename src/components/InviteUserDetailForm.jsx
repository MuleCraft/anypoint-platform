import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Checkbox,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import "../assets/Common.css";
import ReCAPTCHA from "react-google-recaptcha";
import AnimateCompForms from "./AnimateCompForms";
import supabase from "../Utils/supabase";
import { NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../Utils/AuthProvider";
import { useContext } from "react";

export default function InviteUserDetailForm() {
  const [isCheckedBox, setIsCheckedBox] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const userData = useContext(AuthContext);

  const [username, setUserName] = useState("");

  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [userNameError, setUserNameError] = useState("");

  const [recaptchaError, setRecaptchaError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const { id } = useParams();
  const handleCheckboxChange = () => {
    setIsCheckedBox(!isCheckedBox);

    setCheckboxError(isCheckedBox ? "Required" : "");
  };
  const handleRecaptchaChange = (value) => {
    setRecaptchaChecked(value);

    setRecaptchaError(value ? "" : "Required");
  };

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setFullName(value);

    if (!value.trim() || value.trim().split(" ").length < 2) {
      setFullNameError("Enter your first name and last name");
    } else {
      setFullNameError("");
    }
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);

    if (!value.trim()) {
      setPhoneNumberError("");
    } else if (!/^(\+91[-\s])?[0]?(91)?[6789]\d{9}$/.test(value)) {
      setPhoneNumberError("Please enter a valid phone number");
    } else {
      setPhoneNumberError("");
    }
  };
  const handleUserNameChange = (event) => {
    const value = event.target.value;
    setUserName(value);

    if (value.trim().length < 3) {
      setUserNameError("Use at least 3 characters long");
    } else if (/\s/.test(value)) {
      setUserNameError("Use letters, numbers, hyphens and underscores only");
    } else {
      setUserNameError("");
    }
  };

  const validateForm = () => {
    let isFormValid = true;
    if (!fullName.trim() || fullName.trim().split(" ").length < 2) {
      setFullNameError("Enter your first name and last name");
      isFormValid = false;
    } else {
      setFullNameError("");
    }
    if (!phoneNumber.trim()) {
      setPhoneNumberError("Please enter your phone number");
      isFormValid = false;
    } else if (!/^(\+91[-\s])?[0]?(91)?[6789]\d{9}$/.test(phoneNumber)) {
      setPhoneNumberError("Please enter a valid phone number");
      isFormValid = false;
    } else {
      setPhoneNumberError("");
    }
    if (username.trim().length < 3) {
      setUserNameError("Use at least 3 characters long");
      isFormValid = false;
    } else {
      setUserNameError("");
    }
    if (!recaptchaChecked) {
      setRecaptchaError("Required");
      isFormValid = false;
    } else {
      setRecaptchaError("");
    }
    if (!isCheckedBox) {
      setCheckboxError("Required");
      isFormValid = false;
    } else {
      setCheckboxError("");
    }
    return isFormValid;
  };
  console.log("recaptcha checked status", recaptchaChecked);
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const { data: existingUsers, error: userError } = await supabase
          .schema("mc_cap_develop")
          .from("users")
          .select("*")
          .or(`display_name.eq.${username}`);

        if (userError) {
          console.error("Error checking existing users:", userError.message);
          return;
        }

        if (existingUsers && existingUsers.length > 0) {
          const existingUser = existingUsers[0];
          if (existingUser.display_name === username) {
            setUserNameError("Username already exists");
          }
          return;
        }

        const { data: updateUser, error: updateUserError } =
          await supabase.auth.updateUser({
            data: {
              full_name: fullName,
              role: "User",
              orgid: userData.organizationId
            },
          });
        if (updateUserError) {
          console.error("Error inserting additional details:", error.message);
        } else {
          console.log("Additional details inserted:", updateUser);
        }
        
        console.log('orgId',userData.organizationId);
        const { data, error } = await supabase
          .schema("mc_cap_develop")
          .from("users")
          .upsert([
            {
              id: id,
              full_name: fullName,
              phone: phoneNumber,
              display_name: username,
              recaptcha_verification: "true",
              acceptedterms_verification: "true",
              role: "User",
              organizationId: userData.organizationId
            },
          ]);
        if (error) {
          console.error("Error inserting additional details:", error.message);
        } else {
          console.log("Additional details inserted:", data);
        }
        setSubmissionStatus("success");
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <Box
      className="for-animation"
      position={{ md: "relative" }}
      left={{ base: "0", sm: "0", lg: "0", xl: "200px" }}
    >
      <Flex align="center" justify="center">
        <Stack direction="row" align="center">
          <Flex
            align={"center"}
            justify="center"
            p={{ base: 0, sm: "10", md: "5", ls: "0" }}
          >
            <Stack
              spacing={8}
              mx={"auto"}
              width={{ base: "380px", sm: "420px", md: "500px" }}
              py={12}
              px={{ base: "0", sm: "6" }}
            >
              {submissionStatus === "success" ? (
                <Box
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                  alignItems={"center"}
                  textAlign="center"
                >
                  <Heading fontSize="sm" mb={4}>
                    You have joined the organization
                  </Heading>
                  <Text>You can sign in now.</Text>
                  <Box pt={3}>
                    <NavLink to="/login">
                      <Button variant="formButtons">Sign in</Button>
                    </NavLink>
                  </Box>
                </Box>
              ) : (
                <Box
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                >
                  <Stack spacing={4}>
                    <Stack align={"center"}>
                      <Heading
                        fontSize="lg"
                        fontFamily="formCompTexts"
                        color="customHeadingColor"
                        size="myHeaderSizeForm"
                        fontWeight="medium"
                      >
                        Sign up
                      </Heading>
                    </Stack>
                    <FormControl>
                      <FormLabel
                        color="formLabelColor"
                        fontSize="xs"
                        fontFamily="formCompTexts"
                      >
                        Full name
                      </FormLabel>
                      <Input
                        type="text"
                        value={fullName}
                        onChange={handleFullNameChange}
                        isInvalid={fullNameError !== ""}
                        style={{ borderColor: fullNameError ? "#ba0517" : "" }}
                      />
                      {fullNameError && (
                        <Text className="field-error">{fullNameError}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color="formLabelColor"
                        fontSize="xs"
                        fontFamily="formCompTexts"
                      >
                        Phone number
                      </FormLabel>
                      <Input
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        isInvalid={phoneNumberError !== ""}
                        style={{
                          borderColor: phoneNumberError ? "#ba0517" : "",
                        }}
                      />
                      {phoneNumberError && (
                        <Text className="field-error">{phoneNumberError}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color="formLabelColor"
                        fontSize="xs"
                        fontFamily="formCompTexts"
                      >
                        Username
                      </FormLabel>
                      <Input
                        type="text"
                        value={username}
                        onChange={handleUserNameChange}
                        isInvalid={userNameError !== ""}
                        style={{ borderColor: userNameError ? "#ba0517" : "" }}
                      />
                      {userNameError && (
                        <Text className="field-error">{userNameError}</Text>
                      )}
                    </FormControl>
                    <Flex justify="center">
                      <Box>
                        <ReCAPTCHA
                          sitekey="6LfKDCwmAAAAAGbIrRaYEdmb1B4wJahLeN5GnCbQ"
                          onChange={handleRecaptchaChange}
                        />
                      </Box>
                    </Flex>
                    {recaptchaError && (
                      <Text className="field-error">{recaptchaError}</Text>
                    )}
                    <Flex gap="2" align="center">
                      <Checkbox
                        isCheckedBox={isCheckedBox}
                        size="lg"
                        className="checkbox-color"
                        border={isCheckedBox ? "none" : "1px"}
                        onChange={handleCheckboxChange}
                        _hover={{ boxShadow: "0 0 0 0.25em rgba(0,0,0,.12)" }}
                        icon={
                          <CheckIcon
                            sx={{
                              _hover: {
                                color: isCheckedBox ? "inherit" : "#747474",
                                cursor: isCheckedBox ? "inherit" : "pointer",
                              },
                            }}
                          />
                        }
                      ></Checkbox>
                      <Text fontSize="2xl">
                        I agree to MuleSoft’s{" "}
                        <Link variant="footerLink">terms of service</Link> and{" "}
                        <Link variant="footerLink">privacy policy</Link>.
                      </Text>
                    </Flex>
                    {checkboxError && (
                      <Text className="field-error">{checkboxError}</Text>
                    )}
                    <Button variant="formButtons" onClick={handleSubmit}>
                      Sign up
                    </Button>
                  </Stack>
                </Box>
              )}{" "}
            </Stack>
          </Flex>
        </Stack>
        <AnimateCompForms />
      </Flex>
    </Box>
  );
}
