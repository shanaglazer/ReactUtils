import { StoreApi, UseBoundStore, create } from "zustand"
import { createAPI } from "./DataUtil";

interface User{
    userName:string,
    roleName:string,
    roleRank:number,
    sessionkey:string,
    errorMessage:string,
    isLoggedIn:boolean,
    login:(username: string, password: string) => Promise<void>,
    logout: (username: string)=> void,
}

async function loginUser(apiUrl:string, username:string, password:string):Promise<User>{
    apiUrl = apiUrl+"User/";
    const postData = createAPI(apiUrl, "").postData;
    const user = await postData<User>("login", {username, password});
    return user;
}

async function logoutUser(apiUrl:string, username:string):Promise<User>{
    apiUrl = apiUrl+"User/";
    const postData = createAPI(apiUrl, "").postData;
    const user = await postData<User>("logout", {username});
    return user;
}

let userstore: UseBoundStore<StoreApi<User>>;

const keyname = "userstore";

export function getUserStore(apiUrl:string){ 
    if(!userstore){
        userstore = create<User>(
            (set)=>{
                const storedvalue = sessionStorage.getItem(keyname);
                const initialvals = storedvalue?
                    JSON.parse(storedvalue)
                    : 
                    {userName:"", roleName:"", roleRank:0, sessionkey:"", errorMessage:"", isLoggedIn: false, }
                return{
                    ...initialvals, 
                    logout: async(username:string)=> {
                        const user = await logoutUser(apiUrl, username);
                        const newstate = {userName:user.userName, roleName:user.roleName, roleRank:user.roleRank, sessionkey:user.sessionkey, errorMessage:user.errorMessage, isLoggedIn:false};
                        sessionStorage.setItem(keyname, JSON.stringify(newstate));
                        set(newstate)
                    },
                    login:async(username:string, password:string)=>{
                        const user = await loginUser(apiUrl, username, password);
                        const loggedin = !user.sessionkey? false: true;
                        const newstate = {userName:user.userName, roleName:user.roleName, roleRank:user.roleRank, sessionkey:user.sessionkey, errorMessage:user.errorMessage, isLoggedIn:loggedin};
                        sessionStorage.setItem(keyname, JSON.stringify(newstate));
                        set(newstate);
                    }
                }
            }
        )
    }
    return userstore;
};