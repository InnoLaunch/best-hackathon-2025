import React, {useState} from 'react';
import './Header.scss';
import BurgerMenu from "../../common/BurgerMenu/BurgerMenu";
import gearIcon from './../../../assets/img/gear.svg'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="header">
                <button
                    className={`burger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <span />
                    <span />
                    <span />
                </button>

                <h1 className="header__title">Your Personal Git</h1>

                <img
                    src={gearIcon}
                    alt="Settings"
                    className="header__settings"
                />
            </header>

            <BurgerMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </>
    );
};

export default Header;
