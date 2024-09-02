import { useEffect, useState, useRef } from 'react';
import "./style.css";
import TrashIcon from "../../assets/trash.svg";
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function createUsers(){

    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()
  }
  
  async function getUsers(){
    const usersFromApi = await api.get('/usuarios');
    setUsers(usersFromApi.data);
  }

  async function deleteUser(id){
    await api.delete(`/usuarios/${id}`)

    getUsers();
  }

  useEffect(() => {
    getUsers()

  },[])
  

  return (
    <>
      <div className="container">
        <form className="forms">
          <h1 className="forms-h1">CADASTRE-SE</h1>

          <input placeholder="Nome" name="nome" type="text" className="forms-input" ref={inputName}/>
          <input placeholder="Idade" name="idade" type="text" className="forms-input" ref={inputAge}/>
          <input placeholder="E-mail" name="email" type="email" className="forms-input" ref={inputEmail}/>
          <button type="button" className="forms-button" onClick={createUsers}>Cadastrar</button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>E-mail: <span>{user.email}</span></p>
            </div>
            <button className="delete-button" onClick={() => deleteUser(user.id)}>
              <img src={TrashIcon} alt="Delete user"/>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
