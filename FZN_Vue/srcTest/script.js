const cards = document.querySelectorAll('.card');
const popup = document.getElementById('popup');
const undoButton = document.getElementById('undoButton');

let startX, startY, currentCard;
const removedCards = []; // Stack zum Speichern der weggeswipten Karten

// Event-Listener für alle Karten hinzufügen
cards.forEach(card => {
  // Maus-Events
  card.addEventListener('mousedown', onStart);
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseup', onEnd);

  // Touch-Events
  card.addEventListener('touchstart', onStart);
  card.addEventListener('touchmove', onMove);
  card.addEventListener('touchend', onEnd);
});

function onStart(e) {
  e.preventDefault();
  const touch = e.touches ? e.touches[0] : e;
  startX = touch.clientX;
  startY = touch.clientY;
  currentCard = e.target;
}

function onMove(e) {
  if (!currentCard) return;

  const touch = e.touches ? e.touches[0] : e;
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;

  const rotation = deltaX / 10; // Neigung proportional zur horizontalen Bewegung
  currentCard.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
}

function onEnd(e) {
  if (!currentCard) return;

  const touch = e.changedTouches ? e.changedTouches[0] : e;
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;

  if (deltaX > 150) {
    swipeCard('right');
  } else if (deltaX < -150) {
    swipeCard('left');
  } else if (deltaY < -150) {
    showPopup();
  } else {
    resetCard();
  }

  currentCard = null;
}



let liked = false;

function swipeCard(direction) {
  if (direction === 'right') {
    currentCard.style.transform = 'translateX(500px) rotate(30deg)';
    liked = true;
  } else if (direction === 'left') {
    currentCard.style.transform = 'translateX(-500px) rotate(-30deg)';
    liked = false;
  }

  console.log(liked);

  currentCard.style.opacity = '0';
  removedCards.push(currentCard);
}

function resetCard() {
  currentCard.style.transform = 'translate(0, 0) rotate(0deg)';
}

undoButton.addEventListener('click', () => {
  if (removedCards.length > 0) {
    const lastCard = removedCards.pop();
    lastCard.style.transform = 'translate(0, 0) rotate(0deg)';
    lastCard.style.opacity = '1';
  } else {
    alert('Keine Karten zum Zurückholen!');
  }
});










document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const popup = document.querySelector('.popup');
    let startY;
  
    card.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });
  
    card.addEventListener('touchmove', (e) => {
      const moveY = e.touches[0].clientY;
      if (startY - moveY > 50) { // Swipe up detected
        popup.style.display = 'block';
      }
    });
  });


 // ...existing code...

function showPopup() {
    popup.style.display = 'block';
    currentCard.style.transform = 'translate(0, 0) rotate(0deg)';
  
    // Popup-Schließ-Logik hinzufügen
    document.addEventListener('click', closePopup);
    document.addEventListener('touchstart', closePopup);
  
    // Add touchmove event listener to the popup for swipe down
    popup.addEventListener('touchstart', onPopupTouchStart);
    popup.addEventListener('touchmove', onPopupTouchMove);
  }
  
  function closePopup(e) {
    // Nur schließen, wenn außerhalb des Popups geklickt wurde
    if (!popup.contains(e.target)) {
      hidePopup();
    }
  }
  
  function hidePopup() {
    popup.style.animation = 'slideOutDown 0.5s ease-in-out forwards';
    popup.addEventListener('animationend', () => {
      popup.style.display = 'none';
      popup.style.animation = ''; // Reset animation
    }, { once: true });
    document.removeEventListener('click', closePopup);
    document.removeEventListener('touchstart', closePopup);
  
    // Remove touchmove event listener from the popup
    popup.removeEventListener('touchstart', onPopupTouchStart);
    popup.removeEventListener('touchmove', onPopupTouchMove);
  }
  
  let popupStartY;
  
  function onPopupTouchStart(e) {
    popupStartY = e.touches[0].clientY;
  }
  
  function onPopupTouchMove(e) {
    const moveY = e.touches[0].clientY;
    
    if (moveY - popupStartY > 50 && popup.scrollTop === 0) { // Swipe down detected and scroll position is at the top
      hidePopup();
    }
  }
  
  const scrollContainer = document.querySelector('.scroll-container');
  scrollContainer.addEventListener('touchstart', (e) => {
    e.stopPropagation();
  });
  
  scrollContainer.addEventListener('touchmove', (e) => {
    e.stopPropagation();
  });
  
  scrollContainer.addEventListener('touchend', (e) => {
    e.stopPropagation();
  });