const initiaValue = {
    x: [],
    o: [],
    draw: []
}

export const db = {
    setScore: {
        x: function (score) {
            const data = localStorage.getItem("TicTakToe") ? JSON.parse(localStorage.getItem("TicTakToe")) : initiaValue
            data.x.push(score)
            if (data.x.length > 10) {
                data.x.shift()
            }
            const result = JSON.stringify(data)
            localStorage.setItem("TicTakToe", result)
        },
        o: function (score) {
            const data = localStorage.getItem("TicTakToe") ? JSON.parse(localStorage.getItem("TicTakToe")) : initiaValue
            data.o.push(score)
            if (data.o.length > 10) {
                data.o.shift()
            }
            const result = JSON.stringify(data)
            localStorage.setItem("TicTakToe", result)
        },
        draw: function (score) {
            const data = localStorage.getItem("TicTakToe") ? JSON.parse(localStorage.getItem("TicTakToe")) : initiaValue
            data.draw.push(score)
            if (data.draw.length > 10) {
                data.draw.shift()
            }
            const result = JSON.stringify(data)
            localStorage.setItem("TicTakToe", result)
        }
    },
    getScore: function (){
        const data = localStorage.getItem("TicTakToe") ? JSON.parse(localStorage.getItem("TicTakToe")) : initiaValue
        return data
    }
}