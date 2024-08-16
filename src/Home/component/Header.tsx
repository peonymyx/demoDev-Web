import React ,{useEffect,useState}from 'react'
import './scss/Header.scss'

import { UserPlayer } from '../interface/interfacer'

interface Props{
  listPlayer:UserPlayer[];
}

const Header:React.FC<Props> = (props) => {
  const {listPlayer} = props;
  const itemPlayer : UserPlayer[] = JSON.parse(localStorage.getItem('listPlayer') || '[]') 
  return (
  <header>
        <div className="dataPlayer">
          <span>
            Player : {itemPlayer.length}
          </span>
          <br />
          <span>
            Total Point : {itemPlayer.reduce((acc,item)=>acc+item.point,0)}
          </span>
        </div>

        <div className="titleHeader">
              
                Bảng điểm
              
        </div>
  </header>
  )
}

export default Header;