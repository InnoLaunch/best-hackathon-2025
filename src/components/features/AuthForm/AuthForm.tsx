import React, {FC, useState} from 'react';
import './AuthForm.scss';
import dogIcon from 'assets/img/dog.png';

interface AuthFormProps {
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, mode: string) => void;
}

const AuthForm: FC<AuthFormProps> = ({setUsername, setPassword, handleSubmit}) => {
    const [currentMode, setCurrentMode] = useState('login');

    return (
        <section className='auth-form'>
            <h1 className='h1'>Registration</h1>
            <div className='form-wrapper'>
                <div className='switch'>
                    <div className={`item ${currentMode === 'login'&&'active'}`} onClick={() => setCurrentMode('login')}>Log in</div>
                    <div className={`item ${currentMode === 'signup'&&'active'}`} onClick={() => setCurrentMode('signup')}>Sign up</div>
                </div>
                <form onSubmit={(e) => handleSubmit(e, currentMode)}>
                    <input
                        required={true}
                        placeholder='Login'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        required={true}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type={"submit"}>{currentMode === 'login'?'Log in': 'Sign up'}</button>
                </form>
                <div className='circle'></div>

            </div>
            <img src={dogIcon} alt='dog'/>



        </section>
    );
};

export default AuthForm;