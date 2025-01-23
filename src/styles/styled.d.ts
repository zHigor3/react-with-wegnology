import "styled-components";

declare module 'styled-components' {
   export interface DefaultTheme {
      title: string,
      colors: {
         primary: string,
         primaryHover: string,
         secondary: string,
         secondaryHover: string,
         tertiary: string,
         tertiaryHover: string,
         quaternary: string,
         quaternaryHover: string,
         background: string,
         text: string,
         white: string,
         black: string
      },
      font: {
         small: string,
         medium: string,
         large: string
      },
      alert: {
         success: string,
         successHover: string,
         warning: string,
         warningHover: string,
         error: string,
         errorHover: string,
         info: string,
         infoHover: string,
      }
   }
}
