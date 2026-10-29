document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []
    const candyColors = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple'
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
        console.log(colorBeingDragged)
        console.log(currentTarget.id, 'dragstart')
    }
    const dragEnd = ({ currentTarget }) => {
        console.log(currentTarget.id, 'dragend')
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
        console.log(e.currentTarget.id, 'dragover')
    }
    const dragEnter = ({ currentTarget }) => {
        console.log(currentTarget.id, 'dragenter')
    }
    const dragLeave = ({ currentTarget }) => {
        console.log(currentTarget.id, 'dragleave')
    }
    const dragDrop = ({ currentTarget }) => {
        colorBeingReplaced = currentTarget.style.backgroundColor
        console.log(currentTarget.id, 'dragdrop')
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
})
