import Cookies from "js-cookie";

export const setCookie = (name, values, days) => {
    Cookies.set(name, values, {expires: days, path: "/"})
}

    export const getCookie = (name)=>{
        return Cookies.get(name)
    }
    export const removeCookie = (name) => {
        Cookies.delete(name, {path:'/'})
    }
