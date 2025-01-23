import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const About: FC = () => {
   const navigate = useNavigate();

   return (
      <>
         TESTANDO
         <button onClick={() => navigate('/TestePrivado')} />
      </>
   )
}

export default About
