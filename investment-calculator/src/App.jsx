import { useState } from "react";
import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = userInput.duration >= 1;


  /**
  * Função genérica para atualizar qualquer campo do formulário
  * {string} inputIdentifier - Nome do campo a ser atualizado (ex: 'initialInvestment')
  * {any} newValue - Novo valor digitado pelo usuário
  */

  function handleChange(inputIdentifier, newValue) {
    // setUserInput com função callback para garantir que usamos o estado mais recente
    // Isso é importante para evitar problemas de atualizações simultâneas
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput, //copiar os valores antigos nesse novo objeto
        [inputIdentifier]: +newValue, //ao adicioanr o + antes da variável estamos convertendo ela de String para number
        //Os colchetes permitem usar uma variável como nome de propriedade
      }
    });
  }


  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      {!inputIsValid && <p className="center">Please enter a duration greater than zero.</p>}
      {inputIsValid && <Results input={userInput} />}
    </>
  )
}

export default App
