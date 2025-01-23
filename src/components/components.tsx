import styled from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export const FlexContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
`

export const Navbar = styled.div`
   height: 60px;
   background-color: ${props => props.theme.colors.primary};
   color: ${props => props.theme.colors.text};
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 16px 0 16px;
   position: fixed;
`

export const DropdownContainer = styled.div`
   position: relative;
   display: inline-block;
`

export const DropdownButton = styled.button`
   background-color: ${props => props.theme.colors.tertiary};
   color: ${props => props.theme.colors.white};
   padding: 8px;
   font-size: ${props => props.theme.font.small};
   border-radius: 8px;
   cursor: pointer;
   transition: background-color 0.3s;

   &:hover {
      background-color: ${props => props.theme.colors.tertiaryHover};
   }
`

export const DropdownButtonIcon = styled.button`
   background-color: transparent;
   border: 0;
   padding: 8px;
   cursor: pointer;
   color: ${props => props.theme.colors.white};
   font-size: ${props => props.theme.font.medium};
`

export const DropdownMenu = styled.div<{isOpen: boolean, align: string}>`
   position: absolute;
   top: 100%;
   ${({ align }) => {
      if (align === 'middle') return 'left: 50%; transform: translateX(-50%);';
      if (align === 'right') return 'right: 0;';
      return 'left: 0;';
   }}
   background-color: ${props => props.theme.colors.background};
   box-shadow: 0 4px 6px ${props => props.theme.title === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.3)'};
   min-width: 150px;
   z-index: 10;
   opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
   transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
   transition: opacity 0.3s ease, transform 0.3s ease;
   visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`

export const DropdownItem = styled.button`
   width: 100%;
   padding: 10px 15px;
   background: none;
   border: none;
   text-align: left;
   cursor: pointer;
   font-size: 14px;
   color: ${props => props.theme.colors.text};

   &:hover {
      background-color: #eee;
      transition: 0.3s;
   }
`

/* input ------------------------------------------------------------- */
const InputContainer = styled.div`
   display: flex;
   align-items: center;
   background-color: ${props => props.theme.colors.background};
   border: 1px solid ${props => props.theme.colors.primary};
   border-radius: 8px;
   padding: 0.5rem;

   &:focus-within {
      border: 1px solid ${props => props.theme.colors.tertiary};
   }
`;

const IconWrapper = styled.div`
   color: ${props => props.theme.colors.text};
   margin-right: 0.5rem;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 30px;
   width: 30px;
`;

const StyledInput = styled.input`
   border: none;
   outline: none;
   background: none;
   flex: 1;
   font-size: 1rem;
   flex-grow: 1;
   color: ${props => props.theme.colors.text};

   &::placeholder {
      color: ${props => props.theme.colors.text};
   }
`;

interface InputWithIconProps {
   placeholder: string;
   col: string
   type?: string
   icon: IconProp
   value: any
   onChange: (value: any) => void
}

export const InputWithIcon: React.FC<InputWithIconProps> = ({ placeholder, icon, col, type, onChange }) => {
   return (
      <InputContainer className={col}>
         <IconWrapper>
            <FontAwesomeIcon icon={icon} />
         </IconWrapper>
         <StyledInput type={type ? type : 'text'} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      </InputContainer>
   );
};
/* input ------------------------------------------------------------- */

export const SolidButton = styled.button`
   background-color: ${props => props.theme.colors.primary};
   border-radius: 8px;
   padding: 8px;
   color: ${props => props.theme.colors.white};
   font-size: ${props => props.theme.font.medium};

   &:hover {
      background-color: ${props => props.theme.colors.primaryHover};
      transition: 0.3s;
   }
`

export const FlatButton = styled.button`
   background-color: ${props => props.theme.colors.background};
   color: ${props => props.theme.colors.tertiary};
   border-radius: 8px;
   padding: 8px;
   font-size: ${props => props.theme.font.medium};
   border: 2px solid ${props => props.theme.colors.tertiary};

   &:hover {
      border: 2px solid ${props => props.theme.colors.tertiaryHover};
      transition: 0.3s;
   }
