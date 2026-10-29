document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score-display')
    const width = 8
    const squares = []
    let score = 0
    const candyColors = [
        'tomato',
        'darkkhaki',
        'lightgoldenrodyellow',
        'aquamarine',
        'cornflowerblue',
        'violet'
    ]

    //Create Board
    const creatGrid = () => {
        for (let i = 0; i< width*width; i++){
        const square = document.createElement('div')
        square.setAttribute('draggable', true)
        square.setAttribute('id', i)
        let randomColor = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundColor = candyColors[randomColor]
        grid.appendChild(square)
        squares.push(square)
        }
    }

    creatGrid()

    //Drag Candies
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    const dragStart = ({ currentTarget }) => {
        colorBeingDragged = currentTarget.style.backgroundColor
        squareIdBeingDragged = parseInt(currentTarget.id)
    }
    const dragEnd = ({ currentTarget }) => {
        //what is a valid move?
        let validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged + 1, squareIdBeingDragged - width, squareIdBeingDragged + width]
        let validMove = validMoves.includes(squareIdBeingReplaced)

        if(squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
        } else {
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
        } 
    }
    const dragOver = e => {
        e.preventDefault()
    }
    const dragEnter = ({ currentTarget }) => {
    }
    const dragLeave = ({ currentTarget }) => {
    }
    const dragDrop = ({ currentTarget }) => {
        colorBeingReplaced = currentTarget.style.backgroundColor
        squareIdBeingReplaced = parseInt(currentTarget.id)
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
        squares[squareIdBeingReplaced].style.backgroundColor = colorBeingDragged

    }
    squares.forEach(square=> square.addEventListener('dragstart', dragStart))
    squares.forEach(square=> square.addEventListener('dragend', dragEnd))
    squares.forEach(square=> square.addEventListener('dragover', dragOver))
    squares.forEach(square=> square.addEventListener('dragenter', dragEnter))
    squares.forEach(square=> square.addEventListener('dragleave', dragLeave))
    squares.forEach(square=> square.addEventListener('drop', dragDrop))

    //Gravity Logic
    const moveDown = () => {
            for(i = 0; i < 56; i++){
                if(squares[i + width].style.backgroundColor === '') {
                    squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
                    squares[i].style.backgroundColor = ''
                    const firstRow = [0,1,2,3,4,5,6,7]
                    const isFirstRow = firstRow.includes(i)
                    if(isFirstRow && squares[i].style.backgroundColor === '') {
                        let randomColor = Math.floor(Math.random() * candyColors.length)
                        squares[i].style.backgroundColor = candyColors[randomColor]
                    }
                }
        }
    }

    //Checking for Matches
    //3
    const checkRowForThree = () => {
        for (i = 0; i < 64; i++) {
            let rowOfThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            const isNotValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63]
            if(isNotValid.includes(i)) continue

            if(rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.textContent = score
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }

    checkRowForThree()

    const checkColumnForThree = () => {
        for (i = 0; i < 48; i++) {
            let columnOfThree = [i, i+width, i+(width*2)]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if(columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.textContent = score
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }

    checkColumnForThree()

    //4
    const checkRowForFour = () => {
        for (i = 0; i < 64; i++) {
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            const isNotValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,61,62,63]
            if(isNotValid.includes(i)) continue

            if(rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.textContent = score
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }

    checkRowForFour()

    const checkColumnForFour = () => {
        for (i = 0; i < 40; i++) {
            let columnOfFour = [i, i+width, i+(width*2), i+(width*3)]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if(columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.textContent = score
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }

    checkColumnForFour()

    const removeHighlight = () => {
        squares.forEach(square => {
            if(!square.style.backgroundColor){
                square.style.boxShadow = 'none'
            } else {
                square.style.boxShadow = 'inset 4px 4px 16px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px 4px rgba(255, 255, 255, 0.5)'
            }
        })
    }

    window.setInterval(() => {
        moveDown()
        checkRowForFour()
        checkColumnForFour()
        checkColumnForThree()
        checkRowForThree()
        removeHighlight()
    }, 100)
})
