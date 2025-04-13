import React, {useEffect, useState} from 'react';
import { Accessibility } from 'accessibility';
import AuthPage from "./components/pages/AuthPage/AuthPage";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import './assets/css/critical.scss';
import './assets/css/style.scss';

const labels = {
    resetTitle: 'reset',
    closeTitle: 'close',
    menuTitle: 'Accessibility menu',
    increaseText: 'increase text size',
    decreaseText: 'decrease text size',
    increaseTextSpacing: 'increase text spacing',
    decreaseTextSpacing: 'decrease text spacing',
    increaseLineHeight: 'increase line height',
    decreaseLineHeight: 'decrease line height',
    invertColors: 'invert colors',
    grayHues: 'gray hues',
    underlineLinks: 'underline links',
    bigCursor: 'big cursor',
    readingGuide: 'reading guide',
    textToSpeech: 'text to speech',
    speechToText: 'speech to text',
    disableAnimations: 'disable animations',
    hotkeyPrefix: 'Hotkey:',
};

const modules = {
    decreaseText: true,
    increaseText: true,
    invertColors: true,
    increaseTextSpacing: true,
    decreaseTextSpacing: true,
    increaseLineHeight: true,
    decreaseLineHeight: true,
    grayHues: true,
    underlineLinks: false,
    bigCursor: false,
    readingGuide: false,
    textToSpeech: false,
    speechToText: false,
    disableAnimations: false,
};

function App() {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setIsAuthed(true);
        }
        const options = {
            labels,
            modules,
            textPixelMode: true,
            textEmlMode: false,
            textSizeFactor: 1,
            session: { persistent: false },
        };

        new Accessibility(options);
    }, []);

    return (
        <>
            {isAuthed ? <Dashboard/> : <AuthPage setIsAuthed={setIsAuthed}/>}
        </>
    );



}

export default App;
