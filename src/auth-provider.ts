import { User } from "screens/projectList/searchPanel";

const localStorageKey = '__auth_provider_token__';
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user;
}

export const login = (data: { email: string, password: string }) => {
    fetch(`${apiUrl}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response: Response) =>{
        if (response.ok){
            return handleUserResponse(await response.json())
        }
    })
}

export const register = (data: 
    { 
        firstName: string,
        lastName: string,
        gender: string,
        phone:  string,
        email: string, 
        password: string 
    }) => {
    fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response: Response) =>{
        if (response.ok){
            return handleUserResponse(await response.json())
        }
    })
}

export const logout = () => window.localStorage.removeItem(localStorageKey);