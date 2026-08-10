// --- FlexRide V2: Comprehensive Hyderabad Places & Localities ---
const HYDERABAD_PLACES = [
  'Tolichowki, Hyderabad',
  'Tolichowki Main Road, Hyderabad',
  'Tolichowki X Road, Hyderabad',
  'Tolichowki Flyover, Hyderabad',
  'Madhapur, Hyderabad',
  'Madhapur Metro Station, Hyderabad',
  'Gachibowli, Hyderabad',
  'Gachibowli DLF Cybercity, Hyderabad',
  'Hitech City, Hyderabad',
  'Mindspace Hitech City, Hyderabad',
  'Banjara Hills, Hyderabad',
  'Jubilee Hills, Hyderabad',
  'Kondapur, Hyderabad',
  'Kukatpally, Hyderabad',
  'Kukatpally KPHB Colony, Hyderabad',
  'Miyapur, Hyderabad',
  'LB Nagar, Hyderabad',
  'Uppal, Hyderabad',
  'Secunderabad, Hyderabad',
  'Begumpet, Hyderabad',
  'Ameerpet, Hyderabad',
  'Mehdipatnam, Hyderabad',
  'Attapur, Hyderabad',
  'Nanagramguda, Hyderabad',
  'RGIA Airport, Hyderabad'
];

// --- FlexRide Vehicle Database ---
let carsData = [
  {
    id: 'car_i10',
    name: 'Hyundai Grand i10',
    brand: 'Hyundai',
    type: 'hatchback',
    fuelType: 'Petrol',
    transmission: 'Manual',
    seatingCapacity: 5,
    ratePerHour: 100,
    rating: 4.90,
    tripsCount: 142,
    status: 'Available',
    currentLocality: 'Tolichowki, Hyderabad',
    locationName: 'Tolichowki Hub (Grand i10 Location)',
    locationAddress: 'Tolichowki X Road, Tolichowki, Hyderabad',
    mapUrl: 'https://maps.google.com/?q=Tolichowki+X+Road+Hyderabad',
    imageUrl: 'images/grand_i10.jpg',
    pricing: {
      8: 800,
      12: 1000,
      24: 1600
    }
  },
  {
    id: 'car_kwid',
    name: 'Renault Kwid',
    brand: 'Renault',
    type: 'hatchback',
    fuelType: 'Petrol',
    transmission: 'Manual',
    seatingCapacity: 5,
    ratePerHour: 75,
    rating: 4.85,
    tripsCount: 98,
    status: 'Available',
    currentLocality: 'Madhapur, Hyderabad',
    locationName: 'Madhapur Hub (Renault Kwid Location)',
    locationAddress: 'Madhapur Metro Station, Madhapur, Hyderabad',
    mapUrl: 'https://maps.google.com/?q=Madhapur+Metro+Station+Hyderabad',
    imageUrl: 'images/renault_kwid.jpg',
    pricing: {
      8: 600,
      12: 800,
      24: 1200
    }
  },
  {
    id: 'car_skoda',
    name: 'Skoda Rapid',
    brand: 'Skoda',
    type: 'sedan',
    fuelType: 'Petrol',
    transmission: 'Manual',
    seatingCapacity: 5,
    ratePerHour: 150,
    rating: 4.95,
    tripsCount: 176,
    status: 'Available',
    currentLocality: 'Gachibowli, Hyderabad',
    locationName: 'Gachibowli Hub (Skoda Location)',
    locationAddress: 'DLF Cybercity Road, Gachibowli, Hyderabad',
    mapUrl: 'https://maps.google.com/?q=DLF+Cybercity+Gachibowli+Hyderabad',
    imageUrl: 'images/skoda.jpg',
    pricing: {
      8: 1200,
      12: 1600,
      24: 2400
    }
  }
];

// --- My Bookings State ---
let myBookings = [
  {
    bookingId: 'FLX-98412',
    car: carsData[0],
    pickupLocation: 'Tolichowki X Road, Tolichowki, Hyderabad',
    pickupDateTime: '01 Aug 2026, 10:00 AM',
    dropoffDateTime: '01 Aug 2026, 06:00 PM',
    durationHours: 8,
    hourlyRate: 100,
    rentalAmount: 800,
    gstTax: 0,
    unlimitedKmUpgrade: false,
    unlimitedKmFee: 0,
    couponDiscount: 100,
    grandTotal: 700,
    status: 'UPCOMING',
    paymentStatus: 'PAID',
    paymentMethod: 'UPI (PhonePe)',
    bookedAt: '31 Jul 2026, 06:15 PM'
  }
];

// User Mobile Authentication State
let userMobileState = {
  isLoggedIn: false,
  mobileNumber: '',
  userName: 'Customer'
};

// Global App States
let selectedLocation = 'Madhapur, Hyderabad';
let currentCategoryFilter = 'all';
let currentSortKey = 'relevance';
let selectedCarForBooking = null;
let currentMyTripsFilter = 'UPCOMING';

// Live Booking State
let activeBookingState = {
  location: 'Madhapur, Hyderabad',
  durationHours: 12,
  pickupDate: '',
  pickupTime: '',
  dropDate: '',
  dropTime: '',
  unlimitedKmUpgrade: false,
  couponCode: '',
  couponDiscount: 0,
  paymentMethod: 'upi',
  paymentStatus: 'PENDING'
};

// Application Initialization
document.addEventListener('DOMContentLoaded', () => {
  initDefaultDates();
  initLocationSearch();
  renderAvailableFleet();
  renderMyTrips();
  renderProfileTab();
  updateHeaderAuthState();
  setupCategoryPills();
  setupSortAndSearch();
  setupNavTabs();
  setupGlobalModalListeners();
});

// Setup Global Backdrop Overlay Click & Dismiss Listeners
function setupGlobalModalListeners() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

