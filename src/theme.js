import { createGlobalStyle } from "styled-components"
import { createMuiTheme } from "@material-ui/core/styles"
import red from "@material-ui/core/colors/red"
import grey from "@material-ui/core/colors/grey"

/**  set up Material UI components to match

If you import and directly use a Material UI component, you'll need to theme
it with our colours to match.

import SomeButton from '@material-ui/core/SomeButton'
import {MaterialUITheme} from '../theme';
....
<MUIThemeProvider theme={MaterialUITheme}>
  <SomeButton/>
</MUIThemeProvider>


https://material-ui.com/customization/color/
example: https://codesandbox.io/embed/308mk7k5x6?fontsize=14

*/
export const MaterialUITheme = createMuiTheme({
    palette: {
        primary: red,
        secondary: grey
    }
})

const theme = {
    font: {
        // http://www.modularscale.com/?1&em&1.333
        size: {
            xxxxl: "6rem",
            xxxl: "3.157rem",
            xxl: "2.369rem",
            xl: "1.777rem",
            l: "1.333rem",
            m: "1rem",
            s: "0.8rem"
        },

        space: {
            l: "0.1rem",
            m: "0.05rem"
        }
    },

    space: {
        xl: "8rem",
        l: "4rem",
        m: "1.8rem",
        s: "0.7rem",
        xs: "0.3rem",
        icon: "1.2rem"
    },

    opacity: {
        l: 0.8,
        m: 0.5,
        s: 0.3,
        disable: 0.3
    },

    // moved all shadows up a lvl as small shadows are hard to see on dark blue background
    boxShadow: {
        xl: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
        l: "0 10px 20px  rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        m: "0 3px 6px    rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        s: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",

        inset: {
            xl:
                "inset 0 19px 38px rgba(0,0,0,0.30), inset 0 15px 12px rgba(0,0,0,0.22)",
            l:
                "inset 0 10px 20px  rgba(0,0,0,0.19), inset 0 6px 6px rgba(0,0,0,0.23)",
            m:
                "inset 0 3px 6px    rgba(0,0,0,0.16), inset 0 3px 6px rgba(0,0,0,0.23)",
            s:
                "inset 0 1px 3px rgba(0,0,0,0.12), inset 0 1px 2px rgba(0,0,0,0.24)"
        }
    },

    scale: {
        l: 2,
        m: 1.2,
        s: 1.04
    }
}

// add global styles
export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  * {
    margin: 0;
	  padding: 0;
	  border: none;
    box-sizing: border-box;
    vertical-align: baseline;
	  font-size: 100%;
    font-family: 'Roboto';
    font-weight: inherit;
  }

  html {
    font-weight: 300;

  ${"" /* setting rem values */}
    font-size: 16px;
    @media (max-width: 900px) { font-size: 13px; }
    @media (max-width: 600px) { font-size: 12px; }
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
    display: flex;
    overflow-x: hidden;
  }

  #root {
    padding: 0;
    flex-direction: column;
    &>*:not(:last-child) { margin-bottom: ${theme.space.m}; }
    background: #efefef;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    /* remove pixels below display: inline */
    display: inline-block;
  }

  p {
    /* You should have around 60 characters per line if you want a good reading experience */
    max-width: calc(11 * 48px);
  }

  ul,
  ol {
    list-style: none;
  }

  iframe {
    /* remove pixels below display: inline */
    display: block;
    /* so imgs will resize based on wrapper constraints */
    ${"" /* max-width: 100%; */}
    /* prevent image from stretching due to 'align-self: default' value is stretch (in flexbox context) */
    align-self: center;
  }

  a {
    text-decoration: none;
    color: inherit;
    outline: none;
  }

  p {
    a {
      padding: 0;
      display: inline-flex;
    }
  }

  b {
    font-weight: bold;
  }

  img {
    max-width: 100%;
    /* remove pixels below display: inline */
    display: block;
    /* prevent image from stretching due to 'align-self: default' value is stretch (in flexbox context) */
    align-self: center;
  }

  button {
    padding: ${theme.space.s};
    /* remove pixels below display: inline */
    display: inline-flex;
    justify-content: center;
    align-items: center;

  ${"" /* color was being set to black */}
    color: inherit;
  ${"" /* material-UI was adding default border-radius */}
    border-radius: 0;
    cursor: pointer;
    background: none;

  ${
      "" /* if using this, ensure to use an alternative for disability software */
  }
    :focus {
      outline: none;
    }
  }

  input,
  textarea {
    cursor: pointer;
  }

  input {
    color: inherit;
    background-color: transparent;
  }

  textarea {
    resize: vertical;
  }

  svg {
    width: 100%;
  }

  
  [disabled] {
    cursor: pointer;
    pointer-events: none;
    opacity: 0.3;
  }
  a[disabled] {
    cursor: pointer;
    pointer-events: none;
    opacity: 1;
  }

  input,
  textarea,
  select,
  input:hover,
  textarea:hover,
  select:hover,
  input:focus,
  textarea:focus,
  select:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-animation: autofill 0s forwards;
    animation: autofill 0s forwards;

    ${
        "" /* if using this, ensure to use an alternative for disability software */
    }
    outline: none;
  }

  @keyframes autofill {
    100% {
        color: inherit;
    }
  }

  @-webkit-keyframes autofill {
      100% {
          color: inherit;
      }
  }

${
    "" /* material design icons ---------------------------------------------------------- */
}
${"" /* http://google.github.io/material-design-icons/#getting-icons */}
  .material-icons.md-18 { font-size: 18px; }
  .material-icons.md-24 { font-size: 24px; }
  .material-icons.md-36 { font-size: 36px; }
  .material-icons.md-48 { font-size: 48px; }

  /* Rules for using icons as black on a light background. */
  .material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }
  .material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }

  /* Rules for using icons as white on a dark background. */
  .material-icons.md-light { color: rgba(255, 255, 255, 1); }
  .material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }


  /* header input override */
  .characterNameInput {
    div {
      color: white;
      border-color: white;
    }
    .MuiInput-underline::before{
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-bottom: 1px solid rgba(255, 255, 255, 0.42);
    }
    .MuiInput-underline::after{
      transition: transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
      border-bottom: 2px solid #d32f2f;
    }
  }
`

export default theme
