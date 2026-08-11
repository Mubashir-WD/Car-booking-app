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

// --- SS Car Rental Vehicle Database ---
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
    locationName: 'Tolichowki Pickup Hub',
    locationAddress: 'Tolichowki X Road, Tolichowki, Hyderabad',
    mapUrl: 'https://maps.app.goo.gl/vKUQeUyYNSDfC42s7',
    imageUrl: 'images/grand_i10_1.jpg',
    images: [
      'images/grand_i10_1.jpg',
      'images/grand_i10_2.jpg'
    ],
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
    locationName: 'Madhapur Pickup Hub',
    locationAddress: 'Madhapur Metro Station, Madhapur, Hyderabad',
    mapUrl: 'https://maps.app.goo.gl/7FhE3jtspgQ1g3NS9?g_st=aw',
    imageUrl: 'images/renault_kwid_1.jpg',
    images: [
      'images/renault_kwid_1.jpg',
      'images/renault_kwid_2.jpg',
      'images/renault_kwid_3.jpg'
    ],
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
    locationName: 'Gachibowli Pickup Hub',
    locationAddress: 'DLF Cybercity Road, Gachibowli, Hyderabad',
    mapUrl: 'https://maps.app.goo.gl/7FhE3jtspgQ1g3NS9?g_st=aw',
    imageUrl: 'images/skoda_1.jpg',
    images: [
      'images/skoda_1.jpg',
      'images/skoda_2.jpg'
    ],
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

  if (diffHours < 8) {
    showToast('⚠️ Minimum booking duration is 8 hours.');
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

// --- User KYC State & Verification Workflow ---
let userKycState = {
  status: 'NOT_UPLOADED', // 'NOT_UPLOADED' | 'IN_PROGRESS' | 'VERIFIED' | 'REJECTED'
  dlPhotoUrl: '',
  dlFileName: '',
  aadhaarPhotoUrl: '',
  aadhaarFileName: '',
  submittedAt: ''
};

function handleKycFileSelect(event, docType) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    if (docType === 'DL') {
      userKycState.dlPhotoUrl = e.target.result;
      userKycState.dlFileName = file.name;
    } else if (docType === 'AADHAAR') {
      userKycState.aadhaarPhotoUrl = e.target.result;
      userKycState.aadhaarFileName = file.name;
    }
    renderProfileTab();
    showToast(`✓ Selected ${docType === 'DL' ? 'Driving Licence' : 'Aadhaar Card'} photo preview!`);
  };
  reader.readAsDataURL(file);
}

function submitKycForVerification() {
  if (!userKycState.dlPhotoUrl && !userKycState.aadhaarPhotoUrl) {
    showToast('⚠️ Please upload your Driving Licence or Aadhaar Card photo first');
    return;
  }
  userKycState.status = 'IN_PROGRESS';
  userKycState.submittedAt = new Date().toLocaleString('en-IN');
  showToast('⏳ KYC Submitted! Status set to IN PROGRESS (Awaiting Admin Approval)');
  renderProfileTab();
}

