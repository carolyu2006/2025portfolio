// Main script file

function toggleMenu() {
    const dropdown = document.getElementById('menu-dropdown');
    dropdown.classList.remove('menu-closing');
    dropdown.classList.toggle('menu-open');
}

function closeMenu() {
    const dropdown = document.getElementById('menu-dropdown');
    if (dropdown.classList.contains('menu-open')) {
        dropdown.classList.add('menu-closing');
        dropdown.classList.remove('menu-open');
        // Wait for animation to complete before hiding
        setTimeout(() => {
            dropdown.classList.remove('menu-closing');
        }, 1000);
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('menu-dropdown');
    const menuButton = document.querySelector('.menu-button');
    
    if (dropdown && menuButton && !dropdown.contains(event.target) && !menuButton.contains(event.target)) {
        if (dropdown.classList.contains('menu-open')) {
            dropdown.classList.add('menu-closing');
            dropdown.classList.remove('menu-open');
            setTimeout(() => {
                dropdown.classList.remove('menu-closing');
            }, 600);
        }
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.menu-dropdown-content a').forEach(link => {
    link.addEventListener('click', function() {
        const dropdown = document.getElementById('menu-dropdown');
        if (dropdown.classList.contains('menu-open')) {
            dropdown.classList.add('menu-closing');
            dropdown.classList.remove('menu-open');
            setTimeout(() => {
                dropdown.classList.remove('menu-closing');
            }, 600);
        }
    });
});

// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorText = document.createElement('span');
    cursorText.className = 'custom-cursor-text';
    cursorText.textContent = 'view';
    cursor.appendChild(cursorText);
    document.body.appendChild(cursor);

    // Track mouse movement
    // Initialize to center of viewport
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let hoverTimeout = null;

    // Set initial cursor position
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow with better responsiveness
    function animateCursor() {
        // Use a higher easing factor for better responsiveness
        const ease = 0.15;
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Function to check if element is within excluded areas (header, footer, sidebar)
    function isInExcludedArea(element) {
        if (!element) return false;
        
        let current = element;
        while (current && current !== document.body && current !== document.documentElement) {
            // Check if it's a button
            if (current.tagName === 'BUTTON') {
                return true;
            }
            // Check if it's a social icon
            if (current.classList && current.classList.contains('social-icon')) {
                return true;
            }
            // Check if it's a footer email
            if (current.classList && current.classList.contains('footer-email')) {
                return true;
            }
            // Check if it's a head email (about page)
            if (current.classList && current.classList.contains('head-email')) {
                return true;
            }
            // Check if it's in header
            if (current.tagName === 'HEADER' || 
                (current.classList && current.classList.contains('main-header')) ||
                (current.id && current.id === 'menu-dropdown')) {
                return true;
            }
            // Check if it's in footer
            if (current.tagName === 'FOOTER') {
                return true;
            }
            // Check if it's in sidebar
            if (current.classList && current.classList.contains('sidebar')) {
                return true;
            }
            
            current = current.parentElement;
        }
        
        return false;
    }

    // Function to check if element or any parent is clickable
    function isClickable(element) {
        if (!element || element === document.body || element === document.documentElement) return false;
        
        // Exclude buttons and elements in header, footer, sidebar
        if (isInExcludedArea(element)) {
            return false;
        }
        
        let current = element;
        // Check element and all parents up to body
        while (current && current !== document.body && current !== document.documentElement) {
            // Check if it's a link with href (not just #)
            if (current.tagName === 'A') {
                const href = current.getAttribute('href');
                if (href && href !== '#' && href.trim() !== '') {
                    return true;
                }
            }
            // Check if it has onclick attribute
            if (current.hasAttribute('onclick')) {
                return true;
            }
            // Allow manual cursor-hover class for custom elements
            if (current.classList && current.classList.contains('cursor-hover')) {
                return true;
            }
            
            current = current.parentElement;
        }
        
        return false;
    }

    // Handle hover state
    function setHoverState(isHovering) {
        // Clear any pending timeout
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }
        
        if (isHovering) {
            cursor.classList.add('hover');
        } else {
            // Small delay to handle moving between nested elements
            hoverTimeout = setTimeout(() => {
                cursor.classList.remove('hover');
            }, 50);
        }
    }

    // Check on mouseover
    document.addEventListener('mouseover', (e) => {
        if (isClickable(e.target)) {
            setHoverState(true);
        }
    });

    // Check on mouseout
    document.addEventListener('mouseout', (e) => {
        // If moving to a related target, check if it's also clickable
        if (e.relatedTarget && isClickable(e.relatedTarget)) {
            // Stay in hover state
            return;
        }
        setHoverState(false);
    });
});

