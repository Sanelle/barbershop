// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const bookNowBtn = document.getElementById('book-now-btn');
const bookingWidget = document.querySelector('.booking-widget');
const closeWidget = document.querySelector('.close-widget');
const prevStepBtn = document.getElementById('prev-step');
const nextStepBtn = document.getElementById('next-step');
const confirmBookingBtn = document.getElementById('confirm-booking');
const bookingSteps = document.querySelectorAll('.booking-step');
const stepIndicators = document.querySelectorAll('.step-indicator');
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
const quickViewModal = document.getElementById('quick-view-modal');
const closeQuickView = document.querySelector('.close-modal');
const barberModal = document.getElementById('barber-modal');
const viewBarberBtns = document.querySelectorAll('.view-barber');
const closeBarberModal = barberModal.querySelector('.close-modal');
const giftCardBtn = document.getElementById('gift-card-btn');
const giftCardModal = document.getElementById('gift-card-modal');
const closeGiftCardModal = giftCardModal.querySelector('.close-modal');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryLightbox = document.getElementById('gallery-lightbox');
const closeLightbox = galleryLightbox.querySelector('.close-lightbox');
const prevLightbox = galleryLightbox.querySelector('.prev');
const nextLightbox = galleryLightbox.querySelector('.next');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const toast = document.getElementById('toast');
const closeToast = document.querySelector('.toast-close');
const loadMoreServicesBtn = document.getElementById('load-more-services');
const viewAllBarbersBtn = document.getElementById('view-all-barbers');
const viewFullGalleryBtn = document.getElementById('view-full-gallery');
const leaveReviewBtn = document.getElementById('leave-review');
const newsletterForm = document.getElementById('newsletter-form');
const scrollIndicator = document.querySelector('.scroll-indicator');
const preloader = document.querySelector('.preloader');

// Global Variables
let currentStep = 1;
let currentBarberId = null;
let currentServiceId = null;
let currentGalleryIndex = 0;
const galleryImages = Array.from(galleryItems);
const barbers = [
  {
    id: 1,
    name: 'James Wilson',
    title: 'Master Barber / Founder',
    rating: 4.8,
    reviews: 210,
    status: 'available',
    bio: "With over 15 years of experience in men's grooming, James founded UpTown Barber with a vision to bring traditional barbering craftsmanship to the modern gentleman. Specializing in classic and contemporary cuts, James believes a great haircut should be both timeless and tailored to the individual.",
    specialties: ['Classic Cuts', 'Pompadours', 'Scissor Cuts', 'Hair Texture'],
    portfolio: [
      'assets/portfolio1.webp',
      'assets/portfolio2.webp',
      'assets/portfolio3.webp',
      'assets/portfolio4.webp'
    ]
  },
  // ... other barbers data
];
const services = [
  {
    id: 1,
    title: 'Signature Haircut',
    duration: '45 min',
    price: 'R350',
    rating: 4.9,
    reviews: 128,
    description: "Our signature haircut service includes a detailed consultation to understand your style preferences, a precision cut using professional techniques, a hot towel treatment to relax and prepare the hair, and finishing touches with premium styling products. This service is perfect for gentlemen looking for a sharp, polished look that lasts. Our barbers will work with your hair type and facial structure to create a cut that complements your features.",
    includes: [
      'Detailed consultation',
      'Precision haircut',
      'Hot towel treatment',
      'Styling with premium products',
      'Neck shave cleanup'
    ],
    images: [
      'assets/service-haircut.webp',
      'assets/service-haircut2.webp',
      'assets/service-haircut3.webp'
    ]
  },
  // ... other services data
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Remove preloader when page is loaded
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1500);

  // Initialize counters
  initCounters();

  // Initialize service filtering
  initServiceFilters();

  // Initialize gallery filtering
  initGalleryFilters();

  // Smooth scroll for anchor links
  initSmoothScroll();

  // Initialize lightbox gallery
  initLightbox();

  // Initialize mobile navigation
  initMobileNav();

  // Initialize theme toggle
  initThemeToggle();

  // Initialize booking widget
  initBookingWidget();

  // Initialize modals
  initModals();

  // Initialize forms
  initForms();

  // Initialize scroll indicator
  initScrollIndicator();

  // Initialize lazy loading
  initLazyLoading();
});

// Initialize Counters
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(initCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Initialize Service Filters
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('.service-filters .filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      const serviceCards = document.querySelectorAll('.service-card');

      serviceCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Initialize Gallery Filters
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      const galleryItems = document.querySelectorAll('.gallery-item');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Initialize Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.app-nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
          mobileMenuToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      }
    });
  });
}

// Initialize Lightbox
function initLightbox() {
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      currentGalleryIndex = index;
      updateLightboxContent();
      galleryLightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Navigation in lightbox
  prevLightbox.addEventListener('click', showPrevImage);
  nextLightbox.addEventListener('click', showNextImage);

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (galleryLightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox.click();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    }
  });
}

