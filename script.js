document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('container')
    var currentScore = document.getElementById('score')
    for (var i = 0; i < 100; i++) {
        const newDiv = document.createElement('div')
        //newDiv.innerHTML = i
        newDiv.classList.add('square')
        newDiv.dataset.no = i
        container.appendChild(newDiv)
    }
    
    var j = 54
    var x = 1
    var snakeArray = [54]
    var star = null
    var score = 0

    var myInterval = setInterval(function() {
        currentScore.innerHTML = score
        var availableSquares = []
        var square = document.querySelectorAll('.square')
        square.forEach(element => {
            element.classList.remove('active')
        })
        
        for (var i = 0; i < 100; i++) {
            if (snakeArray.indexOf(i) == -1) {
                availableSquares.push(i)
            }
        }

        
        console.log(star)

        console.log(availableSquares)

        snakeArray.unshift(j)
        snakeArray.pop()
        
        document.onkeydown = checkKey
        
        for (var i = 0; i < snakeArray.length; i++) {
        document.querySelector(`[data-no="${snakeArray[i]}"]`).classList.add('active')
        }

        checkStarEaten()
        boundary()
        pickStar(availableSquares)
        j += x
        gameOver()
        
        //if (j == 3) {
        //    clearInterval(myInterval)
        //}
    }, 250)

    function checkKey(e) {
        e = e || window.event;
        
        if (e.keyCode == '38') {
            // up arrow
            x = - 10
        }
        else if (e.keyCode == '40') {
            // down arrow
            x = 10
        }
        else if (e.keyCode == '37') {
           // left arrow
           x = -1
        }
        else if (e.keyCode == '39') {
           // right arrow
           x = 1
        }
    }

    function boundary() {
        if (x == 1 && (j - 9) % 10 == 0) {
            j -= 10
        }
        if (x == -1 && j % 10 == 0) {
            j += 10
        }
        if (x == -10 && j < 10) {
            j += 100
        }
        if (x == 10 && j > 89) {
            j -= 100
        }
    }

    function pickStar(availableSquares) {
        if (star == null) {
            star = availableSquares[Math.round(Math.random() * availableSquares.length)]
            document.querySelector(`[data-no="${star}"]`).classList.add('star')
        }
    }

    function checkStarEaten() {
        if (star == j) {
            document.querySelector(`[data-no="${star}"]`).classList.remove('star')
            snakeArray.unshift(star)
            star = null
            score++
        }
    }

    function gameOver() {
        if (snakeArray.indexOf(j) != -1) {
            clearInterval(myInterval)
        }
    }

})