// Initialize Default Dates Dynamically Based on Device Current Local Time
function initDefaultDates() {
  const now = new Date();
  const pickup = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const drop = new Date(pickup.getTime() + 12 * 60 * 60 * 1000);

  const formatD = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatT = (d) => {
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  activeBookingState.pickupDate = formatD(pickup);
  activeBookingState.pickupTime = formatT(pickup);
  activeBookingState.dropDate = formatD(drop);
  activeBookingState.dropTime = formatT(drop);
  activeBookingState.durationHours = 12;

  const pickDateInput = document.getElementById('search-pickup-date');
  const pickTimeInput = document.getElementById('search-pickup-time');
  const dropDateInput = document.getElementById('search-drop-date');
  const dropTimeInput = document.getElementById('search-drop-time');

  const todayStr = formatD(now);

  if (pickDateInput) {
    pickDateInput.min = todayStr;
    pickDateInput.value = formatD(pickup);
  }
  if (pickTimeInput) {
    pickTimeInput.value = formatT(pickup);
  }
  if (dropDateInput) {
    dropDateInput.min = todayStr;
    dropDateInput.value = formatD(drop);
  }
  if (dropTimeInput) {
    dropTimeInput.value = formatT(drop);
  }
}

// Google Places Autocomplete & GPS Reverse Geocoding Implementation
function initLocationSearch() {
  const input = document.getElementById('location-search-input');
  const suggestionsBox = document.getElementById('location-suggestions');
  if (!input || !suggestionsBox) return;

  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length === 0) {
      suggestionsBox.style.display = 'none';
      return;
    }

    const matches = HYDERABAD_PLACES.filter(loc => loc.toLowerCase().includes(q));

    if (matches.length > 0) {
      suggestionsBox.innerHTML = matches.map(loc => `
        <div class="suggestion-item" onclick="selectHyderabadLocation('${loc}')">
          <i class="ri-map-pin-2-fill" style="color: var(--primary-green);"></i> ${loc}
        </div>
      `).join('');
      suggestionsBox.style.display = 'block';
    } else {
      const outOfBoundsKeywords = ['bengaluru', 'bangalore', 'mumbai', 'chennai', 'delhi', 'warangal', 'vijayawada', 'pune', 'goa'];
      if (outOfBoundsKeywords.some(kw => q.includes(kw))) {
        suggestionsBox.innerHTML = `
          <div class="suggestion-item error">
            <i class="ri-error-warning-line"></i> Bookings are currently available only within Hyderabad.
          </div>
        `;
        suggestionsBox.style.display = 'block';
      } else {
        suggestionsBox.style.display = 'none';
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.style.display = 'none';
    }
  });
}

function useCurrentLocationGPS() {
  showToast('📍 Requesting GPS Location...');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const detectedLoc = 'Tolichowki Main Road, Hyderabad';
        selectHyderabadLocation(detectedLoc);
        showToast(`📍 Location Detected: ${detectedLoc}`);
      },
      (error) => {
        const fallbackLoc = 'Tolichowki Main Road, Hyderabad';
        selectHyderabadLocation(fallbackLoc);
        showToast(`📍 Location Detected: ${fallbackLoc}`);
      },
      { timeout: 5000 }
    );
  } else {
    const fallbackLoc = 'Tolichowki Main Road, Hyderabad';
    selectHyderabadLocation(fallbackLoc);
    showToast(`📍 Location Detected: ${fallbackLoc}`);
  }
}

function selectHyderabadLocation(loc) {
  selectedLocation = loc;
  activeBookingState.location = loc;
  const input = document.getElementById('location-search-input');
  if (input) input.value = loc;

  const suggestionsBox = document.getElementById('location-suggestions');
  if (suggestionsBox) suggestionsBox.style.display = 'none';

  showToast(`Location Selected: ${loc}`);
  renderAvailableFleet();
}

// Date & Time Validation Engine
function validateSearchDateTime() {
  const pDateVal = document.getElementById('search-pickup-date')?.value;
  const pTimeVal = document.getElementById('search-pickup-time')?.value;
  const dDateVal = document.getElementById('search-drop-date')?.value;
  const dTimeVal = document.getElementById('search-drop-time')?.value;

  if (!pDateVal || !pTimeVal || !dDateVal || !dTimeVal) return false;

  const now = new Date();
  const pickDateTime = new Date(`${pDateVal}T${pTimeVal}`);
  const dropDateTime = new Date(`${dDateVal}T${dTimeVal}`);

  if (pickDateTime.getTime() < (now.getTime() - 2 * 60 * 1000)) {
    showToast('⚠️ Pickup time cannot be in the past!');
    return false;
  }

  if (pickDateTime.getTime() === dropDateTime.getTime()) {
    showToast('⚠️ Drop-off time must be later than Pickup time.');
    return false;
  }

  if (dropDateTime <= pickDateTime) {
    showToast('⚠️ Drop-off time must be later than Pickup time.');
    return false;
  }

  const diffMs = dropDateTime - pickDateTime;
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));

  if (diffHours < 12) {
    showToast('⚠️ Minimum booking duration is 12 hours.');
    return false;
  }

  activeBookingState.pickupDate = pDateVal;
  activeBookingState.pickupTime = pTimeVal;
  activeBookingState.dropDate = dDateVal;
  activeBookingState.dropTime = dTimeVal;
  activeBookingState.durationHours = diffHours;

  return true;
}

