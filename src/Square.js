const Square = ({ value, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="w-12 h-12 bg-white border-2 border-gray-400 text-2xl font-bold flex items-center justify-center"
      >
        {value}
      </button>
    );
  };
  
  export default Square;
  