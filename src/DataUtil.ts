import { FieldValues } from "react-hook-form";

export function createAPI(baseurl:string, sessionkey:string){

async function fetchData<T>(url:string):Promise<T> {
    url = baseurl + url;
    const r = await fetch(url, {
        headers:{"Authorization":`Bearer ${sessionkey}`}
    });
    const data = await r.json();
    return data;
};

async function postData<T>(url:string, form:FieldValues):Promise<T> {
    url = baseurl + url;
    const r = await fetch(url, {method:"POST",
        body: JSON.stringify(form),
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${sessionkey}`
                }
            });
    const data = await r.json();
    return data;
};

async function deleteData<T>(url:string, ):Promise<T> {
    url = baseurl + url;
    const r = await fetch(url, {
        method: "DELETE",
        headers:{"Authorization":`Bearer ${sessionkey}`}
    });
    const data = await r.json();
    return data;
};

    return{fetchData, deleteData, postData,}
};