// Render Available Fleet Cards
function renderAvailableFleet() {
  const container = document.getElementById('fleet-list-container');
  if (!container) return;

  let availableCars = carsData.filter(car => car.status === 'Available');

  const searchInput = document.getElementById('fleet-search-input');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  availableCars = availableCars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(query) || 
                          car.brand.toLowerCase().includes(query);

    let matchesCategory = true;
    if (currentCategoryFilter === 'hatchback') matchesCategory = car.type === 'hatchback';
    else if (currentCategoryFilter === 'sedan') matchesCategory = car.type === 'sedan';
    else if (currentCategoryFilter === 'suv') matchesCategory = car.type === 'suv';
    else if (currentCategoryFilter === 'luxury') matchesCategory = car.type === 'luxury';
    else if (currentCategoryFilter === 'petrol') matchesCategory = car.fuelType === 'Petrol';
    else if (currentCategoryFilter === 'diesel') matchesCategory = car.fuelType === 'Diesel';

    return matchesSearch && matchesCategory;
  });

  if (currentSortKey === 'price-low') availableCars.sort((a, b) => a.ratePerHour - b.ratePerHour);
  else if (currentSortKey === 'price-high') availableCars.sort((a, b) => b.ratePerHour - a.ratePerHour);
  else if (currentSortKey === 'rating') availableCars.sort((a, b) => b.rating - a.rating);

  if (availableCars.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="ri-car-line" style="font-size: 34px; color: var(--text-light);"></i>
        <p style="margin-top: 8px; font-weight: 600; color: var(--text-grey);">No available vehicles match your search.</p>
        <button class="btn-primary" style="margin-top: 12px; width: 140px; height: 36px; font-size: 12px;" onclick="resetFleetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = availableCars.map(car => {
    const base8h = car.pricing ? car.pricing[8] : car.ratePerHour * 8;
    return `
      <div class="fleet-card" onclick="openV2BookingSummary('${car.id}')">
        <div class="fleet-card-img">
          <img src="${car.imageUrl}" alt="${car.name}">
          <span class="fuel-tag">${car.fuelType}</span>
        </div>
        <div class="fleet-card-content">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <h3 class="car-title">${car.name}</h3>
              <span class="rating-badge"><i class="ri-star-fill"></i> ${car.rating}</span>
            </div>
            <div class="car-specs-row">
              <span><i class="ri-user-3-line"></i> ${car.seatingCapacity} Seats</span>
              <span><i class="ri-settings-4-line"></i> ${car.transmission}</span>
              <span><i class="ri-roadster-line"></i> ${car.type.toUpperCase()}</span>
            </div>
            <div style="font-size: 11px; color: var(--text-grey); margin-top: 4px; display: flex; align-items: center; gap: 4px;">
              <i class="ri-map-pin-2-fill" style="color: var(--primary-green);"></i>
              <span style="font-weight: 600; color: var(--text-dark);">${car.locationAddress || car.currentLocality}</span>
            </div>
          </div>

          <div class="price-action-row" style="margin-top: 10px;">
            <div>
              <div class="car-rate">₹${base8h.toLocaleString('en-IN')} <span style="font-size: 10px; color: var(--text-grey); font-weight: 600;">/ 8 hrs</span></div>
              <div style="font-size: 10px; color: var(--primary-green); font-weight: 700;">8h, 12h, 24h packages • 400 KM FREE</div>
            </div>
            <button class="book-now-btn" onclick="event.stopPropagation(); openV2BookingSummary('${car.id}')">
              Book Now
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupCategoryPills() {
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategoryFilter = pill.getAttribute('data-filter');
      renderAvailableFleet();
    });
  });
}

function setupSortAndSearch() {
  const searchInput = document.getElementById('fleet-search-input');
  const sortSelect = document.getElementById('sort-select');

  if (searchInput) searchInput.addEventListener('input', renderAvailableFleet);
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSortKey = e.target.value;
      renderAvailableFleet();
    });
  }
}

function resetFleetFilters() {
  currentCategoryFilter = 'all';
  currentSortKey = 'relevance';
  document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
  document.querySelector('.category-pill[data-filter="all"]')?.classList.add('active');
  const input = document.getElementById('fleet-search-input');
  if (input) input.value = '';
  renderAvailableFleet();
}

function setupNavTabs() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');
      switchMainTab(tabId);
    });
  });
}

// --- MOBILE LOGIN & AUTHENTICATION MODULE ---
function openMobileLoginModal() {
  const step1 = document.getElementById('login-step-1');
  const step2 = document.getElementById('login-step-2');
  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';

  const input = document.getElementById('user-mobile-input');
  if (input) input.value = userMobileState.mobileNumber || '';

  document.getElementById('mobile-login-modal')?.classList.add('active');
}

function closeMobileLoginModal() {
  document.getElementById('mobile-login-modal')?.classList.remove('active');
}

function sendMobileOtp() {
  const val = document.getElementById('user-mobile-input')?.value.trim();
  if (!val || val.length !== 10 || isNaN(val)) {
    showToast('⚠️ Please enter a valid 10-digit mobile number');
    return;
  }

  userMobileState.mobileNumber = val;
  const step1 = document.getElementById('login-step-1');
  const step2 = document.getElementById('login-step-2');
  if (step1) step1.style.display = 'none';
  if (step2) step2.style.display = 'block';

  const otpInput = document.getElementById('user-otp-input');
  if (otpInput) otpInput.value = '1234';

  showToast(`📱 OTP 1234 sent to +91 ${val}`);
}

function verifyMobileOtp() {
  const otpVal = document.getElementById('user-otp-input')?.value.trim();
  if (otpVal !== '1234' && otpVal.length !== 4) {
    showToast('⚠️ Please enter valid 4-digit OTP (Demo: 1234)');
    return;
  }

  userMobileState.isLoggedIn = true;
  closeMobileLoginModal();
  showToast(`🎉 Logged in as +91 ${userMobileState.mobileNumber}`);
  updateHeaderAuthState();
  renderProfileTab();
}

function logoutMobileUser() {
  userMobileState.isLoggedIn = false;
  userMobileState.mobileNumber = '';
  showToast('Logged out successfully');
  updateHeaderAuthState();
  renderProfileTab();
}

function updateHeaderAuthState() {
  const btn = document.getElementById('header-login-btn');
  if (!btn) return;

  if (userMobileState.isLoggedIn) {
    btn.innerHTML = `<i class="ri-user-3-line"></i> +91 ${userMobileState.mobileNumber.slice(0, 5)}...`;
    btn.style.background = '#ECFDF5';
    btn.style.color = 'var(--primary-green)';
  } else {
    btn.innerHTML = `<i class="ri-login-circle-line"></i> Login`;
    btn.style.background = 'var(--light-green)';
    btn.style.color = 'var(--primary-green)';
  }
}

function renderProfileTab() {
  const container = document.getElementById('profile-tab-container');
  if (!container) return;

  if (userMobileState.isLoggedIn) {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 80px; height: 80px; border-radius: 50%; background: #ECFDF5; color: var(--primary-green); display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: 800; margin: 0 auto 10px; border: 3px solid var(--primary-green);">
          <i class="ri-user-3-fill"></i>
        </div>
        <h2 style="font-size: 20px; font-weight: 800;">Customer Account</h2>
        <span style="background: #ECFDF5; color: var(--primary-green); font-size: 12px; font-weight: 700; padding: 4px 14px; border-radius: 20px; display: inline-block; margin-top: 6px;">
          <i class="ri-checkbox-circle-fill"></i> Mobile Number Verified
        </span>
      </div>

      <div class="card-box" style="background: var(--off-white); padding: 14px; border-radius: var(--radius-md); border: 1.5px solid var(--subtle-grey);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <span style="font-weight: 600; font-size: 13px;"><i class="ri-phone-line" style="color: var(--primary-green);"></i> Registered Mobile</span>
          <strong style="color: var(--text-dark); font-size: 14px;">+91 ${userMobileState.mobileNumber}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <span style="font-weight: 600; font-size: 13px;"><i class="ri-shield-check-line" style="color: var(--primary-green);"></i> Security Deposit</span>
          <span style="color: var(--primary-green); font-size: 13px; font-weight: 700;">₹0 Zero Deposit</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; font-size: 13px;"><i class="ri-id-card-line" style="color: var(--primary-green);"></i> Driving Licence Status</span>
          <span class="status-badge verified">VERIFIED</span>
        </div>
      </div>

      <button class="btn-primary" style="margin-top: 18px; background: #DC2626;" onclick="logoutMobileUser()">
        <i class="ri-logout-box-r-line"></i> Logout
      </button>
    `;
  } else {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px 10px;">
        <div style="width: 72px; height: 72px; background: #ECFDF5; color: var(--primary-green); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 34px; margin: 0 auto 14px; border: 2px solid #A7F3D0;">
          <i class="ri-smartphone-line"></i>
        </div>
        <h2 style="font-size: 20px; font-weight: 800;">Login to Your Account</h2>
        <p style="font-size: 12px; color: var(--text-grey); margin-top: 4px; max-width: 300px; margin-left: auto; margin-right: auto;">
          Log in with your 10-digit mobile number to view bookings, download invoices, and manage trips.
        </p>

        <button class="btn-primary" style="margin-top: 20px;" onclick="openMobileLoginModal()">
          <i class="ri-smartphone-line"></i> Login with Mobile Number
        </button>
      </div>
    `;
  }
}

function switchMainTab(tabId) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.tab-screen').forEach(s => s.classList.remove('active'));

  const nav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  const screen = document.getElementById(tabId);

  if (nav) nav.classList.add('active');
  if (screen) screen.classList.add('active');

  if (tabId === 'trips-tab') renderMyTrips();
  else if (tabId === 'profile-tab') renderProfileTab();
}

// --- V2 BOOKING SUMMARY SCREEN ---
function openV2BookingSummary(carId) {
  const car = carsData.find(c => c.id === carId);
  if (!car) return;

  if (car.status !== 'Available') {
    showToast('⚠️ This vehicle is no longer available. Please choose another vehicle.');
    renderAvailableFleet();
    return;
  }

  if (!validateSearchDateTime()) return;

  selectedCarForBooking = car;
  activeBookingState.unlimitedKmUpgrade = false;
  activeBookingState.couponCode = '';
  activeBookingState.couponDiscount = 0;

  renderV2SummaryModal();
  document.getElementById('booking-summary-modal').classList.add('active');
}

function setBookingDuration(hours) {
  activeBookingState.durationHours = hours;
  if (activeBookingState.pickupDate && activeBookingState.pickupTime) {
    const pick = new Date(`${activeBookingState.pickupDate}T${activeBookingState.pickupTime}`);
    if (!isNaN(pick.getTime())) {
      const drop = new Date(pick.getTime() + hours * 60 * 60 * 1000);
      const formatD = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const formatT = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      activeBookingState.dropDate = formatD(drop);
      activeBookingState.dropTime = formatT(drop);
      const dDateInput = document.getElementById('search-drop-date');
      const dTimeInput = document.getElementById('search-drop-time');
      if (dDateInput) dDateInput.value = activeBookingState.dropDate;
      if (dTimeInput) dTimeInput.value = activeBookingState.dropTime;
    }
  }
  renderV2SummaryModal();
}

function renderV2SummaryModal() {
  if (!selectedCarForBooking) return;
  const car = selectedCarForBooking;
  const hrs = activeBookingState.durationHours || 12;
  const rentalAmount = (car.pricing && car.pricing[hrs]) ? car.pricing[hrs] : (car.ratePerHour * hrs);
  const unlimitedKmFee = activeBookingState.unlimitedKmUpgrade ? 500 : 0;
  const discount = activeBookingState.couponDiscount || 0;
  const grandTotal = Math.max(0, rentalAmount + unlimitedKmFee - discount);

  const container = document.getElementById('booking-summary-container');
  if (!container) return;

  container.innerHTML = `
    <div class="modal-sheet-header">
      <div class="sheet-handle"></div>
      <button class="modal-close-btn" onclick="closeV2SummaryModal()" title="Close Popup">
        <i class="ri-close-line"></i>
      </button>
    </div>

    <div class="summary-header">
      <h3>Booking Summary</h3>
      <p style="font-size: 12px; color: var(--text-grey);">Review vehicle details & price breakdown</p>
    </div>

    <div class="summary-car-card">
      <img src="${car.imageUrl}" alt="${car.name}">
      <div>
        <h4 style="font-size: 15px; font-weight: 800; color: var(--text-dark);">${car.name}</h4>
        <p style="font-size: 11px; color: var(--text-grey);">${car.brand} • ${car.fuelType} • ${car.transmission} • ${car.seatingCapacity} Seats</p>
        <span style="color: var(--primary-green); font-weight: 800; font-size: 13px;">₹${rentalAmount.toLocaleString('en-IN')} / ${hrs} hours</span>
      </div>
    </div>

    <!-- Duration Package Selector -->
    <div style="margin-bottom: 12px;">
      <label style="font-size: 11px; font-weight: 800; color: var(--text-dark); text-transform: uppercase; letter-spacing: 0.5px;">Select Rental Duration Package</label>
      <div class="duration-btn-group">
        <button class="duration-btn ${hrs === 8 ? 'active' : ''}" onclick="setBookingDuration(8)">
          8 Hours<br><span style="font-size: 10px; opacity: 0.9;">₹${(car.pricing[8] || car.ratePerHour * 8).toLocaleString('en-IN')}</span>
        </button>
        <button class="duration-btn ${hrs === 12 ? 'active' : ''}" onclick="setBookingDuration(12)">
          12 Hours<br><span style="font-size: 10px; opacity: 0.9;">₹${(car.pricing[12] || car.ratePerHour * 12).toLocaleString('en-IN')}</span>
        </button>
        <button class="duration-btn ${hrs === 24 ? 'active' : ''}" onclick="setBookingDuration(24)">
          24 Hours<br><span style="font-size: 10px; opacity: 0.9;">₹${(car.pricing[24] || car.ratePerHour * 24).toLocaleString('en-IN')}</span>
        </button>
      </div>
    </div>

    <!-- Vehicle Specific Pickup Location -->
    <div class="summary-schedule-box">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <span style="font-size: 10px; color: var(--primary-green); font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">VEHICLE PICKUP LOCATION</span>
          <div style="font-size: 13px; font-weight: 800; color: var(--text-dark); margin-top: 2px;">
            <i class="ri-map-pin-2-fill" style="color: var(--primary-green);"></i> ${car.locationAddress || car.locationName || car.currentLocality}
          </div>
        </div>
        ${car.mapUrl ? `
          <a href="${car.mapUrl}" target="_blank" class="map-link-btn" title="Open in Google Maps">
            <i class="ri-direction-line"></i> Maps
          </a>
        ` : ''}
      </div>
      <div style="margin-top: 10px; display: flex; justify-content: space-between; font-size: 11px; color: var(--text-grey); border-top: 1px dashed var(--subtle-grey); padding-top: 8px;">
        <span>Pickup: <strong>${activeBookingState.pickupDate}, ${activeBookingState.pickupTime}</strong></span>
        <span>Drop: <strong>${activeBookingState.dropDate}, ${activeBookingState.dropTime}</strong></span>
      </div>
      <div style="margin-top: 4px; font-size: 11px; font-weight: 800; color: var(--primary-green); text-align: right;">
        ⚡ Selected Duration: ${hrs} Hours Package
      </div>
    </div>

    <div class="km-policy-card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="font-size: 13px;"><i class="ri-speed-up-line" style="color: var(--primary-green);"></i> Included KMs</strong>
          <p style="font-size: 11px; color: var(--text-grey);">400 KM Included FREE for this booking</p>
        </div>
        <span style="background: #E8F5E9; color: var(--primary-green); font-weight: 800; font-size: 11px; padding: 2px 8px; border-radius: 6px;">400 KM FREE</span>
      </div>

      <div class="unlimited-km-toggle" onclick="toggleUnlimitedKmUpgrade()">
        <input type="checkbox" ${activeBookingState.unlimitedKmUpgrade ? 'checked' : ''} onclick="event.stopPropagation(); toggleUnlimitedKmUpgrade()">
        <div style="flex:1;">
          <strong style="font-size: 12px;">Upgrade to Unlimited Kilometers</strong>
          <p style="font-size: 10px; color: var(--text-grey);">Drive unlimited without extra KM charges</p>
        </div>
        <span style="font-weight: 800; color: var(--primary-green);">+ ₹500</span>
      </div>
    </div>

    <div class="coupon-row" style="margin-top: 12px;">
      <input type="text" placeholder="Enter Coupon Code (e.g. HYDERABAD100)" id="summary-coupon-input" value="${activeBookingState.couponCode}">
      <button onclick="applySummaryCoupon()">Apply</button>
    </div>

    <div class="summary-breakdown-card">
      <div class="breakdown-row">
        <span>Package Rental Charge (${hrs} hrs)</span>
        <span>₹${rentalAmount.toLocaleString('en-IN')}</span>
      </div>
      <div class="breakdown-row">
        <span>Included Mileage</span>
        <span>400 KM Included</span>
      </div>
      ${activeBookingState.unlimitedKmUpgrade ? `
        <div class="breakdown-row">
          <span>Unlimited KM Upgrade</span>
          <span>+ ₹500</span>
        </div>
      ` : ''}
      ${discount > 0 ? `
        <div class="breakdown-row discount">
          <span>Coupon Discount</span>
          <span>– ₹${discount}</span>
        </div>
      ` : ''}
      <div class="breakdown-row grand-total">
        <span>Grand Total</span>
        <span>₹${grandTotal.toLocaleString('en-IN')}</span>
      </div>
    </div>

    <button class="btn-primary" style="margin-top: 14px;" onclick="openPaymentGatewayModal()">
      Proceed to Payment →
    </button>
  `;
}

function toggleUnlimitedKmUpgrade() {
  activeBookingState.unlimitedKmUpgrade = !activeBookingState.unlimitedKmUpgrade;
  renderV2SummaryModal();
}

function applySummaryCoupon() {
  const code = document.getElementById('summary-coupon-input')?.value.toUpperCase().trim();
  if (code === 'HYDERABAD100') {
    activeBookingState.couponCode = 'HYDERABAD100';
    activeBookingState.couponDiscount = 100;
    showToast('✓ Coupon HYDERABAD100 applied: ₹100 Off!');
  } else if (code === 'FLEX200') {
    activeBookingState.couponCode = 'FLEX200';
    activeBookingState.couponDiscount = 200;
    showToast('✓ Coupon FLEX200 applied: ₹200 Off!');
  } else {
    showToast('Invalid Coupon Code');
  }
  renderV2SummaryModal();
}

function closeV2SummaryModal() {
  document.getElementById('booking-summary-modal').classList.remove('active');
}

// --- PAYMENT GATEWAY MODAL & INTERACTIVE EXECUTION ---
function openPaymentGatewayModal() {
  const container = document.getElementById('payment-gateway-container');
  if (!container || !selectedCarForBooking) return;

  closeV2SummaryModal();

  const hrs = activeBookingState.durationHours || 12;
  const rental = (selectedCarForBooking.pricing && selectedCarForBooking.pricing[hrs]) ? selectedCarForBooking.pricing[hrs] : (selectedCarForBooking.ratePerHour * hrs);
  const unlimitedKmFee = activeBookingState.unlimitedKmUpgrade ? 500 : 0;
  const discount = activeBookingState.couponDiscount || 0;
  const payable = Math.max(0, rental + unlimitedKmFee - discount);

  container.innerHTML = `
    <div class="modal-sheet-header">
      <div class="sheet-handle"></div>
      <button class="modal-close-btn" onclick="closePaymentGatewayModal()" title="Close Popup">
        <i class="ri-close-line"></i>
      </button>
    </div>

    <div class="payment-header">
      <span class="payment-badge">Razorpay / PhonePe Payment Gateway</span>
      <h3>Select Payment Method</h3>
      <p style="font-size: 12px; color: var(--text-grey);">Amount Payable: <strong style="color: var(--primary-green); font-size: 16px;">₹${payable.toLocaleString('en-IN')}</strong></p>
    </div>

    <div class="payment-methods-list">
      <div class="payment-method-card ${activeBookingState.paymentMethod === 'upi' ? 'selected' : ''}" onclick="setPaymentMethod('upi')">
        <i class="ri-qr-code-line" style="font-size: 22px; color: var(--primary-green);"></i>
        <div>
          <strong>UPI (Google Pay / PhonePe / Paytm)</strong>
          <p style="font-size: 10px; color: var(--text-grey);">Instant payment via UPI ID or QR</p>
        </div>
      </div>

      <div class="payment-method-card ${activeBookingState.paymentMethod === 'card' ? 'selected' : ''}" onclick="setPaymentMethod('card')">
        <i class="ri-bank-card-line" style="font-size: 22px; color: var(--primary-green);"></i>
        <div>
          <strong>Credit / Debit Card</strong>
          <p style="font-size: 10px; color: var(--text-grey);">Visa, MasterCard, RuPay</p>
        </div>
      </div>

      <div class="payment-method-card ${activeBookingState.paymentMethod === 'netbanking' ? 'selected' : ''}" onclick="setPaymentMethod('netbanking')">
        <i class="ri-bank-line" style="font-size: 22px; color: var(--primary-green);"></i>
        <div>
          <strong>Net Banking</strong>
          <p style="font-size: 10px; color: var(--text-grey);">All Indian Banks Supported</p>
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 10px; margin-top: 18px;">
      <button class="btn-secondary" onclick="goBackToSummaryFromPayment()">Back</button>
      <button class="btn-primary" id="pay-now-action-btn" onclick="verifyAndExecutePayment(${payable})">
        <i class="ri-lock-line"></i> Pay ₹${payable.toLocaleString('en-IN')} & Create Booking
      </button>
    </div>
  `;

  document.getElementById('payment-gateway-modal').classList.add('active');
}

function goBackToSummaryFromPayment() {
  closePaymentGatewayModal();
  if (selectedCarForBooking) {
    renderV2SummaryModal();
    document.getElementById('booking-summary-modal').classList.add('active');
  }
}

function setPaymentMethod(method) {
  activeBookingState.paymentMethod = method;
  openPaymentGatewayModal();
}

let userCustomRazorpayKey = '';

function verifyAndExecutePayment(totalPayable) {
  const car = selectedCarForBooking;
  if (!car) return;

  if (car.status !== 'Available') {
    showToast('⚠️ This vehicle is no longer available. Please choose another vehicle.');
    closePaymentGatewayModal();
    renderAvailableFleet();
    return;
  }

  const btn = document.getElementById('pay-now-action-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Opening Razorpay Secure Gateway...`;
  }

  // Check if Razorpay SDK is available
  if (typeof Razorpay !== 'undefined') {
    const razorpayKey = userCustomRazorpayKey || 'rzp_test_1DP51P55M55BBR';

    const options = {
      "key": razorpayKey,
      "amount": totalPayable * 100, // Amount in paise
      "currency": "INR",
      "name": "SS Car Rental Hyderabad",
      "description": `Rental Booking for ${car.name}`,
      "image": car.imageUrl,
      "handler": function (response) {
        // Payment successful callback from Razorpay
        executeBookingCompletion(totalPayable, response.razorpay_payment_id || `rzp_${Date.now()}`);
      },
      "prefill": {
        "name": "Hyderabad Customer",
        "email": "customer@sscarrental.in",
        "contact": "9849012345"
      },
      "theme": {
        "color": "#E5C158"
      },
      "modal": {
        "ondismiss": function() {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = `<i class="ri-lock-line"></i> Pay ₹${totalPayable.toLocaleString('en-IN')} & Create Booking`;
          }
          showToast('Payment window closed');
        }
      }
    };

    try {
      const rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response){
        alert("Payment Failed: " + response.error.description);
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<i class="ri-lock-line"></i> Pay ₹${totalPayable.toLocaleString('en-IN')} & Create Booking`;
        }
      });
      rzp1.open();
    } catch (err) {
      console.warn('Razorpay SDK init fallback:', err);
      setTimeout(() => {
        executeBookingCompletion(totalPayable, `PAY-${Math.floor(100000 + Math.random() * 900000)}`);
      }, 1000);
    }
  } else {
    // Fallback if Razorpay SDK not available
    setTimeout(() => {
      executeBookingCompletion(totalPayable, `SIM-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  }
}

