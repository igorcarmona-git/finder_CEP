import { FiSearch } from "react-icons/fi";
import './styles.css';
import { useState } from 'react';
import CEPapi from "./services/cepApi";
function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const hasCep = Object.keys(cep).length > 0;

  async function handleSearch() {
    if(input === '') {
      alert("Preencha algum cep");
      return;
    }

    try{
      const response = await CEPapi.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }catch{
      alert("Ops! Erro ao buscar CEP");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch"
          onClick={handleSearch}
        >
          <FiSearch size={30} color="#FFF" />
        </button>
      </div>

      {hasCep && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>RUA: {cep.logradouro}</span>
          <span>BAIRRO: {cep.bairro}</span>
          <span>CIDADE: {cep.localidade} - {cep.uf}</span>
        </main>
      )}

      {input === "" && hasCep && (
        <button className="ButtonbackHome" 
        onClick={() => window.location.reload()}>
          Voltar
        </button>
      )}
 
    </div>
  );
}

export default App;
