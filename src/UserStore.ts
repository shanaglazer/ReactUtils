import { create } from "zustand"

interface User{
    username:string,
    role:string,
    isLoggedIn:boolean,
    login:(username: string, password: string) => Promise<void>,
    logout: ()=> void,
}

const keyname = "userstore";

export const useUserStore = create<User>(
    (set)=>{
        const storedvalue = sessionStorage.getItem(keyname);
        const initialvals = storedvalue?
            JSON.parse(storedvalue)
            : 
            {username:"", role:"", isLoggedIn: false, }
        return{
            ...initialvals, 
            logout:()=> {
                const newsatate = {username:"", role:"", isLoggedIn:false};
                sessionStorage.setItem(keyname, JSON.stringify(newsatate));
                set(newsatate)
            },
            login:async(username:string, password:string)=>{
                const roleval = username.toLocaleLowerCase().startsWith("x")&&password!=""?"admin":"user";
                const newstate = {username:username, role:roleval, isLoggedIn:true};
                sessionStorage.setItem(keyname, JSON.stringify(newstate));
                set(newstate);
            }
    }
}
);