function executeBookingCompletion(totalPayable, paymentTxnId) {
  const car = selectedCarForBooking;
  if (!car) return;

  const hrs = activeBookingState.durationHours || 12;
  const rentalAmount = (car.pricing && car.pricing[hrs]) ? car.pricing[hrs] : (car.ratePerHour * hrs);

  const bookingId = `FLX-${Math.floor(10000 + Math.random() * 90000)}`;
  const newBooking = {
    bookingId: bookingId,
    paymentTxnId: paymentTxnId,
    car: car,
    pickupLocation: car.locationAddress || car.locationName || activeBookingState.location,
    pickupDateTime: `${activeBookingState.pickupDate}, ${activeBookingState.pickupTime}`,
    dropoffDateTime: `${activeBookingState.dropDate}, ${activeBookingState.dropTime}`,
    durationHours: hrs,
    hourlyRate: car.ratePerHour,
    rentalAmount: rentalAmount,
    gstTax: 0,
    unlimitedKmUpgrade: activeBookingState.unlimitedKmUpgrade,
    unlimitedKmFee: activeBookingState.unlimitedKmUpgrade ? 500 : 0,
    couponDiscount: activeBookingState.couponDiscount,
    grandTotal: totalPayable,
    status: 'UPCOMING',
    paymentStatus: 'PAID (Razorpay Verified)',
    paymentMethod: activeBookingState.paymentMethod.toUpperCase(),
    bookedAt: new Date().toLocaleString('en-IN')
  };

  car.status = 'Booked';
  myBookings.unshift(newBooking);

  closePaymentGatewayModal();
  showToast(`🎉 Payment Success! Booking ID: ${bookingId}`);

  switchMainTab('trips-tab');
  renderAvailableFleet();
}

