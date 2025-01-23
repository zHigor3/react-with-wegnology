import React, { useEffect, useState } from 'react';
import './css/Login.scss'

import { useAuth } from '../context/UserContext';
import { isLoaded } from '../context/utils';
import { useNavigate, Navigate, Link } from '../router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import { Container, ContainerLogin, Title, ContainerItem } from './styles/Login';
import { AlertNotification, FlatButton, SolidButton } from '../components/components';
import { InputWithIcon } from '../components/components';

const Login: React.FC = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [authError, setAuthError] = useState<string | boolean>(false);
   const [isWorking, setIsWorking] = useState(false);
   const { signIn, user } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      const timer = setTimeout(() => {
         setAuthError('');
      }, 3600);

      return () => clearTimeout(timer);
   },[authError])

   if (isLoaded(user)) {
      return (<Navigate to="/" />);
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsWorking(true);
      const result = await signIn(email, password);
      if (result.error) {
         setIsWorking(false);
         setAuthError('An unknown error occrred.');
      } else {
         navigate('/');
      }
   };

   return (
      <Container className='col-12'>
         <ContainerLogin>
            <ContainerItem className='col-12' style={{justifyContent: 'center'}}>
               <Title>WEG - SIGA</Title>
            </ContainerItem>

            <ContainerItem className='col-12' style={{marginTop: '112px'}}>
               <Title>Entrar</Title>
            </ContainerItem>

            <form onSubmit={handleSubmit} className='col-12'>
               <ContainerItem className='col-12' style={{marginTop: '24px'}}>
                  <InputWithIcon col='col-12' icon={faEnvelope} placeholder='E-mail' onChange={setEmail} value={email} />
               </ContainerItem>
               <ContainerItem className='col-12' style={{marginTop: '24px'}}>
                  <InputWithIcon col='col-12' icon={faLock} placeholder='Senha' onChange={setPassword} value={password} type='password' />
               </ContainerItem>

               <ContainerItem className='col-12' style={{justifyContent: 'right'}}>
                  <Link to='/'>Esqueceu a senha?</Link>
               </ContainerItem>

               <ContainerItem className='col-12' style={{marginTop: '16px'}}>
                  <SolidButton className='col-12' type='submit'>
                     Login
                  </SolidButton>
               </ContainerItem>
            </form>

            <ContainerItem className="col-12" style={{marginTop: '12px', justifyContent: 'space-between', alignItems: 'center'}}>
               <label>Não possui conta?</label>
               <FlatButton>
                  Criar conta
               </FlatButton>
            </ContainerItem>

            {authError && <AlertNotification message={`Login failed: ${authError}`} typeAlert='error'></AlertNotification>}
         </ContainerLogin>
      </Container>
   );
};

export default Login;
