import React, { useEffect,useState } from 'react'
import './scss/Body.scss'
import { UserPlayer } from '../interface/interfacer'
interface Props {
  listPlayer: UserPlayer[]
  setListPlayer: React.Dispatch<React.SetStateAction<UserPlayer[]>>
}

const Body: React.FC<Props> = (props) => {

  const { listPlayer , setListPlayer} = props;

  const itemPlayer : UserPlayer[] = JSON.parse(localStorage.getItem('listPlayer') || '[]')

  const [higheScrore,setHigheScrore] = useState<number>(0)

  const handleDelete = (userId:number) => {
    if(confirm("Chắc muốn xoá người chơi chứ?")){
      //tạo mảng mới lấy dữ liệu từ local
      const listPlayer = JSON.parse(localStorage.getItem('listPlayer') || '[]')
      //tạo mảng để lọc và loại bỏ người chơi muốn xóa
      const itemPlayer = listPlayer.filter((item: UserPlayer) => item.id !== userId)
      //set lại mảng listPlayer bằng mảng itemPlayer
      setListPlayer(itemPlayer)
      //đẩy lên local store để lưu dữ liệu
      localStorage.setItem("listPlayer",JSON.stringify(itemPlayer as UserPlayer[]));
      
    }
  }

  useEffect(()=>{
    //khi listplayer thay đổi, tự động chạy và tìm lại người chơi cao điểm nhất
    const max = Math.max(...itemPlayer.map((item: UserPlayer) => item.point));
    setHigheScrore(max);
  },[listPlayer])

  const handleInCrease = (id:number) =>{
    const listPlayer = JSON.parse(localStorage.getItem('listPlayer') || '[]')
    //tìm player có id được truyền vào và cộng điểm
    const changePlayer = listPlayer.map((item: UserPlayer) => {
      if(item.id === id){
        item.point++;
      }
      return item
    })
    //lưu lại và set lại mảng listPlayer
    localStorage.setItem('listPlayer', JSON.stringify(changePlayer))
    setListPlayer(changePlayer)
  }

  const handleDeCrease = (id:number) =>{
    const listPlayer = JSON.parse(localStorage.getItem('listPlayer') || '[]')
    const changePlayer = listPlayer.map((item: UserPlayer) => {
      if(item.id=== id){
        //nếu người chơi này có điểm = 0 thì không biến thành điểm âm
        if(item.point == 0){
          return item
        }
        item.point--;
      }
      
      return item
    })
    localStorage.setItem('listPlayer', JSON.stringify(changePlayer))
    setListPlayer(changePlayer)
  }


  return (
    <div className='bodyPage'>
      <table className="table">

        <tbody>
          {
            //nếu ko dữ liệu trên local Store thì in text
            itemPlayer.length == 0 ? <div className='emptyText'>Tạm thời vẫn chưa có người chơi</div> 
            //Với mỗi người in ra 1 cặp thẻ <tr>
            :itemPlayer.map((item: UserPlayer) => {
              console.log(item.id);
              
              return (
                <tr key={item.id}>
                  <th scope="row">
                    {/* khi ấn vào icon thì chạy hàm handleDelete */}
                    <i className="fa-solid fa-trash" onClick={()=>{
                      handleDelete(item.id)
                    }}></i>
                  </th>
                  <td>
                    {/* icon sẽ sáng lên nếu người chơi có điểm = higheScore, nếu không thì sẽ để màu đen */}
                    <i className="fa-solid fa-crown  iconCrow" style={higheScrore  == item.point && item.point !== 0 ? {color:'red'} : {color:'black'}}></i>
                    
                    {item.name}
                    
                    </td>
                  <td className='decr-incr'>
                    {/* button giảm điểm */}
                    <button onClick={()=>{
                      handleDeCrease(item.id)

                    }}>-</button>
                  </td>
                  {/* render điểm của player */}
                  <td>{item.point}</td>
                  {/* button tăng điểm */}
                  <td className='decr-incr'>
                    <button 
                      onClick={()=>{
                        handleInCrease(item.id)
                      }}
                    >+</button>
                  </td>
                </tr>
              )
            })
          }


        </tbody>
      </table>
    </div>
  )
}

export default Body