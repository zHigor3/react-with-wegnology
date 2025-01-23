import { FC, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Home: FC = () => {
   const navigate = useNavigate();

   const handleLogout = () => {
      navigate('/logout')
   }

   return (
      <>
         Home
         <button onClick={handleLogout}>logout</button>
      </>
   )
}

export default Home
