import React, {useEffect, useState} from 'react';
import AuthPage from "./components/pages/AuthPage/AuthPage";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import './assets/css/critical.scss';
import './assets/css/style.scss';

function App() {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setIsAuthed(true);
        }
    }, []);

    return (
        <>
            {isAuthed ? <Dashboard/> : <AuthPage setIsAuthed={setIsAuthed}/>}
        </>
    );



}

export default App;
