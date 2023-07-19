//variables for html element
const section = document.querySelector('section')
const playerLivesCount = document.querySelector('span')
let playerLives = 6

//link with text
playerLivesCount.textContent = playerLives

//data for the cards
const getData = () => [
  { imgSrc: './images/img1.jpeg', name: 'image1' },
  { imgSrc: './images/img2.jpeg', name: 'image2' },
  { imgSrc: './images/img3.jpeg', name: 'image3' },
  { imgSrc: './images/img4.jpeg', name: 'image4' },
  { imgSrc: './images/img5.jpeg', name: 'image5' },
  { imgSrc: './images/img6.jpeg', name: 'image6' },
  { imgSrc: './images/img7.jpeg', name: 'image7' },
  { imgSrc: './images/img8.jpeg', name: 'image8' },
  { imgSrc: './images/img1.jpeg', name: 'image1' },
  { imgSrc: './images/img2.jpeg', name: 'image2' },
  { imgSrc: './images/img3.jpeg', name: 'image3' },
  { imgSrc: './images/img4.jpeg', name: 'image4' },
  { imgSrc: './images/img5.jpeg', name: 'image5' },
  { imgSrc: './images/img6.jpeg', name: 'image6' },
  { imgSrc: './images/img7.jpeg', name: 'image7' },
  { imgSrc: './images/img8.jpeg', name: 'image8' },
]

//shuffle array
const shuffle = () => {
  const cardData = getData()
  cardData.sort(() => Math.random() - 0.5)
  return cardData
}

//function to generate cards
const cardGenerator = () => {
  const cardData = shuffle()

  cardData.forEach((item) => {
    //generate html elements for card
    const card = document.createElement('div') //div as a card
    const face = document.createElement('img') //img card front
    const back = document.createElement('div') //div card back

    //add class to card
    card.classList = 'card'
    face.classList = 'face'
    back.classList = 'back'

    //attach cards images
    face.src = item.imgSrc
    card.setAttribute('name', item.name)
    //attach cards to the section
    section.appendChild(card)
    card.appendChild(face)
    card.appendChild(back)

    //event listener on click to flip card
    card.addEventListener('click', (evt) => {
      card.classList.toggle('toggleCard')
      checkCards(evt)
    })
  })
}

//function to check cards

const checkCards = (evt) => {
  const clickedCard = evt.target
  clickedCard.classList.add('flipped') //add flipped class when card flipped
  const flippedCards = document.querySelectorAll('.flipped')
  const toggleCards = document.querySelectorAll('.toggleCard')
  console.log(flippedCards)
  //check the cards if matched
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute('name') ===
      flippedCards[1].getAttribute('name')
    ) {
      console.log('match')
      flippedCards.forEach((card) => {
        card.classList.remove('flipped')
        card.style.pointerEvents = 'none'
      })
    } else {
      console.log('wrong')
      flippedCards.forEach((card) => {
        card.classList.remove('flipped')
        setTimeout(() => card.classList.remove('toggleCard'), 1000)
      })
      playerLives--
      playerLivesCount.textContent = playerLives
      if (playerLives === 0) restart('You suck!!!')
    }
  }
  //check if the player has won
  if (toggleCards.length === 16) {
    restart('Not bad, you won this time')
  }
}
//Restart function
const restart = (text) => {
  //shuffle again
  let cardData = shuffle()
  playerLives = 6

  //add new info into cards
  let faces = document.querySelectorAll('.face')
  let cards = document.querySelectorAll('.card')
  //disable click event till the game reseted
  section.style.pointerEvents = 'none'
  cardData.forEach((item, index) => {
    //set timeout so it shuffle after ALL cards flipped back
    setTimeout(() => {
      //flip cards back
      cards[index].classList.remove('toggleCard')
      //add pointer event back so images are clickable again
      cards[index].style.pointerEvents = 'all'
      //add images back
      faces[index].src = item.imgSrc
      //update corresponding name so the checkCard function works properly
      cards[index].setAttribute('name', item.name)
      //add back pointer event to the section
      section.style.pointerEvents = 'all'
    }, 1000)
  })
  //set timeout again so the message appeared after all cards flipped or lives is 0
  setTimeout(() => {
    alert(text)
  }, 200)
}

cardGenerator()
