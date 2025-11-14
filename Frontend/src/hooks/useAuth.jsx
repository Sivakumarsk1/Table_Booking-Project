import { useEffect } from "react";
import { setCookie, getCookie, removeCookie  } from "../../utils/cookieUtils"

const useAuth = () => {
    const [user, setUser] = useState(getCookie('user') || null);

    const login = (username) => {
        setCookie("user", username, 1);
        setUser(username);
        }
        
        const logout = () => {
        removeCookie("user");
        setUser(null);
        }
        
        useEffect(()=> {
            setUser(getCookie('user') || null)
        }, [])
}
export default useAuth;

