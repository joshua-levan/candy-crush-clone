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

    const dragStart = () => {
        console.log(this.id, 'dragstart')
    }
    const dragEnd = () => {
        colorBeingDragged = this.style.backgroundColor
        console.log(colorBeingDragged)
        console.log(this.id, 'dragend')
    }
    const dragOver = () => {
        console.log(this.id, 'dragover')
    }
    const dragEnter = () => {
        console.log(this.id, 'dragenter')
    }
    const dragLeave = () => {
        console.log(this.id, 'dragleave')
    }
    const dragDrop = () => {
        console.log(this.id, 'dragdrop')
    }
    squares.forEach(square=> square.addEventListener('dragstart', dragStart))
    squares.forEach(square=> square.addEventListener('dragend', dragEnd))
    squares.forEach(square=> square.addEventListener('dragover', dragOver))
    squares.forEach(square=> square.addEventListener('dragenter', dragEnter))
    squares.forEach(square=> square.addEventListener('dragleave', dragLeave))
    squares.forEach(square=> square.addEventListener('drop', dragDrop))
})
