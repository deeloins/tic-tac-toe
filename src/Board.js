import Square from "./Square";

const Board = ({ squares, onClick }) => {
    return (
      <div className="board grid grid-cols-3 gap-2">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => onClick(index)} />
        ))}
      </div>
    );
  };

  export default Board;