`

/* alert ------------------------------------------------------------- */
const AlertContainer = styled.div<{visible: boolean, typeAlert: 'error' | 'info' | 'warning' | 'success'}>`
   position: fixed;
   top: 20px;
   right: 20px;
   max-width: 300px;
   background-color: ${({typeAlert}) => {
      if(typeAlert === 'error') return props => props.theme.alert.errorHover
      if(typeAlert === 'warning') return props => props.theme.alert.warningHover
      if(typeAlert === 'info') return props => props.theme.alert.infoHover
      if(typeAlert === 'success') return props => props.theme.alert.successHover
      return 'transparent';
   }};
   color: ${({typeAlert}) => {
      if(typeAlert === 'error') return props => props.theme.alert.error
      if(typeAlert === 'warning') return props => props.theme.alert.warning
      if(typeAlert === 'info') return props => props.theme.alert.info
      if(typeAlert === 'success') return props => props.theme.alert.success
      return 'transparent';
   }};
   font-weight: 600;
   padding: 16px;
   border-radius: 8px;
   border: 1px solid ${({typeAlert}) => {
      if(typeAlert === 'error') return props => props.theme.alert.error
      if(typeAlert === 'warning') return props => props.theme.alert.warning
      if(typeAlert === 'info') return props => props.theme.alert.info
      if(typeAlert === 'success') return props => props.theme.alert.success
      return 'transparent';
   }};
   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
   opacity: ${(props) => (props.visible ? 1 : 0)};
   transform: ${(props) => (props.visible ? "translateY(0)" : "translateY(-20px)")};
   transition: opacity 0.3s ease, transform 0.3s ease;
   z-index: 1000;
`

interface AlertNotificationProps {
   message: string | null; // Mensagem de erro, null se não houver
   typeAlert: 'error' | 'info' | 'warning' | 'success'
   duration?: number; // Duração em milissegundos antes de desaparecer
 }
 
export const AlertNotification: React.FC<AlertNotificationProps> = ({ message, duration = 3000, typeAlert }) => {
   const [visible, setVisible] = useState(false);
 
   useEffect(() => {
      console.log("ERROR -> ",message,typeAlert)
      if (message) {
         setVisible(true);
   
         const timer = setTimeout(() => {
            setVisible(false);
         }, duration);
   
         return () => clearTimeout(timer);
      }
   }, [message, duration]);
 
   return (
      <AlertContainer visible={visible} typeAlert={typeAlert}>
         {message}
      </AlertContainer>
   );
};

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
   position: fixed;
   top: 0;
   left: 0;
   height: 100%;
   width: 250px;
   background-color: ${props => props.theme.colors.background};
   color: ${props => props.theme.colors.text};
   padding-top: 50px;
   transition: transform 0.3s ease;
   transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
   z-index: 1000;
`;

export const SidebarButton = styled.button`
   position: absolute;
   top: 20px;
   right: -50px;
   background-color: ${props => props.theme.colors.primary};
   color: ${props => props.theme.colors.white};
   padding: 10px;
   border: none;
   cursor: pointer;
   border-radius: 50%;
   transition: background-color 0.3s;

   &:hover {
      background-color: ${props => props.theme.colors.primaryHover};
   }
`;

export const SidebarMenu = styled.ul`
   list-style: none;
   padding: 0;
   margin: 0;
`;

export const SidebarMenuItem = styled.li`
   padding: 15px;
   cursor: pointer;
   font-size: 18px;
   transition: background-color 0.3s;

   &:hover {
      background-color: ${props => props.theme.colors.primaryHover};
   }
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
   opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
   transition: visibility 0s, opacity 0.3s ease;
   z-index: ${({ isOpen }) => (isOpen ? 999 : -1)};
`;
