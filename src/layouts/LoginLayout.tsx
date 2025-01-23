import { FC, useState, useContext, useEffect } from "react";
import { LoginProps } from "./interfaces/LoginInterface";
import { useTranslation } from 'react-i18next';
import { 
   Container,
   NavContainerItens
} from "./styles/LoginLayout";

import { 
   Navbar,
   DropdownContainer, 
   DropdownMenu, 
   DropdownItem,
   DropdownButtonIcon 
} from "../components/components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage, faPalette } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from "styled-components";

const LoginLayout: FC<LoginProps> = ({children, toggleTheme}) => {
   const [languageMenu, setLanguageMenu] = useState<boolean>(false)
   const [themeMenu, setThemeMenu] = useState<boolean>(false)
   const { t, i18n } = useTranslation()
   const theme = useContext(ThemeContext)

   const changeLanguage = (lng: string) => {
      setLanguageMenu(!languageMenu)
      i18n.changeLanguage(lng);
   }

   const handleTheme = (thm: string) => {
      setThemeMenu(!themeMenu)
      toggleTheme(thm)
   }

   useEffect(() => console.log(i18n), [])

   return (
      <Container className="col-12">
         <Navbar className="col-12">
            <NavContainerItens>
               <img src="https://www.medeinstrumentos.com.br/wp-content/uploads/2018/02/logo-weg.png" style={{height: "42px"}} />
            </NavContainerItens>
            <NavContainerItens style={{width: "150px"}}>
               <DropdownContainer>
                  <DropdownButtonIcon style={{width: "80px"}} onClick={() => setThemeMenu(!themeMenu)}>
                     <FontAwesomeIcon icon={faPalette}></FontAwesomeIcon>
                     {t('navbar.theme')}
                  </DropdownButtonIcon>
                  <DropdownMenu isOpen={themeMenu} align="right">
                     <DropdownItem onClick={() => handleTheme('light')}>{t('theme.light')}</DropdownItem>
                     <DropdownItem onClick={() => handleTheme('dark')}>{t('theme.dark')}</DropdownItem>
                  </DropdownMenu>
               </DropdownContainer>
               <DropdownContainer>
                  <DropdownButtonIcon style={{width: "80px"}} onClick={() => setLanguageMenu(!languageMenu)}>
                     <FontAwesomeIcon icon={faLanguage}></FontAwesomeIcon>
                     <label>{String(i18n.language).toUpperCase()}</label>
                  </DropdownButtonIcon>
                  <DropdownMenu isOpen={languageMenu} align="right">
                     <DropdownItem onClick={() => changeLanguage('pt')}>{t('lang.ptbr')}</DropdownItem>
                     <DropdownItem onClick={() => changeLanguage('en')}>{t('lang.en')}</DropdownItem>
                  </DropdownMenu>
               </DropdownContainer>
            </NavContainerItens>
         </Navbar>
         <div className="col-12 content">{children}</div>
      </Container>
   )
}

export default LoginLayout
