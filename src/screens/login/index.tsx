import React, { FormEvent } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
    const login = (param: { username: string, password: string }) => {
        fetch(`${apiUrl}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        //prevent the default action of submit
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
        const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
        login({ username, password });
    }
    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username"> Username </label>
            <input type="text" id={'username'} />
        </div>
        <div>
            <label htmlFor="password"> Password </label>
            <input type="password" id={'password'} />
        </div>
        <button type="submit"> Login </button>
    </form>
}