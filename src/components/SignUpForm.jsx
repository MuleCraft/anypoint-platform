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
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import supabase from "../Utils/supabase";
import EmailVerificationCard from "./EmailVerificationCard";
import { signupFlow } from "../Utils/SignUp";

export default function SimpleCard() {

  const { signupCode } = useParams();
  const loginCode = signupCode || uuidv4();

  const [isChecked, setIsChecked] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [recaptchaError, setRecaptchaError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [userExistsError, setUserExistsError] = useState("");
  const [showEmailVerificationCard, setShowEmailVerificationCard] =
    useState(false);

  const showEmailVerification = () => {
    setShowEmailVerificationCard(true);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setCheckboxError(isChecked ? "Required" : "");
  };
  const handleRecaptchaChange = (value) => {
    setRecaptchaChecked(Boolean(value));
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
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (!value.trim()) {
      setEmailError("");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
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

  const handleCompanyChange = (event) => {
    const value = event.target.value;
    setCompany(value);
    if (value.trim().length < 2) {
      setCompanyError("Use at least 2 characters");
    } else {
      setCompanyError("");
    }
  };

  const handleUserNameChange = (event) => {
    const value = event.target.value;
    setUserName(value);

    if (value.trim().length < 2) {
      setUserNameError("Use at least 3 characters long");
    } else {
      setUserNameError("");
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    let errors = [];

    if (value.length < 8) {
      errors.push("Use at least 8 characters");
    }

    if (!/\d/.test(value)) {
      errors.push("Use at least 1 number");
    }

    if (!/[a-z]/.test(value)) {
      errors.push("Use at least 1 lowercase character");
    }

    if (!/[A-Z]/.test(value)) {
      errors.push("Use at least 1 uppercase character");
    }

    setPasswordError([...errors]);
  };

  const validateForm = () => {
    let isFormValid = true;
    if (!fullName.trim() || fullName.trim().split(" ").length < 2) {
      setFullNameError("Enter your first name and last name");
      isFormValid = false;
    } else {
      setFullNameError("");
    }
    if (!email.trim()) {
      setEmailError("Please enter your email address");
      isFormValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError("Please enter a valid email address");
      isFormValid = false;
    } else {
      setEmailError("");
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

    if (company.trim().length < 2) {
      setCompanyError("Use at least 2 characters");
      isFormValid = false;
    } else {
      setCompanyError("");
    }

    if (username.trim().length < 3) {
      setUserNameError("Use at least 3 characters long");
      isFormValid = false;
    } else {
      setUserNameError("");
    }

    let passwordErrors = [];
    if (password.length < 8) {
      passwordErrors.push("Use at least 8 characters");
    }
    if (!/\d/.test(password)) {
      passwordErrors.push("Use at least 1 number");
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push("Use at least 1 lowercase character");
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push("Use at least 1 uppercase character");
    }
    setPasswordError(passwordErrors);
    if (!recaptchaChecked) {
      setRecaptchaError("Required");
      isFormValid = false;
    } else {
      setRecaptchaError("");
    }

    if (!isChecked) {
      setCheckboxError("Required");
      isFormValid = false;
    } else {
      setCheckboxError("");
    }

    return isFormValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      console.log("Form submitted");
      await addUser();
      showEmailVerification();
    }
  };

  const addUser = async () => {
    const { data, error } = await supabase
      .schema("mc_cap_dev")
      .from("capUsers")
      .select()
      .eq("userEmail", email);

    if (data.length > 0) {
      console.log("Email already exists!");
    } else if (data.length === 0) {
      const { data, error } = await supabase
        .schema("mc_cap_dev")
        .from("capUsers")
        .select()
        .eq("userName", username);
      if (data.length > 0) {
        console.log("User already exists!");
        setUserExistsError("User already exists!");
      } else if (error) {
        console.log("Error confirming user existence.", error);
      } else {
        const signupResponse = signupFlow(fullName,email,phoneNumber,company,username,password,loginCode);
        
        console.log(signupResponse);
      }
    } else {
      console.log("Error confirming user existence.", error);
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
                  {userExistsError ? (
                    <Text className="credential-error">{userExistsError}</Text>
                  ) : (
                    showEmailVerificationCard && (
                      <EmailVerificationCard email={email} 
                       message={"Please check your email to complete the registration process."}/>
                    )
                  )}
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
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      isInvalid={emailError !== ""}
                      style={{ borderColor: emailError ? "#ba0517" : "" }}
                    />
                    {emailError && (
                      <Text className="field-error">{emailError}</Text>
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
                      style={{ borderColor: phoneNumberError ? "#ba0517" : "" }}
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
                      Company
                    </FormLabel>
                    <Input
                      type="text"
                      value={company}
                      onChange={handleCompanyChange}
                      isInvalid={companyError !== ""}
                      style={{ borderColor: companyError ? "#ba0517" : "" }}
                    />
                    {companyError && (
                      <Text className="field-error">{companyError}</Text>
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
                  <FormControl>
                    <FormLabel
                      color="formLabelColor"
                      fontSize="xs"
                      fontFamily="formCompTexts"
                    >
                      Password
                    </FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      isInvalid={passwordError.length > 0}
                      style={{
                        borderColor: passwordError.length > 0 ? "#ba0517" : "",
                      }}
                    />
                    {passwordError.map((error, index) => (
                      <Text key={index} className="field-errorpass">
                        {error}
                      </Text>
                    ))}
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
                      isChecked={isChecked}
                      size="lg"
                      className="checkbox-color"
                      border={isChecked ? "none" : "1px"}
                      onChange={handleCheckboxChange}
                      _hover={{ boxShadow: "0 0 0 0.25em rgba(0,0,0,.12)" }}
                      icon={
                        <CheckIcon
                          sx={{
                            _hover: {
                              color: isChecked ? "inherit" : "#747474",
                              cursor: isChecked ? "inherit" : "pointer",
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
            </Stack>
          </Flex>
        </Stack>
        <AnimateCompForms />
      </Flex>
    </Box>
  );
}
