import { User } from "screens/classList/searchPanel";

const localStorageKey = '__auth_provider_token__';
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = (user: User) => {
    window.localStorage.setItem(localStorageKey, user.token || "");
    console.log(user)
    return user;
};


export const login = (data: { email: string, password: string }) => {
    return fetch(`${apiUrl}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response: Response) => {
        if (response.ok) {
            return handleUserResponse(await response.json());
        } else {
            return Promise.reject(await response.json());
        }
    })
}

export const register = (data:
    {
        firstName: string,
        lastName: string,
        gender: string,
        phone: string,
        email: string,
        password: string
    }) => {
    return fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response: Response) => {
        if (response.ok) {
            return handleUserResponse(await response.json())
        } else {
            return Promise.reject(await response.json());
        }
    })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey);