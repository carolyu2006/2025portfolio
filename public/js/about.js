// Flip Cards functionality for About page
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    if (flipCards.length === 0) return; // Only run on pages with flip cards
    
    let currentCardIndex = 0;
    let flipInterval;
    let imageIntervals = [];
    let hoveredCards = new Set();
    
    // Initialize image switching for each card with random intervals
    function initImageSwitching() {
        flipCards.forEach((card) => {
            const images = card.querySelectorAll('.card-image');
            if (images.length <= 1) return;             
            let currentImageIndex = 0;
            let timeoutId;
            
            // Function to switch to next image with random delay
            function switchImage() {
                // Don't switch images if card is hovered
                if (hoveredCards.has(card)) {
                    // If hovered, check again after a short delay
                    timeoutId = setTimeout(switchImage, 500);
                    return;
                }
                
                images[currentImageIndex].classList.remove('active');
                currentImageIndex = (currentImageIndex + 1) % images.length;
                images[currentImageIndex].classList.add('active');
                
                const randomInterval =  Math.random() * 8000;
                timeoutId = setTimeout(switchImage, randomInterval);
            }
            
            // Start with random initial delay for each card (0-3 seconds)
            const initialDelay = Math.random() * 8000;
            timeoutId = setTimeout(switchImage, initialDelay);
            
            imageIntervals.push(timeoutId);
        });
    }
    
    // Auto-flip cards in sequence
    function startAutoFlip() {
        flipInterval = setInterval(() => {
            // Reset previous card if not hovered
            const prevCard = flipCards[currentCardIndex];
            if (!hoveredCards.has(prevCard)) {
                prevCard.classList.remove('flipped');
            }
            
            // Move to next card
            currentCardIndex = (currentCardIndex + 1) % flipCards.length;
            const nextCard = flipCards[currentCardIndex];
            
            // Only auto-flip if not hovered
            if (!hoveredCards.has(nextCard)) {
                // Flip current card
                setTimeout(() => {
                    if (!hoveredCards.has(nextCard)) {
                        nextCard.classList.add('flipped');
                    }
                }, 100);
                
                // Flip it back after showing the back
                setTimeout(() => {
                    if (!hoveredCards.has(nextCard)) {
                        nextCard.classList.remove('flipped');
                    }
                }, 2500);
            }
        }, 4000); // Flip a new card every 4 seconds
    }
    
    // Track hover state to pause auto-flip and image switching
    flipCards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            hoveredCards.add(this);
            // Remove auto-flip class when user hovers (CSS handles the flip)
            this.classList.remove('flipped');
        });
        
        card.addEventListener('mouseleave', function() {
            hoveredCards.delete(this);
            // CSS will handle removing the flip on mouse leave
        });
    });
    
    // Start image switching
    initImageSwitching();
    
    // Start auto-flip after initial delay
    setTimeout(() => {
        startAutoFlip();
    }, 2000);
});