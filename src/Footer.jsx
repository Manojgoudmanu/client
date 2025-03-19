import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHouse,faChartSimple,faSquarePlus,faBell,faUser  } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import "./Footer.css";


const Footer = () => {
  const nav = useNavigate()
  return (
    <div>
           <section className="footer">
        <div className='icon'>
          <FontAwesomeIcon icon={faHouse} onClick={()=>nav("/homepage")} />
        </div>
        <div className='icon'>
          <FontAwesomeIcon icon={faChartSimple} />
        </div>
        <div className='icon'>
          <FontAwesomeIcon icon={faSquarePlus} onClick={()=>nav('/addexpense')}/>
        </div>
        <div className='icon'>
          <FontAwesomeIcon icon={faBell} onClick={()=>nav('/notifications')} />
        </div>
        <div className='icon'>
          <FontAwesomeIcon icon={faUser} onClick={()=>nav('/Profile')}/>
        </div>
      </section>
    </div>
  )
}

export default Footer