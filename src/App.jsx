import { useEffect, useState } from "react";
import "./App.css";
import CopyIcon from "../src/assets/imgs/copy.png";
import VerifiedIcon from "../src/assets/imgs/check-mark.png";

function App() {
  const [input, setInput] = useState("");
  const [numero, setNumero] = useState(0);
  const [result, setResult] = useState([]);
  const [clicado, setClicado] = useState(false);
  const [copiado, setCopiado] = useState(false);

  function clicar() {
    setClicado(true);
    setCopiado(false);
    setResult([]);
    for (let i = 0; i < numero; i++) {
      setResult((prevResult) => [...prevResult, input]);
    }
  }

  function copiar() {
    const textoParaCopiar = result.join(" "); // Junta as palavras em uma string separada por espaços
    const textarea = document.createElement("textarea");
    textarea.value = textoParaCopiar;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  
    setCopiado(true);
  }
  

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div className='main'>
      <div className='top'>
        <div className='palavra'>
          <label>Word</label>
          <input
            type='text'
            className='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className='numero'>
          <label>Times</label>
          <input
            type='number'
            className='number'
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>
        <div className='btn'>
          <button onClick={clicar} className='botao'>
            Generate
          </button>
        </div>
      </div>

      {clicado && result.length >= 1 && (
  <div className='box'>
    <div className='copiar' onClick={copiar}>
      {!copiado ? (
        <>
          Copy <img src={CopyIcon} className='img' />
        </>
      ) : (
        <>
          Copied!
          <img src={VerifiedIcon} className='img' />
        </>
      )}
    </div>
    <div className='palavras' id='palavras'>
      {result.map((r, index) => (
        <span key={index}>{r} </span>
      ))}
    </div>
  </div>
)}

    </div>
  );
}

export default App;
