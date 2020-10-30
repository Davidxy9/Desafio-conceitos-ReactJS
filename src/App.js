import React, {useEffect, useState} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response => {
      setRepositories(response.data);

    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'DavinJS',
      url: 'https://github.com/Davinxy9',
      techs: ['ReactJS', 'ReactNative'],
    }) //pegar o resultado da API
    
    setRepositories([...repositories, response.data])
  
  }


  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id != id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositoriy => (
             <li key={repositoriy.id}>
             {repositoriy.title}
   
             <button onClick={() => handleRemoveRepository(repositoriy.id)}>
               Remover
             </button>
           </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
