import React, { useState } from "react"
import { RegisterScreen } from "unauthenticated-app/register";
import {LoginScreen} from "unauthenticated-app/login";

export const UnauthenticatedApp = () =>{
    const [isRegister, setIsRegister] = useState(false);
    return <div>
        {
            isRegister ? <RegisterScreen /> : <LoginScreen />
        }
        <button onClick={() => setIsRegister(!isRegister)}>change to {isRegister ? 'register' : 'login'}</button>

    </div>
}