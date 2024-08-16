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
  console.log("itemPlayer" , itemPlayer);


  const handleDelete = (userId:number) => {
    if(confirm("Chắc muốn xoá người chơi chứ?")){
      const listPlayer = JSON.parse(localStorage.getItem('listPlayer') || '[]')
      const itemPlayer = listPlayer.filter((item: UserPlayer) => item.id !== userId)
      setListPlayer(itemPlayer)
      localStorage.setItem("listPlayer",JSON.stringify(itemPlayer as UserPlayer[]));
      
    }
  }

  const handleInCrease = (id:number) =>{
    const listPlayer = JSON.parse(localStorage.getItem('listPlayer') || '[]')

    const changePlayer = listPlayer.map((item: UserPlayer) => {
      if(item.id === id){
        if(item.point == 10){
          return item
        }
        item.point++;
      }
      return item
    })
    localStorage.setItem('listPlayer', JSON.stringify(changePlayer))
    setListPlayer(changePlayer)
  }
  const handleDeCrease = (id:number) =>{
    const listPlayer = JSON.parse(localStorage.getItem('listPlayer') || '[]')
    const changePlayer = listPlayer.map((item: UserPlayer) => {
      if(item.id=== id){
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

  useEffect(()=>{
    const max = Math.max(...itemPlayer.map((item: UserPlayer) => item.point));
    console.log("max", max);
    setHigheScrore(max);
    console.log("higheScrore", higheScrore);
  },[listPlayer,handleDelete])
  return (
    <div className='bodyPage'>
      <table className="table">

        <tbody>
          {
            itemPlayer.length == 0 ? <div className='emptyText'>Tạm thời vẫn chưa có người chơi</div> 
            :itemPlayer.map((item: UserPlayer) => {
              return (
                <tr>
                  <th scope="row">
                    <i className="fa-solid fa-trash" onClick={()=>{
                      handleDelete(item.id)
                    }}></i>
                  </th>
                  <td>
                    <i className="fa-solid fa-crown  iconCrow" style={higheScrore  == item.point && item.point !== 0 ? {color:'red'} : {color:'black'}}></i>
                    
                    {item.name}
                    
                    </td>
                  <td className='decr-incr'>
                    <button onClick={()=>{
                      handleDeCrease(item.id)

                    }}>-</button>
                  </td>
                  <td>{item.point}</td>
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