import React, {FC} from 'react';
import './AuthChoose.scss'

import wheelChairIcon from 'assets/img/disability_types/wheel_chair.svg';
import hearingDisabledIcon from 'assets/img/disability_types/hearing-disabled.svg';
import visualDefectsIcon from 'assets/img/disability_types/visual_defects.svg';
import specialIcon from 'assets/img/disability_types/special.svg';
import dogIcon from 'assets/img/dog.png';
import OptionsModal from "../../entities/OptionsModal/OptionsModal";

const items = [
    {
        img: wheelChairIcon,
        title: 'Wheelchair',
        name: 'wheelchair'
    },
    {
        img: hearingDisabledIcon,
        title: 'Hearing impairment',
        name: 'hearing'
    },
    {
        img: visualDefectsIcon,
        title: 'Visual defects',
        name: 'visual'
    },
    {
        img: specialIcon,
        title: 'Visual defects',
        name: 'cognitive'
    }
]

interface AuthChooseProps {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setDisabilityType: React.Dispatch<React.SetStateAction<string>>;
}


const AuthChoose: FC<AuthChooseProps> = ({setStep, setDisabilityType}) => {
    const [isActive, setIsActive] = React.useState(false);
    const [textSize, setTextSize] = React.useState<number>(20);
    const [colorTheme, setColorTheme] = React.useState<string>('main');

    return (
        <>
            <section className='auth-choose'>
                <h1 className='h1'>Your Personal Git</h1>

                <div className='type-wrapper'>
                    <p>What about u?</p>

                    <div className='types'>
                        {items.map((item, i) => (
                            <div key={i} onClick={() => {setDisabilityType(item.name); setIsActive(true)}}>
                                <img src={item.img} alt={item.title} />
                                <span>{item.title}</span>
                            </div>
                        ))}
                    </div>
                    <div className='circle'>
                        <img src={dogIcon} alt='dog'/>
                    </div>
                </div>
            </section>
            <OptionsModal
                textSize={textSize}
                setTextSize={setTextSize}
                colorTheme={colorTheme}
                setColorTheme={setColorTheme}
                headText={""}
                description={""}
                active={isActive}
                setActive={setIsActive}
                setStep={setStep}
            />
        </>
    );
};

export default AuthChoose;