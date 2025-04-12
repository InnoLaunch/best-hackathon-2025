import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import './BurgerMenu.scss';

interface BurgerMenuProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const links = [
    'Log In as Admin',
    'Contact Us',
    'About Us',
    'Our Site',
    'Git',
    'Instruction'
];

const BurgerMenu: React.FC<BurgerMenuProps> = ({isOpen, setIsOpen}) => {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const menuRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else if (menuRef.current) {
            tl.current = gsap.timeline();
            tl.current.to(menuRef.current, {
                x: '-100%',
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => setShouldRender(false)
            });
        }
    }, [isOpen]);

    useEffect(() => {
        if (!shouldRender || !menuRef.current) return;

        gsap.set(menuRef.current, {x: '-100%'});
        tl.current = gsap.timeline();
        tl.current
            .to(menuRef.current, {
                x: '0%',
                duration: 0.4,
                ease: 'power2.out',
            })
            .fromTo(
                menuRef.current.querySelectorAll('.burger-link'),
                {x: -20, opacity: 0},
                {x: 0, opacity: 1, stagger: 0.05, duration: 0.3, delay: 0.3},
                '<0.1',

            );
    }, [shouldRender]);

    if (!shouldRender) return null;

    return (
        <div className="burger-menu__overlay" onClick={() => setIsOpen(false)}>
            <div
                className="burger-menu"
                ref={menuRef}
                onClick={(e) => e.stopPropagation()}
            >
                <nav className="burger-menu__nav">
                    {links.map((text) => (
                        <a key={text} className="burger-link" href="#">
                            {text}
                        </a>
                    ))}
                </nav>
                <footer className="burger-menu__footer">
                    Developed by InnoLaunch
                </footer>
            </div>
        </div>
    );
};

export default BurgerMenu;