function showPrevImage() {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxContent();
}

function showNextImage() {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const currentItem = galleryImages[currentGalleryIndex];
  const imgSrc = currentItem.querySelector('img').getAttribute('src');
  const title = currentItem.querySelector('h4').textContent;
  const description = currentItem.querySelector('p').textContent;

  lightboxImage.setAttribute('src', imgSrc);
  lightboxImage.setAttribute('alt', title);
  lightboxTitle.textContent = title;
  lightboxDescription.textContent = description;
}

// Initialize Mobile Navigation
function initMobileNav() {
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Initialize Theme Toggle
function initThemeToggle() {
  // Check for saved user preference, if any
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleText(savedTheme);

  themeToggleBtn.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleText(newTheme);
  });
}

function updateThemeToggleText(theme) {
  const icon = themeToggleBtn.querySelector('i');
  const text = themeToggleBtn.querySelector('span');
  
  if (theme === 'dark') {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    text.textContent = 'Dark Mode';
  } else {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    text.textContent = 'Light Mode';
  }
}

// Initialize Booking Widget
function initBookingWidget() {
  // Open booking widget
  bookNowBtn.addEventListener('click', function() {
    bookingWidget.classList.add('active');
    document.body.style.overflow = 'hidden';
    showStep(1);
  });

  // Close booking widget
  closeWidget.addEventListener('click', function() {
    bookingWidget.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Navigation between steps
  prevStepBtn.addEventListener('click', function() {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  });

  nextStepBtn.addEventListener('click', function() {
    if (currentStep < 4) {
      showStep(currentStep + 1);
    }
  });

  // Service selection
  document.querySelectorAll('.service-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      currentServiceId = this.getAttribute('data-service');
    });
  });

  // Barber selection
  document.querySelectorAll('.barber-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.barber-option').forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      currentBarberId = this.getAttribute('data-barber');
    });
  });

  // Confirm booking
  confirmBookingBtn.addEventListener('click', function() {
    // Here you would typically send the booking data to your backend
    showToast('Appointment Booked!', 'Your booking is confirmed for Friday at 2:30 PM', 'success');
    
    // Close the widget after a delay
    setTimeout(() => {
      bookingWidget.classList.remove('active');
      document.body.style.overflow = '';
      resetBookingWidget();
    }, 2000);
  });
}

function showStep(step) {
  // Hide all steps
  bookingSteps.forEach(s => s.classList.remove('active'));
  stepIndicators.forEach(i => i.classList.remove('active'));

  // Show current step
  document.querySelector(`.booking-step[data-step-content="${step}"]`).classList.add('active');
  document.querySelector(`.step-indicator[data-step="${step}"]`).classList.add('active');

  // Update current step
  currentStep = step;

  // Update button visibility
  prevStepBtn.disabled = step === 1;
  nextStepBtn.style.display = step === 4 ? 'none' : 'block';
  confirmBookingBtn.style.display = step === 4 ? 'block' : 'none';
}

function resetBookingWidget() {
  showStep(1);
  document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('active'));
  document.querySelectorAll('.barber-option').forEach(opt => opt.classList.remove('active'));
  document.getElementById('client-name').value = '';
  document.getElementById('client-phone').value = '';
  document.getElementById('client-email').value = '';
  document.getElementById('client-notes').value = '';
  document.getElementById('terms-agree').checked = false;
  currentServiceId = null;
  currentBarberId = null;
}

