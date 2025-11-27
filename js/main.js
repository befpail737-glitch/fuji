// Main JavaScript file for Fuji Electric Distributor website

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileToggle = document.createElement('div');
    mobileToggle.classList.add('mobile-toggle');
    mobileToggle.innerHTML = '☰';
    mobileToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.classList.toggle('show');
    });

    // Add mobile toggle to header on mobile devices
    if (window.innerWidth < 769) {
        const headerContainer = document.querySelector('header .container');
        headerContainer.insertBefore(mobileToggle, headerContainer.firstChild);
    }

    // Update toggle position when window resizes
    window.addEventListener('resize', function() {
        if (window.innerWidth < 769) {
            const headerContainer = document.querySelector('header .container');
            if (!document.querySelector('.mobile-toggle')) {
                const mobileToggle = document.createElement('div');
                mobileToggle.classList.add('mobile-toggle');
                mobileToggle.innerHTML = '☰';
                mobileToggle.addEventListener('click', function() {
                    const nav = document.querySelector('nav ul');
                    nav.classList.toggle('show');
                });
                headerContainer.insertBefore(mobileToggle, headerContainer.firstChild);
            }
        } else {
            const toggle = document.querySelector('.mobile-toggle');
            if (toggle) toggle.remove();
            const nav = document.querySelector('nav ul');
            if (nav) nav.classList.remove('show');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current page in navigation
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('nav a');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].className = 'active';
        }
    }

    // Initialize search and filter functionality if on product pages
    initSearchAndFilter();
});

// Function to handle contact panel (WhatsApp, WeChat) visibility on mobile
function initContactPanel() {
    const contactPanel = document.querySelector('.contact-panel');
    if (contactPanel && window.innerWidth < 769) {
        // On mobile, move contact info to a more visible location
        contactPanel.classList.add('mobile-visible');
    }
}

// Initialize search and filter functionality
function initSearchAndFilter() {
    // Product search functionality
    const searchInput = document.querySelector('#product-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card, .category-card');

            productCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Product filter functionality
    const filterSelect = document.querySelector('#product-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const filterValue = this.value;
            const productCards = document.querySelectorAll('.product-card, .category-card');

            productCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardTags = card.getAttribute('data-tags');
                    if (cardTags && cardTags.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    }
}

// Inquiry cart functionality
function addToInquiry(partNumber, description, specifications) {
    // Get existing inquiry items from localStorage or initialize empty array
    let inquiryItems = JSON.parse(localStorage.getItem('inquiryItems')) || [];

    // Check if item already exists in inquiry
    const existingItemIndex = inquiryItems.findIndex(item => item.partNumber === partNumber);

    if (existingItemIndex > -1) {
        // If item already exists, increment quantity
        inquiryItems[existingItemIndex].quantity += 1;
    } else {
        // Add new item to inquiry
        inquiryItems.push({
            partNumber: partNumber,
            description: description,
            specifications: specifications,
            quantity: 1,
            dateAdded: new Date().toISOString()
        });
    }

    // Save updated inquiry items back to localStorage
    localStorage.setItem('inquiryItems', JSON.stringify(inquiryItems));

    // Show confirmation message
    alert(`${partNumber} has been added to your inquiry list!`);

    // Update inquiry count
    updateInquiryCount();
}

// Update inquiry count display
function updateInquiryCount() {
    const inquiryItems = JSON.parse(localStorage.getItem('inquiryItems')) || [];
    const inquiryCount = inquiryItems.length;

    // Update display if there's an element to show the count
    const inquiryCountElement = document.getElementById('inquiry-count');
    if (inquiryCountElement) {
        inquiryCountElement.textContent = inquiryCount;
        inquiryCountElement.style.display = inquiryCount > 0 ? 'inline-block' : 'none';
    }
}

// Initialize inquiry count display when page loads
document.addEventListener('DOMContentLoaded', updateInquiryCount);

// Initialize contact panel when DOM is loaded
document.addEventListener('DOMContentLoaded', initContactPanel);

// Handle window resize for responsive elements
window.addEventListener('resize', function() {
    initContactPanel();
});