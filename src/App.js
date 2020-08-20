import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  /** Fetch data from api when component is mounted */
  useEffect(() => {

    async function fetchData(){
      const response = await api.get('repositories');
      setRepositories(response.data);
    };

    fetchData();

  },[])


  async function handleAddRepository() {


    const response = api.post('repositories',{
      title:"Desafio ReactJS",
      url: "https://github.com/amaralc/gostack-n1-desafio-nodejs",
      techs: ["Node.js", "JavaScript"]	
    });

    const repository = (await response).data;

    setRepositories([...repositories, repository]);
    
  }

  async function handleRemoveRepository(id) {

    /** Delete repository in api */
    const response = await api.delete(`repositories/${id}`);

    /** Filter repositories different than the one with specified id */
    const newRepoList = repositories.filter(repository => {
      return repository.id !== id;
    });

    /** Set new state */
    setRepositories(newRepoList);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return(
            <li key= {repository.id}>
              <p>{repository.title}</p>
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
