import React, {useState} from 'react';
import './AuthForm.scss';
import dogIcon from 'assets/img/dog.png';

const AuthForm = () => {
    const [currentMode, setCurrentMode] = useState('login');

    return (
        <section className='auth-form'>
            <h1 className='h1'>Registration</h1>
            <div className='form-wrapper'>
                <div className='switch'>
                    <div className={`item ${currentMode === 'login'&&'active'}`} onClick={() => setCurrentMode('login')}>Log in</div>
                    <div className={`item ${currentMode === 'signup'&&'active'}`} onClick={() => setCurrentMode('signup')}>Sign up</div>
                </div>
                <form>
                    <input placeholder='Login'/>
                    <input placeholder='Password'/>
                    <button>{currentMode === 'login'?'Log in': 'Sign up'}</button>
                </form>
                <div className='circle'></div>

            </div>
            <img src={dogIcon} alt='dog'/>



        </section>
    );
};

export default AuthForm;