import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      border: 0;
   }
   body {
      background: ${props => props.theme.colors.background};
      color: ${props => props.theme.colors.text};
   }
`