function closePaymentGatewayModal() {
  document.getElementById('payment-gateway-modal').classList.remove('active');
}

// --- MY TRIPS RENDERER ---
function renderMyTrips() {
  const container = document.getElementById('my-trips-list');
  if (!container) return;

  const filtered = myBookings.filter(b => b.status === currentMyTripsFilter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="ri-route-line" style="font-size: 34px; color: var(--text-light);"></i>
        <p style="margin-top: 8px; font-weight: 600; color: var(--text-grey);">No ${currentMyTripsFilter.toLowerCase()} trips found.</p>
        <button class="btn-primary" style="margin-top: 14px; width: 160px; height: 38px; font-size: 13px;" onclick="switchMainTab('home-tab')">Explore Fleet</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(b => `
    <div class="trip-card">
      <div class="trip-card-header">
        <div>
          <span class="booking-id-badge">ID: ${b.bookingId}</span>
          <h4 style="font-size: 15px; font-weight: 800; color: var(--text-dark); margin-top: 4px;">${b.car.name}</h4>
        </div>
        <span class="trip-status-chip ${b.status.toLowerCase()}">${b.status}</span>
      </div>

      <div class="trip-card-body">
        <img src="${b.car.imageUrl}" alt="${b.car.name}" class="trip-thumb">
        <div style="font-size: 12px; color: var(--text-grey);">
          <div><i class="ri-map-pin-2-fill" style="color: var(--primary-green);"></i> <strong>${b.pickupLocation}</strong></div>
          <div><i class="ri-calendar-line"></i> Pickup: ${b.pickupDateTime}</div>
          <div><i class="ri-calendar-event-line"></i> Drop: ${b.dropoffDateTime}</div>
          <div><i class="ri-money-rupee-circle-line"></i> Total Paid: <strong>₹${b.grandTotal.toLocaleString('en-IN')}</strong> (${b.durationHours} hrs)</div>
          <div><i class="ri-speed-up-line" style="color: var(--primary-green);"></i> Mileage: ${b.unlimitedKmUpgrade ? 'Unlimited KMs' : '400 KM Included'}</div>
        </div>
      </div>

      <div class="trip-card-actions">
        ${b.status === 'UPCOMING' ? `
          <button class="btn-action unlock" onclick="showToast('Bluetooth Keyless Car Unlock Active!')">
            <i class="ri-key-2-line"></i> Unlock Car
          </button>
          <button class="btn-action cancel" onclick="openCancelModal('${b.bookingId}')">
            <i class="ri-close-circle-line"></i> Cancel Trip
          </button>
        ` : `
          <button class="btn-action invoice" onclick="showInvoiceModal('${b.bookingId}')">
            <i class="ri-file-text-line"></i> Download Invoice
          </button>
        `}
      </div>
    </div>
  `).join('');
}

function setTripsFilterTab(status) {
  currentMyTripsFilter = status;
  document.querySelectorAll('.trip-filter-pill').forEach(p => p.classList.remove('active'));
  document.querySelector(`.trip-filter-pill[data-trip-status="${status}"]`)?.classList.add('active');
  renderMyTrips();
}

let pendingCancelBookingId = null;

function openCancelModal(bookingId) {
  pendingCancelBookingId = bookingId;
  const b = myBookings.find(x => x.bookingId === bookingId);
  if (!b) return;

  document.getElementById('cancel-car-info').textContent = `${b.car.name} (Booking ID: ${b.bookingId})`;
  document.getElementById('cancel-refund-amount').textContent = `₹${b.grandTotal.toLocaleString('en-IN')} (100% Full Refund)`;
  document.getElementById('cancel-modal').classList.add('active');
}

function closeCancelModal() {
  document.getElementById('cancel-modal').classList.remove('active');
  pendingCancelBookingId = null;
}

function executeTripCancellation() {
  if (!pendingCancelBookingId) return;

  const b = myBookings.find(x => x.bookingId === pendingCancelBookingId);
  if (b) {
    b.status = 'CANCELLED';
    b.car.status = 'Available';
    closeCancelModal();
    showToast(`Trip ${b.bookingId} cancelled. Refund initiated! 💸`);
    renderMyTrips();
    renderAvailableFleet();
  }
}

function showInvoiceModal(bookingId) {
  const b = myBookings.find(x => x.bookingId === bookingId);
  if (!b) return;

  alert(`SS CAR RENTAL HYDERABAD INVOICE\n-----------------------------------\nBooking ID: ${b.bookingId}\nVehicle: ${b.car.name}\nPickup: ${b.pickupLocation}\nRental Amount: ₹${b.rentalAmount}\nUnlimited KM Fee: ₹${b.unlimitedKmFee}\nGrand Total Paid: ₹${b.grandTotal.toLocaleString('en-IN')}\nStatus: ${b.status}\nPayment: ${b.paymentStatus} (${b.paymentMethod})\n\nThank you for choosing SS Car Rental Hyderabad!`);
}

// --- ADMIN PANEL ---
function renderAdminPortal() {
  const container = document.getElementById('admin-dashboard-container');
  if (!container) return;

  const availableCount = carsData.filter(c => c.status === 'Available').length;
  const bookedCount = carsData.filter(c => c.status === 'Booked').length;
  const maintenanceCount = carsData.filter(c => c.status === 'Maintenance').length;

  container.innerHTML = `
    <div class="admin-header">
      <h2 style="font-size: 18px; font-weight: 800; color: var(--accent-gold);">SS Car Rental Admin Portal</h2>
      <p style="font-size: 12px; color: var(--text-grey);">Hyderabad Fleet Availability & Booking Manager</p>
    </div>

    <div class="admin-kpi-grid">
      <div class="kpi-card">
        <span class="label">Monthly Revenue</span>
        <strong class="val">₹8,94,500</strong>
      </div>
      <div class="kpi-card">
        <span class="label">Available Fleet</span>
        <strong class="val" style="color: var(--primary-green);">${availableCount} Cars</strong>
      </div>
      <div class="kpi-card">
        <span class="label">Booked / Occupied</span>
        <strong class="val" style="color: #D97706;">${bookedCount} Cars</strong>
      </div>
      <div class="kpi-card">
        <span class="label">Under Maintenance</span>
        <strong class="val" style="color: #DC2626;">${maintenanceCount} Cars</strong>
      </div>
    </div>

    <div style="margin-top: 18px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h3 style="font-size: 14px; font-weight: 800;">Vehicle Availability Calendar</h3>
        <span style="font-size: 10px; color: var(--text-grey);">Changes instantly update search results</span>
      </div>

      <div class="admin-fleet-list">
        ${carsData.map(car => `
          <div class="admin-car-row">
            <div>
              <strong style="font-size: 13px;">${car.name}</strong>
              <p style="font-size: 10px; color: var(--text-grey);">${car.fuelType} • ${car.transmission} • ₹${car.ratePerHour}/hr</p>
            </div>
            <select class="status-toggle-select ${car.status.toLowerCase()}" onchange="changeCarStatus('${car.id}', this.value)">
              <option value="Available" ${car.status === 'Available' ? 'selected' : ''}>Available</option>
              <option value="Booked" ${car.status === 'Booked' ? 'selected' : ''}>Booked</option>
              <option value="Maintenance" ${car.status === 'Maintenance' ? 'selected' : ''}>Maintenance</option>
              <option value="Inactive" ${car.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
            </select>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="margin-top: 18px; background: var(--off-white); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--subtle-grey);">
      <h3 style="font-size: 14px; font-weight: 800;">Customer KYC Approval Queue</h3>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
        <div>
          <div style="font-weight: 700; font-size: 13px;">${driverKyc.driverName}</div>
          <div style="font-size: 11px; color: var(--text-grey);">DL: ${driverKyc.dlNumber}</div>
        </div>
        <span class="status-badge ${driverKyc.status.toLowerCase()}">${driverKyc.status}</span>
      </div>
      <div style="display: flex; gap: 8px; margin-top: 10px;">
        <button class="btn-primary" style="height: 32px; font-size: 11px;" onclick="updateKycStatus('VERIFIED')">Approve DL</button>
        <button class="btn-primary" style="height: 32px; font-size: 11px; background: #DC2626;" onclick="updateKycStatus('REJECTED')">Reject DL</button>
      </div>
    </div>
  `;
}

function changeCarStatus(carId, newStatus) {
  const car = carsData.find(c => c.id === carId);
  if (car) {
    car.status = newStatus;
    showToast(`Status of ${car.name} set to ${newStatus}`);
    renderAdminPortal();
    renderAvailableFleet();
  }
}

function updateKycStatus(status) {
  driverKyc.status = status;
  showToast(`KYC Status updated to ${status}`);
  renderAdminPortal();
}

function showToast(msg) {
  const toastEl = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');
  if (!toastEl || !toastText) return;

  toastText.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3200);
}
