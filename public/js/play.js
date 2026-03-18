// Tag filter
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.play-item-wrapper');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            items.forEach(item => {
                if (filter === 'all' || item.dataset.tag === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});

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

