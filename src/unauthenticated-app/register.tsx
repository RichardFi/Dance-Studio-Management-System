import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';
//const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
    const { register, user } = useAuth();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        //prevent the default action of submit
        event.preventDefault();
        const firstName = (event.currentTarget.elements[0] as HTMLFormElement).value;
        const lastName = (event.currentTarget.elements[1] as HTMLFormElement).value;
        const gender = (event.currentTarget.elements[2] as HTMLFormElement).value;
        const phone = (event.currentTarget.elements[3] as HTMLFormElement).value;
        const email = (event.currentTarget.elements[4] as HTMLFormElement).value;
        const password = (event.currentTarget.elements[5] as HTMLFormElement).value;

        register({ firstName, lastName, gender, phone, email, password });
    }
    return <form onSubmit={handleSubmit}>

        <div>
            <label htmlFor="firstName"> FirstName </label>
            <input type="text" id={'firstName'} />
        </div>
        <div>
            <label htmlFor="lastName"> LastName </label>
            <input type="text" id={'lastName'} />
        </div>
        <div>
            <label htmlFor="gender"> gender </label>
            <input type="text" id={'gender'} />
        </div>
        <div>
            <label htmlFor="phone"> phone </label>
            <input type="text" id={'phone'} />
        </div>
        <div>
            <label htmlFor="email"> email </label>
            <input type="text" id={'email'} />
        </div>
        <div>
            <label htmlFor="password"> Password </label>
            <input type="password" id={'password'} />
        </div>
        <button type="submit"> Register </button>
    </form>
}