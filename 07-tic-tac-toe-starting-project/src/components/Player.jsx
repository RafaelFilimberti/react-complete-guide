import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    //let btnCaption = 'Edit';

    // function handleEditClick() {
    //     setIsEditing(!isEditing);
    //     setIsEditing(!isEditing);
    //     //aqui faz a mesma coisa que isEditing ? false : true. Alterna os valores        
    // }
    //ao atualizar o estado em react deve ser feito sempre com uma função
    function handleEditClick() {
        setIsEditing((editing) => !editing);

        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }
    //usar na forma de função faz com que o react execute o estado instantaneamente
    //evitando erros

    function handleChange(event) {
        setPlayerName(event.target.value); //captura o novo valor e com o setPlayerName atualiza o estado
    }

    if (isEditing) {
        editablePlayerName = (
            <input type="text" required value={playerName} onChange={handleChange} />
            //onChange faz a ponte que permite o input atualizar o estado. sem ele ficaria travado no valor inicial do name
        );
        // btnCaption = 'Save';
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}