import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';
//const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
    const { login, user } = useAuth();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        //prevent the default action of submit
        event.preventDefault();
        const email = (event.currentTarget.elements[0] as HTMLFormElement).value;
        const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
        login({ email, password });
    }
    return <form onSubmit={handleSubmit}>
        {
            user ? <div>
                success : {user?.role}
            </div> :null
        }
        <div>
            <label htmlFor="email"> email </label>
            <input type="text" id={'email'} />
        </div>
        <div>
            <label htmlFor="password"> Password </label>
            <input type="password" id={'password'} />
        </div>
        <button type="submit"> Login </button>
    </form>
}