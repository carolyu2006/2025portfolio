// Directional swipe effect for play items
document.addEventListener('DOMContentLoaded', () => {
    const playItemWrappers = document.querySelectorAll('.play-item-wrapper.swipe');

    // Swipe effect for play items with swipe class
    playItemWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const width = rect.width;
            const height = rect.height;
            
            // Determine entry direction
            const leftDistance = mouseX;
            const rightDistance = width - mouseX;
            const topDistance = mouseY;
            const bottomDistance = height - mouseY;
            
            // Find the closest edge
            const minDistance = Math.min(leftDistance, rightDistance, topDistance, bottomDistance);
            
            // Remove existing swipe classes
            wrapper.classList.remove('swipe-left', 'swipe-right', 'swipe-up', 'swipe-down');
            
            // Apply appropriate swipe direction
            if (minDistance === leftDistance) {
                // Entered from left
                wrapper.classList.add('swipe-left');
            } else if (minDistance === rightDistance) {
                // Entered from right
                wrapper.classList.add('swipe-right');
            } else if (minDistance === topDistance) {
                // Entered from top
                wrapper.classList.add('swipe-up');
            } else {
                wrapper.classList.add('swipe-down');
            }
        });
    });
});