// Social icon typewriter effect and icon shifting
document.addEventListener('DOMContentLoaded', () => {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    // Create label spans and set up typewriter effect
    socialIcons.forEach((icon) => {
        const label = icon.getAttribute('aria-label');
        if (label) {
            const labelSpan = document.createElement('span');
            labelSpan.className = 'social-icon-label';
            labelSpan.setAttribute('data-full-text', label);
            icon.appendChild(labelSpan);
            
            let typewriterTimeout = null;
            let currentText = '';
            
            icon.addEventListener('mouseenter', () => {
                // Clear any existing timeout
                if (typewriterTimeout) {
                    clearTimeout(typewriterTimeout);
                }
                
                // Reset text
                currentText = '';
                labelSpan.textContent = '';
                labelSpan.style.opacity = '1';
                
                // Shift icons to the right
                const container = icon.closest('.footer-social-icons') || icon.closest('.head-social-icons');
                if (container) {
                    const icons = Array.from(container.querySelectorAll('.social-icon'));
                    const currentIndex = icons.indexOf(icon);
                    
                    // Calculate the width needed for the label
                    // Temporarily set full text to measure
                    labelSpan.textContent = label;
                    labelSpan.style.opacity = '1';
                    const labelWidth = labelSpan.offsetWidth;
                    labelSpan.textContent = '';
                    
                    // Shift subsequent icons
                    icons.forEach((otherIcon, otherIndex) => {
                        if (otherIndex > currentIndex) {
                            otherIcon.style.transition = 'transform 0.3s ease';
                            otherIcon.style.transform = `translateX(${labelWidth + 10}px)`;
                        }
                    });
                }
                
                // Typewriter effect
                const fullText = label;
                let charIndex = 0;
                
                const typeChar = () => {
                    if (charIndex < fullText.length) {
                        currentText += fullText[charIndex];
                        labelSpan.textContent = currentText;
                        charIndex++;
                        typewriterTimeout = setTimeout(typeChar, 50); // 50ms per character
                    }
                };
                
                typeChar();
            });
            
            icon.addEventListener('mouseleave', () => {
                // Clear typewriter
                if (typewriterTimeout) {
                    clearTimeout(typewriterTimeout);
                }
                
                // Reset label
                labelSpan.textContent = '';
                labelSpan.style.opacity = '0';
                
                // Reset icon positions
                const container = icon.closest('.footer-social-icons') || icon.closest('.head-social-icons');
                if (container) {
                    const icons = container.querySelectorAll('.social-icon');
                    icons.forEach(otherIcon => {
                        otherIcon.style.transition = 'transform 0.3s ease';
                        otherIcon.style.transform = 'translateX(0)';
                    });
                }
            });
        }
    });
});

// Feature selection for project pages
document.addEventListener('DOMContentLoaded', () => {
    const featureNames = document.querySelectorAll('.feature-name');
    const featureContentItems = document.querySelectorAll('.feature-content-item');
    
    if (featureNames.length > 0 && featureContentItems.length > 0) {
        featureNames.forEach(featureName => {
            featureName.addEventListener('click', () => {
                const featureId = featureName.getAttribute('data-feature');
                
                // Remove active class from all feature names
                featureNames.forEach(name => name.classList.remove('active'));
                
                // Add active class to clicked feature name
                featureName.classList.add('active');
                
                // Hide all feature content items
                featureContentItems.forEach(item => item.classList.remove('active'));
                
                // Show selected feature content
                const targetContent = document.getElementById(featureId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});

