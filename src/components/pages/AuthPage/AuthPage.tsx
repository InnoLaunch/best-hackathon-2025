import React, {FC, useState} from 'react';
import AuthService from '../../../services/AuthService';
import './AuthPage.scss';
import AuthForm from "../../features/AuthForm/AuthForm";
import Header from "../../features/Header/Header";
import AuthChoose from "../../features/AuthChoose/AuthChoose";


interface AuthPageProps {
    setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthPage: FC<AuthPageProps> = ({setIsAuthed}) => {
    const [step, setStep] = useState<number>(1);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [disabilityType, setDisabilityType] = useState<string>('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, mode: string) => {
        e.preventDefault();
        if (mode === 'login'){
            try {
                const response = await AuthService.login(username, password);
                localStorage.setItem('access_token', response['data']['access_token'])
                localStorage.setItem('username', username);
                setIsAuthed(true)

            }
            catch (e: any) {
                if (e.response.status === 401) {
                    localStorage.removeItem('access_token');
                }
            }
        }
        if (mode === 'signup'){
            try {
                const response = await AuthService.signup(username, disabilityType, password);
                if (response.status === 200) {
                    const loginResponse = await AuthService.login(username, password);
                    localStorage.setItem('access_token', loginResponse['data']['access_token'])
                    localStorage.setItem('username', username);
                    setIsAuthed(true);
                }
            }
            catch (e: any) {
                if (e.response.status === 401) {
                    localStorage.removeItem('access_token');
                }
            }
        }
    }

    return (
        <main className='auth-page container'>
            <Header />
            {step === 1 && <AuthChoose setStep={setStep} setDisabilityType={setDisabilityType}/>}
            {step === 2 && <AuthForm setPassword={setPassword} setUsername={setUsername} handleSubmit={handleSubmit}/>}
        </main>
    )

    // return (
    //     <main className={'auth-page'}>
    //         <div className="ring">
    //             <i style={{'--clr': '#00ff0a'} as CustomCSSProperties}></i>
    //             <i style={{'--clr': '#ff0057'} as CustomCSSProperties}></i>
    //             <i style={{'--clr': '#fffd44'} as CustomCSSProperties}></i>
    //
    //             <form className="login" onSubmit={handleSubmit}>
    //                 <h2>Login</h2>
    //                 <div className="inputBx">
    //                     <input
    //                         type="text"
    //                         placeholder="Username"
    //                         value={username}
    //                         onChange={e => setUsername(e.target.value)}
    //                     />
    //                 </div>
    //                 <div className="inputBx">
    //                     <input
    //                         type="password"
    //                         placeholder="Password"
    //                         value={password}
    //                         onChange={e => setPassword(e.target.value)}
    //                     />
    //                 </div>
    //                 <div className="inputBx">
    //                     <input type="submit" value="Sign in"/>
    //                 </div>
    //             </form>
    //         </div>
    //     </main>
    //
    // );
};

export default AuthPage;