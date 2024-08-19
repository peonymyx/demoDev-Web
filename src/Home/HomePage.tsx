import React  from 'react'
import Header from './component/Header'
import Footer from './component/Footer'
import Body from './component/Body'
import './Home.scss'
import { UserPlayer } from './interface/interfacer'
const HomePage:React.FC = () => {

  //useState là 1 react Hook để theo dõi và cập nhật giá trị của biến
  //Khởi tạo biến listPlayer có kiểu dữ liệu mảng UserPlayer, giá trị khởi tạo là một mảng rỗng
  //setListPlayer là một function dùng để cập nhật biến listPlayer
  const [listPlayer,setListPlayer] = React.useState<UserPlayer[]>([])  
  console.log(setListPlayer.toString());
  
  return (
    <div className='homePage'>
            <div className="childHome">
              {/* truyền dữ liệu từ component cha sang component con*/}
                <Header listPlayer={listPlayer}/>
                <Body listPlayer={listPlayer} setListPlayer={setListPlayer}/>
                <Footer setListPlayer={setListPlayer} listPlayer={listPlayer}/>
            </div>  
    </div>
  )
}

export default HomePage