import React ,{useState}from 'react'
import './scss/Footer.scss'
import { UserPlayer } from '../interface/interfacer'
interface Props {
  setListPlayer:React.Dispatch<React.SetStateAction<UserPlayer[]>>,
  listPlayer:UserPlayer[]
}
const Footer:React.FC<Props> = (props) => {
  const {listPlayer, setListPlayer,} = props;
  const itemPlayer : UserPlayer[] = JSON.parse(localStorage.getItem('listPlayer') || '[]')

  const [namePlayer,setNamePlayer] = useState<String|any>('');
  
  const handleAddPlayer = ()=>{
    //khởi tạo 1 player có có id là một số random ngẫu nhiên từ 0 -> 1
    let newPlayer:UserPlayer = {
      id: Math.random()*1000,
      name: namePlayer,
      //điểm mặc định là 0
      point: 0,
    }
    //set lại List bằng cách kế thừa toàn bộ list cũ và thêm vào 1 đối tượng mới
    setListPlayer([...itemPlayer, newPlayer])
    setNamePlayer(''); //set lại name bằng một chuỗi rỗng
    localStorage.setItem('listPlayer', JSON.stringify([...itemPlayer, newPlayer]))
  }


  return (
    <footer>
        <div className="boxSearch">
          {/* người dùng nhập tên và lấy dữ liệu từ ô input */}
          <input type="text" placeholder='Enter a player is name' value={namePlayer}
            onChange={(e)=>{
              // mỗi lần có sự thay đổi sẽ tự động set lại nameplayer
              setNamePlayer(e.target.value)
            }}
          />
        </div>

        <div className="actionAdd">
          <button 
            onClick={()=>{
              handleAddPlayer();
            }}
          >
            Add</button>
        </div>
    </footer>
  )
}

export default Footer