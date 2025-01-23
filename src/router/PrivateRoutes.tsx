import React, { FC, useContext, useEffect, useState } from "react";

import { Navigate, useLocation, Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { isInitialLoading, isLoaded, isNotRequested } from "../context/utils";
import { DropdownButton, DropdownButtonIcon, DropdownContainer, DropdownItem, DropdownMenu, FlexContainer, Navbar, Overlay, SidebarContainer, SidebarMenu, SidebarMenuItem } from "../components/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faPalette } from "@fortawesome/free-solid-svg-icons";
import { NavContainerItens } from "../layouts/styles/LoginLayout";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "styled-components";

interface Props {
   toggleTheme: (theme: string) => void
}

const PrivateRoutes: FC<Props> = ({toggleTheme}) => {
   const [userMenu, setUserMenu] = useState(false)
   const [sideMenu, setSideMenu] = useState(false)
   const [languageMenu, setLanguageMenu] = useState<boolean>(false)
   const [themeMenu, setThemeMenu] = useState<boolean>(false)
   const { fetchUser, user } = useAuth()
   const  location = useLocation()
   const userIsNotRequested = isNotRequested(user)
   const { t, i18n } = useTranslation()
   const navigate = useNavigate();

   const handleLogout = () => {
      navigate('/logout')
   }
   
   const theme = useContext(ThemeContext)

   const changeLanguage = (lng: string) => {
      setLanguageMenu(!languageMenu)
      i18n.changeLanguage(lng);
   }

   const handleTheme = (thm: string) => {
      setThemeMenu(!themeMenu)
      toggleTheme(thm)
   }

   useEffect(() => {
      if(userIsNotRequested) {
         fetchUser()
         console.log(user)
      }
   }, [userIsNotRequested, fetchUser])

   if(isLoaded(user)) {
      let userName = ''
      
      if(user.item?.firstName) {
         userName += user.item.firstName 
      }

      if(user.item?.lastName) {
         if(userName) {
            userName += ` ${user.item.lastName}`
         } else {
            userName += user.item.firstName
         }
      }

      if(!userName) {
         userName = user.item?.email || 'Ghest'
      }

      return (
         <FlexContainer className="col-12">
            <Overlay isOpen={sideMenu} onClick={() => setSideMenu(!sideMenu)} />

            <SidebarContainer isOpen={sideMenu}>
               <SidebarMenu>
                  <SidebarMenuItem onClick={handleLogout}>Logout</SidebarMenuItem>
               </SidebarMenu>
            </SidebarContainer>
            
            <Navbar className="col-12">
               <DropdownContainer>
                  <DropdownButton onClick={() => setSideMenu(!sideMenu)}>Menu</DropdownButton>
                  <DropdownButton onClick={() => setUserMenu(!userMenu)}>{user.item?.firstName}</DropdownButton>
                  <DropdownMenu align="left" isOpen={userMenu}>
                     <DropdownItem>Profile</DropdownItem>
                     <DropdownItem>Logout</DropdownItem>
                  </DropdownMenu>
               </DropdownContainer>
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
            <div>
               <Outlet />
            </div>
         </FlexContainer>
      )
   }
   
   if(isInitialLoading(user)) {
      return (<div className="text-center mt-5"><div role="status" className="Spinner"/></div>)
   }
   
   return (<Navigate to="/login" state={{ from: location }} replace />)
}

export default PrivateRoutes
