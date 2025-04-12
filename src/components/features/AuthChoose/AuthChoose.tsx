import React from 'react';
import './AuthChoose.scss'

import wheelChairIcon from 'assets/img/disability_types/wheel_chair.svg';
import hearingDisabledIcon from 'assets/img/disability_types/hearing-disabled.svg';
import visualDefectsIcon from 'assets/img/disability_types/visual_defects.svg';
import specialIcon from 'assets/img/disability_types/special.svg';
import dogIcon from 'assets/img/dog.png';

const items = [
    {
        img: wheelChairIcon,
        title: 'Wheelchair'
    },
    {
        img: hearingDisabledIcon,
        title: 'Hearing impairment'
    },
    {
        img: visualDefectsIcon,
        title: 'Visual defects'
    },
    {
        img: specialIcon,
        title: 'Visual defects'
    }
]

const AuthChoose = () => {
    return (
        <section className='auth-choose'>
            <h1 className='h1'>Your Personal Git</h1>

            <div className='type-wrapper'>
                <p>What about u?</p>

                <div className='types'>
                    {items.map((item, i) => (
                        <div>
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
    );
};

export default AuthChoose;