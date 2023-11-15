
const Squares = ({ callback, currentIndex, squares, currentTurn, status, darkMode }) => {

    const list = ["X", "O", "Draw"]
    const color = {
        X: "text-blue-600",
        O: "text-red-600",
        Draw: "text-green-600"
    }

    return (
        <div className={`${darkMode ? `bg-[#222]` : `bg-white`} border-2 border-gray-500 shadow-inner shadow-black ${list.includes(status) ? `${color[status]} animate-win duration-75 ` : currentTurn == "O" ? `text-blue-600` : `text-red-700`} w-24 h-24 rounded-xl text-3xl cursor-pointer flex justify-center items-center`} onClick={()=>callback(currentIndex)}>
            {
                squares[currentIndex] ? squares[currentIndex] : squares[currentIndex]==null ? null : currentTurn
            }
        </div>
    )
}

export default Squares
