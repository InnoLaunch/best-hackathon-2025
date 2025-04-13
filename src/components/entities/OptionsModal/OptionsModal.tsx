import React, {Dispatch, FC, SetStateAction} from 'react';
import './OptionsModal.scss';
import PopUpModalWindow from "../../common/PopUpModalWindow/PopUpModalWindow";
import arrowIcon from './arrow.svg';

interface OptionsModalProps {
    textSize: number;
    setTextSize: (size: number) => void;
    colorTheme: string;
    setColorTheme: (theme: string) => void;
    headText: string;
    description: string;
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    setStep: Dispatch<SetStateAction<number>>;
}

const OptionsModal: FC<OptionsModalProps> = (
    {
        textSize,
        setTextSize,
        colorTheme,
        setColorTheme,
        headText,
        description,
        active,
        setActive,
        setStep
    }) => {
    return (
        <PopUpModalWindow
            headText={headText}
            description={description}
            active={active}
            setActive={setActive}
        >
            <div className={'option-text-size'}>
                <button
                    className={`option ${textSize <= 16 && 'disabled'}`}
                    onClick={() => setTextSize(textSize - 2)}
                >
                    <div></div>
                </button>
                <div
                    className={'text-font'}
                    style={{fontSize: textSize}}
                >Aa</div>
                <button
                    className={`option ${textSize >= 40 ? 'disabled' : ''}`}
                    onClick={() => setTextSize(textSize + 2)}
                >
                    <div></div>
                    <div></div>
                </button>
            </div>
            <div className={'option-color-theme'}>
                <h3>Color</h3>
                <div className={'color-themes'}>
                    <button
                        className={`theme black-white ${colorTheme === 'black-white' ? 'active' : ''}`}
                        onClick={() => setColorTheme('black-white')}
                    >
                        <div></div>
                    </button>
                    <button
                        className={`theme main-color ${colorTheme === 'main' ? 'active' : ''}`}
                        onClick={() => setColorTheme('main')}
                    >
                        <div></div>
                    </button>
                </div>
            </div>
            <button className={'next-step'} onClick={() => setStep(2)}>
                Next
                <img src={arrowIcon} alt={'next'}/>
            </button>
        </PopUpModalWindow>
    );
};

export default OptionsModal;