import React from 'react'
import preloader from './loader-blue.png'
import s from "./preloader.module.css";


let Preloader:React.FC = () => {
    return <img className={s.preloader} src={preloader} width={40} height={40} alt='loading'/>
}


export default Preloader