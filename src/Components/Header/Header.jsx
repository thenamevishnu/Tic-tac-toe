
const Header = ({ darkMode, setDarkMode }) => {
    return (
        <div className="w-screen justify-between items-center flex px-2 md:px-10 h-16 shadow shadow-black fixed top-0 ">
            <div className={`${darkMode ? `text-white` : `text-black`} text-xl font-bold`}>
                TIC TAC TOE GAME
            </div>
            <div className={`w-12 rounded-full h-6 bg-black transition-all duration-300 ease-linear shadow shadow-black relative ${darkMode && `bg-white`}`}>
                <div onClick={()=>setDarkMode(!darkMode)} className={`absolute h-6 w-6 left-0 ${darkMode ? `bg-black left-6 shadow` : `bg-white shadow`} cursor-pointer duration-300 transition-all ease-linear rounded-full `}></div>
            </div>
            
        </div>
    )
}

export default Header
