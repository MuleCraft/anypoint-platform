import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Link: {
      variants: {
        heroSetupLink: {
          _hover: {
            color: "#0176d3",
            textDecoration: "none",
          },
        },
        formlink: {
          color: "#747474",
          textDecoration: "underline",
          _hover: {
            color: "#444444;",
          },
        },
        footerLink: {
          textDecoration: "underline",
        },
        useCustomForgotLink: {
          _hover: {
            textDecoration: "none",
          },
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: 'blue.500',
            borderColor: 'blue.500',
            color: 'white',
          },
          _disabled: {
            opacity: 1,
            _checked: {
              bg: 'blue.500',
              borderColor: 'blue.500',
              color: 'white',
            },
          },
        },
      },
    },
    Button: {
      variants: {
        signinout: {
          border: "1px solid #fff",
          color: "#fff",
          fontWeight: "600",
          fontSize: "14px",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
        },
        hideShow: {
          color: "#747474",
          fontSize: "12px",
          _hover: {
            color: "#0176d3",
          },
        },
        formButtons: {
          bg: "#0176d3",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "600",
          _disabled: {
            bg: "#0176d3",
            opacity: "0.4",
            _hover: {
              bg: "#0176d3",
              opacity: "0.4",
            },
          },
          _hover: {
            bg: "#014486",
          },
        },
        DeleteButtonFilled: {
          bg: "#ba0517",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "600",
          _disabled: {
            bg: "#ba0517",
            opacity: "0.4",
            _hover: {
              bg: "#ba0517",
              opacity: "0.4",
            },
          },
          _hover: {
            bg: "#ba0517",
          },
        },
        DeleteButtons: {
          borderColor: "#ba0517",
          border: "1px solid ",
          color: "#ba0517",
          fontSize: "14px",
          fontWeight: "600",
          _disabled: {
            bg: "#ba0517",
            opacity: "0.4",
            _hover: {
              bg: "#ba0517",
              opacity: "0.4",
            },
          },
          _hover: {
            bg: "#ba0517",
            color: "#fff"
          },
        },
        homePageButtons: {
          border: "1px solid ",
          borderColor: "#c9c9c9",
          fontSize: "1rem",
          color: "#2e2e2e",
          borderRadius: "4px",
          _hover: {
            bg: "#f3f3f3",
          },
        },
      },
    },
    Input: {
      variants: {
        text: {
          field: {
            width: "100%",
            border: "1px solid #747474;",
            borderRadius: "4px",
            _focus: {
              borderColor: "#0176d3",
              boxShadow: "#ffffff 0px 0px 0px 2px, #0176d3 0px 0px 0px 4px",
            },
          },
        },
      },
      defaultProps: {
        variant: "text",
      },
    },
  },
  fonts: {
    formCompTexts:
      "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
  },
  colors: {
    customHeadingColor: "#5C5C5C",
    formLabelColor: "#747474",
    forWhiteText: "#fff",
    linkTestUseDomain: "#444444",
    hovercolorHome: "#e5e5e5",
    profileTextIcon: "#06a59a",
    navText: "#2e2e2e",
    boxColor: "#0376d3",
    modelColor: "#f3f3f3",
    textColor: "#9e9e9e",
    activeColor: "#6b8a99",
    delete: "#ba0517"
  },
  fontSizes: {
    lg: "20px",
    xl: "30px",
    xs: "13px",
    sm: "16px",
    base: "14px",
    "2xl": "12px",
    "4xl": "10px"
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
});

export default theme;
