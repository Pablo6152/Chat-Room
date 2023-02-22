import React from 'react';
import './styles.css';


function NavBar(props){

    return (
        <nav className='navbar-container'>
            
            <div className='back-container'>
                {props.backBtn}
            </div>
            
            <h2 className='room-title'>{props.chatName}</h2>

            <span className="material-icons ham-menu">
            menu
            </span>
        </nav>
    )
}


export { NavBar }