import styled from "styled-components";

export const Container = styled.div`
   display: flex;
   flex-wrap: wrap;
   height: 100%;
   margin: 0; /* Remove margens para cobrir a tela inteira */
   padding: 0; 
   background-image: url('https://files.wnology.io/678516ffa895481657d94af0/image/WeArt-6608.jpg'); /* Substitua pelo caminho da sua imagem */
   background-size: cover; /* Faz a imagem cobrir todo o fundo */
   background-position: center; /* Centraliza a imagem */
   background-repeat: no-repeat; /* Impede que a imagem se repita */
   background-attachment: fixed;
`

export const ContainerLogin = styled.div`
   height: 100vh;
   width: 500px;
   margin-right: auto;
   background-color: ${props => props.theme.colors.background};
   border: 0;
   display: flex;
   flex-wrap: wrap;
   padding-top: 96px;
   padding-left:24px;
   padding-right:24px;
   align-content: baseline;
`

export const Title = styled.label`
   font-size: ${props => props.theme.font.large};
   color: ${props => props.theme.colors.text};
   font-weight: 600;
`

export const ContainerItem = styled.div`
   display: flex;
`
