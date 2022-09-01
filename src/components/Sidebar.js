import React from 'react';
import Logo from '../assets/logo.svg';
import Sun from '../assets/icon-sun.svg';
import User from '../assets/image-avatar.jpg';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__container1">
                <div className="sidebar__container1__logo">
                    <div></div>
                    <div>
                    </div>
                    <img src={Logo} alt="logo" />
                </div>

            </div>

            <div className="sidebar__container2">
                <div className="sidebar__container2__theme">
                    <img src={Sun} alt="light-dark-mode" />
                </div>

                <div className="sidebar__container2__user">
                    <img src={User} alt="user"></img>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;