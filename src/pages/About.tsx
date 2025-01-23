import React, { FC, useEffect } from "react";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const About: FC = () => {
   const userInfo = useAuth()
   const navigate = useNavigate();

   return (
      <>
         Sobre o projeto
      </>
   )
}

export default About
