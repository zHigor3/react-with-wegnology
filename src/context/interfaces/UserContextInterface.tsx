import { ReactNode } from "react"

export interface Item {
   userTags: object
   email: string
   firstName: string
   lastName: string
   applicationId: string
   creationDate: string
   lastUpdated: string
   passwordLastUpdated: string
   lastLogin: string
   experienceUserId: string
   avatarUrl: string
   id: string
   experienceGroups: string[]
}

export interface User {
   isLoaded: boolean,
   isLoading: boolean,
   isError: boolean,
   tms: number,
   error?: object
   item?: Item
}

export interface UserContextProps {
   user: User
   signIn: (email: string, password: string) => Promise<any>
   fetchUser: () => Promise<any>
   signOut: () => any
}


export interface UserProviderProps {
   children: ReactNode;
}
