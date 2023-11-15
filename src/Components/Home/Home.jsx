import { Fragment, useEffect, useState } from "react"
import Squares from "../Squares/Squares"
import { db } from "../../Hooks/LocalStorage"
import { useDarkMode } from "../../Hooks/DarkMode"
import Header from "../Header/Header"

const Home = () => {

    const cols = Array(9).fill(0)
    const [xIsNext, setXIsNext] = useState(false)
    const [square, setSquare] = useState(Array(9).fill(null))
    const [winner, setWinner] = useState(null)
    const [status, setStatus] = useState(null)
    const [showRest, setShowReset] = useState(false)
    const {darkMode, setDarkMode} = useDarkMode()
    let score = db.getScore()

    const getWinners = (square) => {
        const lists = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let list of lists) {
            const [a, b, c] = list
            if (square[a] && square[a] == square[b] && square[a] == square[c]) {
                return square[a]
            }
        }
        return null
    }

    const handleClick = (currentIndex) => {
        const squares = [...square]
        if (getWinners(squares) || squares[currentIndex]) {
            return
        }
        squares[currentIndex] = xIsNext ? "O" : "X" 
        setXIsNext((xIsNext) => !xIsNext)
        setSquare(squares)
    }

    useEffect(() => {
        let winner = getWinners(square)
        setWinner(winner)
        let status = winner ? winner : square.every(item => item != null) ? "Draw" : square.every(item => item==null) ? "Waiting to start" : "Playing..."
        setStatus(status)
        if (winner || status) {
            if (winner === "X") {
                db.setScore.x(1)
                db.setScore.o(0)
                db.setScore.draw(0)
                score = db.getScore()
                setShowReset(true)
            }
            if (winner === "O") {
                db.setScore.x(0)
                db.setScore.o(1)
                db.setScore.draw(0)
                score = db.getScore()
                setShowReset(true)
            }
            if (status === "Draw") {
                db.setScore.x(0)
                db.setScore.o(0)
                db.setScore.draw(1)
                score = db.getScore()
                setShowReset(true)
            }
        }
    }, [square])

    const resetBoard = () => {
        const board = Array(9).fill(null)
        setSquare(board)
        setShowReset(false)
    }

    const currentTurn = xIsNext ? "O" : "X"
    const nextTurn = xIsNext ? "X" : "O"

    return (
        <Fragment>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className={`pt-28 h-screen ${darkMode ? `bg-[#222]` : `bg-white`}`}>
                <div className="grid grid-cols-1">
                    <div className={`text-xl text-center ${darkMode ? `text-gray-400` : `text-gray-800`} mb-4 font-bold`}>
                        <p>Player: {currentTurn} (Next: {nextTurn})</p>
                        <p>Winner: {status}</p>
                    </div>
                    <div className="grid grid-cols-12 gap-2 mx-auto">
                        {
                            cols.map((item, index) => {
                                return (
                                    <span key={index} className="col-span-4">
                                        <Squares darkMode={darkMode} callback={handleClick} status={status} currentIndex={index} currentTurn={currentTurn} squares={square}/>
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
                
                <div className="flex justify-center">
                    <span className={` pointer-events-none opacity-0 duration-200 transition-all ease-linear ${showRest && `opacity-100 pointer-events-auto p-2 px-3 mb-5`} text-white font-mono cursor-pointer px-3 bg-red-700 text-center rounded-xl mt-6`} onClick={resetBoard}>Reset</span>
                </div>
                
                <div className="flex justify-center flex-row">
                    <table className={`text-center ${darkMode ? `text-white` : `text-black`}`}>
                        <tbody>
                            <tr>
                                <th className={`p-2 md:px-6 ${darkMode ? `border-gray-500` : `border-black`} border-2`}>X</th>
                                {
                                    score.x.map((item, index) => {
                                        return (
                                            <td className={`md:p-2 p-1 ${darkMode ? `border-gray-500` : `border-black`} border-2 md:px-4`} key={index}>{item}</td>
                                        )
                                    })
                                }
                            </tr>
                            <tr>
                                <th className={`p-2 md:px-6 ${darkMode ? `border-gray-500` : `border-black`} border-2`}>Draw</th>
                                {
                                    score.draw.map((item, index) => {
                                        return (
                                            <td className={`md:p-2 p-1 ${darkMode ? `border-gray-500` : `border-black`} border-2 md:px-4`} key={index}>{item}</td>
                                        )
                                    })
                                }
                            </tr>
                            <tr>
                                <th className={`p-2 md:px-6 ${darkMode ? `border-gray-500` : `border-black`} border-2`}>O</th>
                                {
                                    score.o.map((item, index) => {
                                        return (
                                            <td className={`md:p-2 p-1 ${darkMode ? `border-gray-500` : `border-black`} border-2 md:px-4`} key={index}>{item}</td>
                                        )
                                    })
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default Home
