import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Link: {
      variants: {
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
        formButtons: {
          bg: "#0176d3 ",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "600",
          _hover: {
            bg: "#014486",
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
  },
  fontSizes: {
    lg: "20px",
    xl: "30px",
    xs: "13px",
    sm: "16px",
    base: "14px",
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
});

export default theme;