// Initialize Modals
function initModals() {
  // Quick View Modal
  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const serviceId = this.getAttribute('data-service');
      openServiceModal(serviceId);
    });
  });

  // Barber Profile Modal
  viewBarberBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const barberId = this.getAttribute('data-barber');
      openBarberModal(barberId);
    });
  });

  // Gift Card Modal
  giftCardBtn.addEventListener('click', function() {
    giftCardModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close modals
  const closeModalButtons = document.querySelectorAll('.close-modal');
  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal-overlay').classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close modals when clicking outside content
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close lightbox
  closeLightbox.addEventListener('click', function() {
    galleryLightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close toast
  closeToast.addEventListener('click', function() {
    toast.classList.remove('active');
  });

  // Keyboard navigation for modals
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
      
      if (galleryLightbox.classList.contains('active')) {
        galleryLightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      if (bookingWidget.classList.contains('active')) {
        bookingWidget.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}

function openServiceModal(serviceId) {
  const service = services.find(s => s.id == serviceId);
  if (!service) return;

  // Update modal content
  document.getElementById('service-modal-title').textContent = service.title;
  document.getElementById('service-main-image').setAttribute('src', service.images[0]);
  document.getElementById('service-main-image').setAttribute('alt', service.title);
  
  const metaElement = quickViewModal.querySelector('.service-meta');
  metaElement.innerHTML = `
    <span><i class="fas fa-clock"></i> ${service.duration}</span>
    <span><i class="fas fa-rand-sign"></i> ${service.price}</span>
    <span><i class="fas fa-star"></i> ${service.rating} (${service.reviews})</span>
  `;
  
  document.querySelector('.service-description').innerHTML = `
    <p>${service.description.split('\n')[0]}</p>
    <p>${service.description.split('\n')[1]}</p>
  `;
  
  const includesList = document.querySelector('.service-includes ul');
  includesList.innerHTML = '';
  service.includes.forEach(item => {
    includesList.innerHTML += `
      <li><i class="fas fa-check"></i> ${item}</li>
    `;
  });

  // Update thumbnails
  const thumbnailGallery = document.querySelector('.thumbnail-gallery');
  thumbnailGallery.innerHTML = '';
  service.images.forEach((img, index) => {
    thumbnailGallery.innerHTML += `
      <img src="${img}" alt="${service.title} thumbnail ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}">
    `;
  });

  // Add click event for thumbnails
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
      document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.getElementById('service-main-image').setAttribute('src', this.getAttribute('src'));
    });
  });

  // Open modal
  quickViewModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openBarberModal(barberId) {
  const barber = barbers.find(b => b.id == barberId);
  if (!barber) return;

  // Update modal content
  document.getElementById('barber-modal-name').textContent = barber.name;
  document.getElementById('barber-modal-title').textContent = barber.title;
  document.getElementById('barber-modal-rating').textContent = `${barber.rating} (${barber.reviews} reviews)`;
  document.getElementById('barber-modal-status').textContent = barber.status === 'available' ? 'Available Today' : 'Booked Today';
  document.getElementById('barber-modal-status').className = `barber-status ${barber.status}`;
  document.getElementById('barber-modal-bio').textContent = barber.bio;
  document.getElementById('barber-modal-image').setAttribute('src', `assets/barber${barber.id}.webp`);
  document.getElementById('barber-modal-image').setAttribute('alt', barber.name);

  // Update specialties
  const specialtiesContainer = document.querySelector('.specialty-tags');
  specialtiesContainer.innerHTML = '';
  barber.specialties.forEach(specialty => {
    specialtiesContainer.innerHTML += `<span class="tag">${specialty}</span>`;
  });

  // Update portfolio
  const portfolioGrid = document.querySelector('.portfolio-grid');
  portfolioGrid.innerHTML = '';
  barber.portfolio.forEach((img, index) => {
    portfolioGrid.innerHTML += `
      <img src="${img}" alt="${barber.name}'s work example ${index + 1}" loading="lazy">
    `;
  });

  // Update book button
  document.querySelector('.book-barber-btn').innerHTML = `
    Book with ${barber.name.split(' ')[0]} <i class="fas fa-arrow-right"></i>
  `;

  // Open modal
  barberModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Initialize Forms
function initForms() {
  // Newsletter form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      // Here you would typically send the email to your backend
      showToast('Subscribed!', 'Thank you for subscribing to our newsletter', 'success');
      this.reset();
    });
  }

  // Review form (would be similar to newsletter form)
}

// Show Toast Notification
function showToast(title, message, type) {
  const toastContent = toast.querySelector('.toast-content');
  
  // Update icon based on type
  const icon = toastContent.querySelector('.toast-icon');
  icon.className = `toast-icon ${type}`;
  
  // Update content
  toast.querySelector('h5').textContent = title;
  toast.querySelector('p').textContent = message;
  
  // Show toast
  toast.classList.add('active');
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    toast.classList.remove('active');
  }, 5000);
}

// Initialize Scroll Indicator
function initScrollIndicator() {
  if (scrollIndicator) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.visibility = 'visible';
      }
    });
  }
}

// Initialize Lazy Loading
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('loading');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// Load More Services
if (loadMoreServicesBtn) {
  loadMoreServicesBtn.addEventListener('click', function() {
    // Here you would typically load more services from your backend
    // For demo purposes, we'll just show a toast
    showToast('Services Loaded', 'All services are now displayed', 'info');
    this.style.display = 'none';
  });
}

// View All Barbers
if (viewAllBarbersBtn) {
  viewAllBarbersBtn.addEventListener('click', function() {
    // Here you would typically load all barbers or navigate to a barbers page
    showToast('Barbers Loaded', 'All barbers are now displayed', 'info');
  });
}

// View Full Gallery
if (viewFullGalleryBtn) {
  viewFullGalleryBtn.addEventListener('click', function() {
    // Here you would typically load all gallery items or navigate to a gallery page
    showToast('Gallery Loaded', 'The full gallery is now displayed', 'info');
  });
}

// Leave Review
if (leaveReviewBtn) {
  leaveReviewBtn.addEventListener('click', function() {
    // Here you would typically open a review modal or navigate to a review page
    showToast('Leave a Review', 'Please share your experience with us', 'info');
  });
}