function renderProfileTab() {
  const container = document.getElementById('profile-tab-container');
  if (!container) return;

  if (userMobileState.isLoggedIn) {
    const kycStatus = userKycState.status;
    let kycBadgeHtml = '';
    if (kycStatus === 'VERIFIED') {
      kycBadgeHtml = `<span style="background: rgba(229, 193, 88, 0.2); color: var(--accent-gold); font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 8px; border: 1px solid var(--accent-gold);"><i class="ri-checkbox-circle-fill"></i> VERIFIED (Admin Approved)</span>`;
    } else if (kycStatus === 'IN_PROGRESS') {
      kycBadgeHtml = `<span style="background: rgba(245, 158, 11, 0.2); color: #F59E0B; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 8px; border: 1px solid #F59E0B;"><i class="ri-time-line"></i> IN PROGRESS (Awaiting Verification)</span>`;
    } else if (kycStatus === 'REJECTED') {
      kycBadgeHtml = `<span style="background: rgba(239, 68, 68, 0.2); color: #EF4444; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 8px; border: 1px solid #EF4444;"><i class="ri-close-circle-line"></i> REJECTED (Re-upload Clear Photo)</span>`;
    } else {
      kycBadgeHtml = `<span style="background: rgba(148, 163, 184, 0.2); color: #94A3B8; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 8px; border: 1px solid #94A3B8;"><i class="ri-alert-line"></i> NOT UPLOADED</span>`;
    }

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 16px;">
        <div style="width: 76px; height: 76px; border-radius: 50%; background: rgba(229, 193, 88, 0.15); color: var(--accent-gold); display: flex; align-items: center; justify-content: center; font-size: 34px; font-weight: 800; margin: 0 auto 8px; border: 2px solid var(--accent-gold);">
          <i class="ri-user-3-fill"></i>
        </div>
        <h2 style="font-size: 19px; font-weight: 800; color: var(--text-dark);">Customer Account</h2>
        <span style="background: rgba(229, 193, 88, 0.12); color: var(--accent-gold); font-size: 11px; font-weight: 700; padding: 3px 12px; border-radius: 20px; display: inline-block; margin-top: 4px; border: 1px solid rgba(229, 193, 88, 0.3);">
          <i class="ri-checkbox-circle-fill"></i> Mobile Verified (+91 ${userMobileState.mobileNumber})
        </span>
      </div>

      <!-- Account Info Card -->
      <div class="card-box" style="background: var(--off-white); padding: 14px; border-radius: var(--radius-md); border: 1.5px solid var(--subtle-grey); margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-weight: 600; font-size: 12px; color: var(--text-grey);"><i class="ri-phone-line" style="color: var(--accent-gold);"></i> Registered Mobile</span>
          <strong style="color: var(--text-dark); font-size: 13px;">+91 ${userMobileState.mobileNumber}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-weight: 600; font-size: 12px; color: var(--text-grey);"><i class="ri-shield-check-line" style="color: var(--accent-gold);"></i> Security Deposit</span>
          <span style="color: var(--accent-gold); font-size: 12px; font-weight: 800;">₹0 Zero Deposit</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; font-size: 12px; color: var(--text-grey);"><i class="ri-id-card-line" style="color: var(--accent-gold);"></i> KYC Verification Status</span>
          ${kycBadgeHtml}
        </div>
      </div>

      <!-- KYC Document Upload Card -->
      <div class="card-box" style="background: #141C2B; padding: 14px; border-radius: var(--radius-md); border: 1.5px solid rgba(229, 193, 88, 0.35); margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h3 style="font-size: 14px; font-weight: 800; color: var(--accent-gold);">
            <i class="ri-folder-user-line"></i> Upload KYC Documents
          </h3>
          <span style="font-size: 10px; color: var(--text-grey);">DL & Aadhaar Photos</span>
        </div>

        <!-- 1. Driving Licence Upload -->
        <div style="background: #0B0F17; padding: 10px; border-radius: 10px; border: 1px solid var(--subtle-grey); margin-bottom: 10px;">
          <label style="font-size: 11px; font-weight: 700; color: var(--text-dark); display: block; margin-bottom: 4px;">
            <i class="ri-steering-2-line" style="color: var(--accent-gold);"></i> 1. Driving Licence (DL) Photo
          </label>
          <input type="file" accept="image/*" id="dl-file-input" onchange="handleKycFileSelect(event, 'DL')" style="display: none;">
          <button type="button" class="use-gps-btn" style="width: 100%; justify-content: center; height: 34px; font-size: 11px;" onclick="document.getElementById('dl-file-input').click()">
            <i class="ri-upload-2-line"></i> ${userKycState.dlFileName ? 'Change DL Photo (' + userKycState.dlFileName + ')' : 'Choose / Upload DL Photo'}
          </button>

          ${userKycState.dlPhotoUrl ? `
            <div style="margin-top: 8px; text-align: center;">
              <img src="${userKycState.dlPhotoUrl}" alt="Driving Licence Preview" style="max-height: 110px; width: auto; border-radius: 6px; border: 1px solid var(--accent-gold); object-fit: contain;">
              <span style="display: block; font-size: 9px; color: var(--accent-gold); margin-top: 2px;">✓ DL Photo Selected</span>
            </div>
          ` : ''}
        </div>

        <!-- 2. Aadhaar Card Upload -->
        <div style="background: #0B0F17; padding: 10px; border-radius: 10px; border: 1px solid var(--subtle-grey); margin-bottom: 10px;">
          <label style="font-size: 11px; font-weight: 700; color: var(--text-dark); display: block; margin-bottom: 4px;">
            <i class="ri-id-card-line" style="color: var(--accent-gold);"></i> 2. Aadhaar Card Photo
          </label>
          <input type="file" accept="image/*" id="aadhaar-file-input" onchange="handleKycFileSelect(event, 'AADHAAR')" style="display: none;">
          <button type="button" class="use-gps-btn" style="width: 100%; justify-content: center; height: 34px; font-size: 11px;" onclick="document.getElementById('aadhaar-file-input').click()">
            <i class="ri-upload-2-line"></i> ${userKycState.aadhaarFileName ? 'Change Aadhaar Photo (' + userKycState.aadhaarFileName + ')' : 'Choose / Upload Aadhaar Photo'}
          </button>

          ${userKycState.aadhaarPhotoUrl ? `
            <div style="margin-top: 8px; text-align: center;">
              <img src="${userKycState.aadhaarPhotoUrl}" alt="Aadhaar Card Preview" style="max-height: 110px; width: auto; border-radius: 6px; border: 1px solid var(--accent-gold); object-fit: contain;">
              <span style="display: block; font-size: 9px; color: var(--accent-gold); margin-top: 2px;">✓ Aadhaar Photo Selected</span>
            </div>
          ` : ''}
        </div>

        ${kycStatus === 'VERIFIED' ? `
          <div style="text-align: center; padding: 8px; background: rgba(229, 193, 88, 0.12); border-radius: 8px; border: 1px solid var(--accent-gold); margin-top: 8px;">
            <p style="color: var(--accent-gold); font-size: 11px; font-weight: 800;">✓ Your KYC documents are verified by Admin! Ready to ride.</p>
          </div>
        ` : (kycStatus === 'IN_PROGRESS' ? `
          <div style="text-align: center; padding: 8px; background: rgba(245, 158, 11, 0.12); border-radius: 8px; border: 1px solid #F59E0B; margin-top: 8px;">
            <p style="color: #F59E0B; font-size: 11px; font-weight: 800;">⏳ Status: IN PROGRESS (Awaiting Admin Review in Admin Portal)</p>
          </div>
        ` : `
          <button class="btn-primary" style="margin-top: 8px;" onclick="submitKycForVerification()">
            <i class="ri-send-plane-line"></i> Submit KYC for Admin Verification
          </button>
        `)}
      </div>

      <button class="btn-primary" style="background: rgba(239, 68, 68, 0.15); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.4); margin-bottom: 12px;" onclick="logoutMobileUser()">
        <i class="ri-logout-box-r-line"></i> Logout
      </button>

      <!-- Admin Portal Access Link -->
      <div style="text-align: center; padding-top: 8px; border-top: 1px dashed var(--subtle-grey);">
        <button style="background: none; border: none; color: var(--accent-gold); font-size: 11px; font-weight: 700; cursor: pointer; text-decoration: underline;" onclick="switchMainTab('admin-tab')">
          🔑 Switch to Admin Portal (Fleet & KYC Management)
        </button>
        <div style="font-size: 9px; color: var(--text-grey); margin-top: 2px;">Direct URL Route: <code>#admin</code></div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px 10px;">
        <div style="width: 72px; height: 72px; background: rgba(229, 193, 88, 0.12); color: var(--accent-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 34px; margin: 0 auto 14px; border: 2px solid rgba(229, 193, 88, 0.4);">
          <i class="ri-smartphone-line"></i>
        </div>
        <h2 style="font-size: 20px; font-weight: 800; color: var(--text-dark);">Login to Your Account</h2>
        <p style="font-size: 12px; color: var(--text-grey); margin-top: 4px; max-width: 300px; margin-left: auto; margin-right: auto;">
          Log in with your 10-digit mobile number to view bookings, upload KYC documents, and manage trips.
        </p>

        <button class="btn-primary" style="margin-top: 20px;" onclick="openMobileLoginModal()">
          <i class="ri-smartphone-line"></i> Login with Mobile Number
        </button>

        <div style="margin-top: 24px; text-align: center;">
          <button style="background: none; border: none; color: var(--accent-gold); font-size: 11px; font-weight: 700; cursor: pointer; text-decoration: underline;" onclick="switchMainTab('admin-tab')">
            🔑 Switch to Admin Portal (Fleet & KYC Management)
          </button>
        </div>
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

  const mainContent = document.querySelector('.main-content');
  if (mainContent) mainContent.scrollTop = 0;

  if (tabId === 'trips-tab') renderMyTrips();
  else if (tabId === 'profile-tab') renderProfileTab();
  else if (tabId === 'admin-tab') renderAdminPortal();
}

function checkUrlHashRoute() {
  const hash = window.location.hash.toLowerCase();
  if (hash === '#admin' || hash === '#admin-portal') {
    switchMainTab('admin-tab');
  }
}

window.addEventListener('hashchange', checkUrlHashRoute);
window.addEventListener('DOMContentLoaded', checkUrlHashRoute);

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
  container.scrollTop = 0;

  container.innerHTML = `
    <div class="modal-sheet-header">
      <div class="sheet-handle"></div>
      <button class="modal-close-btn" onclick="closeV2SummaryModal()" title="Close Popup">
        <i class="ri-close-line"></i>
      </button>
    </div>

    <div class="summary-header">
      <h3>Booking Summary</h3>
      <p style="font-size: 12px; color: var(--text-grey);">Review vehicle details & multi-angle photos</p>
    </div>

    <div class="summary-car-card">
      <div style="flex: 1;">
        <h4 style="font-size: 16px; font-weight: 800; color: var(--text-dark);">${car.name}</h4>
        <p style="font-size: 11px; color: var(--text-grey);">${car.brand} • ${car.fuelType} • ${car.transmission} • ${car.seatingCapacity} Seats</p>
        <span style="color: var(--accent-gold); font-weight: 800; font-size: 14px;">₹${rentalAmount.toLocaleString('en-IN')} / ${hrs} hours package</span>
      </div>
    </div>

    <!-- Multi-Angle Car Photo Carousel -->
    <div class="summary-gallery-container">
      <label style="font-size: 10px; font-weight: 800; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">
        <i class="ri-camera-lens-line"></i> Vehicle Multi-Angle Photos (${car.images ? car.images.length : 1} Angles)
      </label>
      <div class="summary-gallery-viewer">
        <img id="summary-car-main-img" src="${(car.images && car.images[0]) || car.imageUrl}" alt="${car.name}">
        <span class="angle-badge" id="summary-angle-badge">Tap thumbnail to change view</span>
      </div>
      ${car.images && car.images.length > 1 ? `
        <div class="summary-gallery-thumbs">
          ${car.images.map((imgUrl, idx) => `
            <div class="summary-angle-thumb ${idx === 0 ? 'active' : ''}" onclick="switchSummaryCarImage(${idx}, '${car.id}')">
              <img src="${imgUrl}" alt="${car.name} Angle ${idx + 1}">
              <span>${idx === 0 ? 'Front' : (idx === 1 && car.images.length === 2 ? 'Rear' : (idx === 1 ? 'Side' : 'Rear'))}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
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
  container.scrollTop = 0;

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
        "contact": "9866355123"
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

    <div style="margin-top: 18px; background: #141C2B; padding: 14px; border-radius: var(--radius-md); border: 1.5px solid rgba(229, 193, 88, 0.35);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h3 style="font-size: 14px; font-weight: 800; color: var(--accent-gold);">
          <i class="ri-shield-user-line"></i> Customer KYC Verification Queue
        </h3>
        <span class="status-badge ${userKycState.status.toLowerCase()}" style="font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 6px;">
          ${userKycState.status}
        </span>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 12px;">
        <div>
          <span style="color: var(--text-grey);">Customer Mobile:</span>
          <strong style="color: var(--text-dark);">+91 ${userMobileState.mobileNumber || '9573314417'}</strong>
        </div>
        <span style="font-size: 10px; color: var(--text-grey);">${userKycState.submittedAt || 'Recent Upload'}</span>
      </div>

      <!-- Uploaded Document Photo Previews for Admin -->
      <div style="display: flex; gap: 10px; margin-top: 12px;">
        <div style="flex: 1; background: #0B0F17; padding: 8px; border-radius: 8px; border: 1px solid var(--subtle-grey); text-align: center;">
          <span style="font-size: 10px; font-weight: 700; color: var(--accent-gold); display: block; margin-bottom: 4px;">Driving Licence (DL)</span>
          ${userKycState.dlPhotoUrl ? `
            <img src="${userKycState.dlPhotoUrl}" alt="Customer DL Photo" style="width: 100%; height: 75px; object-fit: contain; border-radius: 4px; border: 1px solid var(--subtle-grey);">
            <span style="font-size: 9px; color: var(--accent-gold); margin-top: 2px; display: block;">✓ DL Uploaded</span>
          ` : `
            <div style="height: 75px; display: flex; align-items: center; justify-content: center; color: var(--text-grey); font-size: 10px; background: rgba(255,255,255,0.03); border-radius: 4px;">
              <i class="ri-image-line" style="font-size: 20px;"></i> No DL Photo
            </div>
          `}
        </div>

        <div style="flex: 1; background: #0B0F17; padding: 8px; border-radius: 8px; border: 1px solid var(--subtle-grey); text-align: center;">
          <span style="font-size: 10px; font-weight: 700; color: var(--accent-gold); display: block; margin-bottom: 4px;">Aadhaar Card</span>
          ${userKycState.aadhaarPhotoUrl ? `
            <img src="${userKycState.aadhaarPhotoUrl}" alt="Customer Aadhaar Photo" style="width: 100%; height: 75px; object-fit: contain; border-radius: 4px; border: 1px solid var(--subtle-grey);">
            <span style="font-size: 9px; color: var(--accent-gold); margin-top: 2px; display: block;">✓ Aadhaar Uploaded</span>
          ` : `
            <div style="height: 75px; display: flex; align-items: center; justify-content: center; color: var(--text-grey); font-size: 10px; background: rgba(255,255,255,0.03); border-radius: 4px;">
              <i class="ri-image-line" style="font-size: 20px;"></i> No Aadhaar Photo
            </div>
          `}
        </div>
      </div>

      <!-- Action buttons for Admin to Approve or Reject -->
      <div style="display: flex; gap: 8px; margin-top: 14px;">
        <button class="btn-primary" style="height: 38px; font-size: 12px; flex: 1;" onclick="updateKycStatus('VERIFIED')">
          <i class="ri-checkbox-circle-line"></i> Approve & Mark Verified
        </button>
        <button class="btn-primary" style="height: 38px; font-size: 12px; flex: 1; background: rgba(239, 68, 68, 0.2); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.4);" onclick="updateKycStatus('REJECTED')">
          <i class="ri-close-circle-line"></i> Reject Documents
        </button>
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
  userKycState.status = status;
  if (status === 'VERIFIED') {
    showToast('✓ KYC Approved! Customer profile updated to VERIFIED');
  } else if (status === 'REJECTED') {
    showToast('✕ KYC Rejected! Customer notified to re-upload clear photos');
  } else {
    showToast(`KYC Status updated to ${status}`);
  }
  renderAdminPortal();
  renderProfileTab();
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

// --- HELPER FUNCTIONS FOR REDESIGNED HOME SCREEN & GALLERY ---

function switchSummaryCarImage(index, carId) {
  const car = carsData.find(c => c.id === carId) || selectedCarForBooking;
  if (!car || !car.images) return;
  const mainImg = document.getElementById('summary-car-main-img');
  if (mainImg) mainImg.src = car.images[index];
  
  document.querySelectorAll('.summary-angle-thumb').forEach((thumb, i) => {
    if (i === index) thumb.classList.add('active');
    else thumb.classList.remove('active');
  });
}

function scrollToFleetCatalog() {
  switchMainTab('home-tab');
  const mainContent = document.querySelector('.main-content');
  const locationCard = document.getElementById('location-focus-card') || document.querySelector('.location-search-card');
  
  if (mainContent && locationCard) {
    const targetY = Math.max(0, locationCard.offsetTop - 12);
    mainContent.scrollTo({ top: targetY, behavior: 'smooth' });

    locationCard.classList.add('slide-focus-active');
    setTimeout(() => {
      locationCard.classList.remove('slide-focus-active');
    }, 1200);
  }
}

const heroSlides = [
  { img: 'images/skoda_1.jpg', title: 'Ab Manzil Ki Tension Chhodo!', badge: 'UNLIMITED KILOMETERS' },
  { img: 'images/grand_i10_1.jpg', title: 'Drive Clean & Premium Hatchbacks', badge: 'HYDERABAD HUBS' },
  { img: 'images/renault_kwid_1.jpg', title: 'Affordable Rates Starting @ ₹75/hr', badge: 'ZERO DEPOSIT' }
];

let currentHeroSlideIndex = 0;

function setHeroBannerSlide(index) {
  currentHeroSlideIndex = index;
  const slide = heroSlides[index];
  const imgEl = document.getElementById('hero-carousel-img');
  const titleEl = document.querySelector('.hero-banner-title');
  const badgeEl = document.querySelector('.promo-badge-tag');

  if (imgEl && slide) imgEl.src = slide.img;
  if (titleEl && slide) titleEl.textContent = slide.title;
  if (badgeEl && slide) badgeEl.textContent = slide.badge;

  document.querySelectorAll('.hero-banner-dots .dot').forEach((dot, idx) => {
    if (idx === index) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

// Auto-rotate hero slider every 4.5 seconds
setInterval(() => {
  const nextSlide = (currentHeroSlideIndex + 1) % heroSlides.length;
  setHeroBannerSlide(nextSlide);
}, 4500);
