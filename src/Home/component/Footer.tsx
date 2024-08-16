import React ,{useState}from 'react'
import './scss/Footer.scss'
import { UserPlayer } from '../interface/interfacer'
interface Props {
  setListPlayer:React.Dispatch<React.SetStateAction<UserPlayer[]>>,
  listPlayer:UserPlayer[]
}
const Footer:React.FC<Props> = (props) => {
  const {listPlayer, setListPlayer,} = props;
  const [namePlayer,setNamePlayer] = useState<String|any>('');
  console.log("name user", namePlayer);
  
  const handleAddPlayer = ()=>{

    let newPlayer:UserPlayer = {
      id: listPlayer.length + 1,
      name: namePlayer,
      point: 0,
    }
    setListPlayer([...listPlayer, newPlayer])
    setNamePlayer('');
    localStorage.setItem('listPlayer', JSON.stringify([...listPlayer, newPlayer
        ]))
  }


  return (
    <footer>
        <div className="boxSearch">
          <input type="text" placeholder='Enter a player is name' value={namePlayer}
            onChange={(e)=>{
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