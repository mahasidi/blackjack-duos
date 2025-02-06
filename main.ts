// initializing deck + game
radio.setGroup(14)

let cardValue = 0
let totalScore = 0
let p2Score = 0
let p1Score = 0
let p2Played = false
let p1Played = false

let deck: number[] = []
deck = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    10,
    10,
    10
]

// hit me button
input.onButtonPressed(Button.B, function () {
    // pull a random card from the deck
    cardValue = deck[Math.randomRange(0, deck.length - 1)]
    // keep score from all the pulls
    totalScore += cardValue
    basic.showNumber(totalScore)
})

// stay button
input.onButtonPressed(Button.A, function () {
    // if player 1 hasn't locked in their score
    if (!(p1Played)) {
        basic.showNumber(totalScore)
        // send score
        radio.sendNumber(totalScore)
        // save score
        p1Score = totalScore
        // player 1 has now had their turn
        p1Played = true
        totalScore = 0

    // if player 2 hasn't locked in their score
    } else if (!(p2Played)) {
        basic.showNumber(totalScore)
        // send score
        radio.sendNumber(totalScore)
        // save score
        p2Score = totalScore
        // player 2 has now had their turn
        p2Played = true
        checkWinner()
    }
})

// when a number is received
radio.onReceivedNumber(function (receivedNumber) {
    // if player 1's score hasn't been recieved
    if (!(p1Played)) {
        // save receivedNumber as p1 score
        p1Score = receivedNumber
        p1Played = true
    } else {
        // otherwise, save receivedNumber as p2 score
        p2Score = receivedNumber
        p2Played = true
        checkWinner()
    }
})

function checkWinner() {
    if (p1Played && p2Played) {
        if (p1Score > 21 && p2Score > 21) {
            basic.showString("Tie, Both Bust")
        } else if (p1Score > 21) {
            basic.showString("P2 Won, P1 Bust")
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.UntilDone)
        } else if (p2Score > 21) {
            basic.showString("P1 Won, P2 Bust")
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.UntilDone)
        } else {
            if (p1Score > p2Score) {
                basic.showString("P1 Won!")
                music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.UntilDone)
            } else if (p1Score < p2Score) {
                basic.showString("P2 Won!")
                music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.UntilDone)
            } else {
                basic.showString("Tie!")
            }
        }
        reset()
    }
}

// hard reset
input.onButtonPressed(Button.AB, function () {
    control.reset()
})

// reset game variables
function reset() {
    totalScore = 0
    p1Score = 0
    p2Score = 0
    p1Played = false
    p2Played = false
}

