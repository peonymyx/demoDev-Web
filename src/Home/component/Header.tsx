import React from 'react'
import './scss/Header.scss'

import { UserPlayer } from '../interface/interfacer'

interface Props{
  listPlayer:UserPlayer[];
}

const Header:React.FC<Props> = (props) => {
  const listPlayer = props
  const itemPlayer : UserPlayer[] = JSON.parse(localStorage.getItem('listPlayer') || '[]') 
  return (
  <header>
        <div className="dataPlayer">
          <span>
            Player : {itemPlayer.length}
          </span>
          <br />
          <span>
            {/* reduce là một hàm callback, dùng để duyệt qua từng phần tử
                acc là biến chứa giá trị tích lũy qua các lần callback, giá trị ban đầu là 0
                mỗi lần duyện lấy qua một item:<UserPlayer> và cộng giá trị point
            */}
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