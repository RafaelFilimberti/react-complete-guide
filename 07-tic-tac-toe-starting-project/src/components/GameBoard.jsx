


export default function GameBoard({ onSelectedSquare, board }) {

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updateBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; //copia o array para um novo array
    //         updateBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updateBoard;
    //     });

    //     onSelectedSquare();
    // }

    return (
        <ol id="game-board">
            {/* 
                PRIMEIRO MAP: Percorre cada LINHA 
                row = array [null, null, null]
                rowIndex = 0, 1, 2
            */}
            {board.map((row, rowIndex) =>
                <li key={rowIndex}> {/* <li> para cada linha */}
                    <ol>
                        {/* 
                            SEGUNDO MAP: Percorre cada COLUNA da linha atual
                            playerSymbol = null (ou 'X' ou 'O')
                            colIndex = 0, 1, 2
                        */}
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}> {/* <li> para cada célula */}
                                <button onClick={() => onSelectedSquare(rowIndex, colIndex)}
                                    disabled={playerSymbol !== null}>{playerSymbol}</button>
                            </li>)}
                    </ol>
                </li>)}
        </ol>
    );
}