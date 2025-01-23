import { createContext, useContext, useState, useCallback, FC } from "react";
import apiClient from "../ApiClient";
import { craftErrorObj, craftLoadingObj, craftLoadedObj } from "./utils";

import { UserContextProps, UserProviderProps, User } from "./interfaces/UserContextInterface";

const UserContext = createContext<UserContextProps>({} as UserContextProps)

const UserProvider: FC<UserProviderProps> = ({children}) => {
   const [user, setUser] = useState<any>({})

   const signIn = useCallback(async (email: string, password: string) => {
      let mountObj = craftLoadingObj(user)
      setUser(mountObj)
      const res = await apiClient.authenticate({email, password})


      if(res.error) {
         mountObj = craftErrorObj(res.error)
         setUser(mountObj)
      } else {
         mountObj = craftLoadedObj(res.user)
         setUser(mountObj)
      }

      return mountObj
   }, [user])

   const fetchUser = useCallback(async () => {
      setUser(craftLoadingObj(user))
      const res = await apiClient.fetchUser()

      if(res.error) {
         setUser(craftErrorObj(res.error))
      } else {
         setUser(craftLoadedObj(res.user))
      }

      return user
   }, [user])

   const signOut = useCallback(() => {
      setUser({})
      return apiClient.logOut()
   }, [])

   const value = { user, signIn, fetchUser, signOut }

   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
export const useAuth = () => useContext(UserContext)
