// Community section — expand/collapse (whole row clickable)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.community-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            if (e.target.closest('.community-detail')) return;
            var btn = this.querySelector('.community-expand');
            var isExpanded = this.classList.toggle('expanded');
            if (btn) btn.setAttribute('aria-expanded', isExpanded);
        });
    });
});

// Measurements aligned with about.css (.interests-container { top: 120px }, etc.)
const STICKY_TOP = 120;
const START_DELAY = 0.1; // Start animation at 10% through the scroll
const END_DELAY = 1.0; // End animation at 100% (extends the visible range)

document.addEventListener('DOMContentLoaded', function() {
    const scrollWrapper = document.querySelector('.interests-scroll-wrapper');
    const interestsContainer = document.querySelector('.interests-container');
    const scrollContent = document.querySelector('.interests-scroll-content');
    const interestItem = document.querySelector('.interest-item');
    
    if (!scrollWrapper || !interestsContainer || !scrollContent || !interestItem) {
        console.log('Interest elements not found');
        return;
    }
    
    let maxScroll = 0;
    let imagesLoaded = false;
    
    function calculateMaxScroll() {
        const images = interestItem.querySelectorAll('img');
        maxScroll = 0;
        
        images.forEach(img => {
            const imgWidth = img.offsetWidth || img.clientWidth;
            const marginRight = parseInt(window.getComputedStyle(img).marginRight) || 0;
            maxScroll += imgWidth + marginRight;
        });
        
        // Add extra padding to ensure last image is fully visible
        maxScroll = Math.max(0, maxScroll - window.innerWidth + 300);
        imagesLoaded = true;
        console.log('Max scroll calculated:', maxScroll, 'px');
    }
    
    const images = interestItem.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    function maybeRunCalculate() {
        if (loadedCount >= totalImages) {
            setTimeout(calculateMaxScroll, 100);
        }
    }
    
    if (totalImages === 0) {
        calculateMaxScroll();
    } else {
        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener('load', function() {
                    loadedCount++;
                    maybeRunCalculate();
                });
                img.addEventListener('error', function() {
                    loadedCount++;
                    maybeRunCalculate();
                });
            }
        });
        if (loadedCount >= totalImages) {
            setTimeout(calculateMaxScroll, 100);
        }
        setTimeout(function() {
            if (!imagesLoaded) calculateMaxScroll();
        }, 1500);
    }
    
    function updateHorizontalScroll() {
        const wrapperRect = scrollWrapper.getBoundingClientRect();
        const wrapperTop = wrapperRect.top;
        const wrapperHeight = wrapperRect.height;
        const viewportHeight = window.innerHeight;
        const denominator = wrapperHeight - (viewportHeight - STICKY_TOP);
        
        let scrollDistance = 0;
        
        // Only animate when wrapper is in sticky range
        if (imagesLoaded && maxScroll > 0 && denominator > 0) {
            const isInView = wrapperTop <= STICKY_TOP && (wrapperTop + wrapperHeight) > viewportHeight;
            
            if (isInView) {
                // Raw progress from 0 to 1
                const rawProgress = (STICKY_TOP - wrapperTop) / denominator;
                
                // Apply start and end delays - animation maps from START_DELAY to END_DELAY
                const delayedProgress = Math.max(0, Math.min(1, 
                    (rawProgress - START_DELAY) / (END_DELAY - START_DELAY)
                ));
                
                scrollDistance = delayedProgress * maxScroll;
            } else if (wrapperTop + wrapperHeight <= viewportHeight) {
                // Past the end - keep at max scroll to prevent jumping
                scrollDistance = maxScroll;
            }
        }
        
        scrollContent.style.transform = `translateY(-50%) translateX(-${scrollDistance}px)`;
    }
    
    // Throttle scroll for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHorizontalScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    window.addEventListener('resize', () => {
        calculateMaxScroll();
        updateHorizontalScroll();
    });
    
    // Initial call after a short delay
    setTimeout(updateHorizontalScroll, 200);
});