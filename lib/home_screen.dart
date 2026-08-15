import 'package:flutter/material.dart';
import 'theme.dart';
import 'booking_screen.dart';

// --- Vehicle Data Model ---
class CarModel {
  final String id;
  final String name;
  final String brand;
  final String type;
  final String transmission;
  final String fuelType;
  final int seatingCapacity;
  final double rate12h;
  final double rate24h;
  final double rate3d;
  final double rate7d;
  final String primaryImage;
  final List<String> galleryImages;
  final List<String> features;
  final String location;

  const CarModel({
    required this.id,
    required this.name,
    required this.brand,
    required this.type,
    required this.transmission,
    required this.fuelType,
    required this.seatingCapacity,
    required this.rate12h,
    required this.rate24h,
    required this.rate3d,
    required this.rate7d,
    required this.primaryImage,
    required this.galleryImages,
    required this.features,
    required this.location,
  });

  double getRateForPackage(String packageKey) {
    switch (packageKey) {
      case '12h':
        return rate12h;
      case '24h':
        return rate24h;
      case '3d':
        return rate3d;
      case '7d':
        return rate7d;
      default:
        return rate24h;
    }
  }
}

// Actual SS Car Rentals Fleet
const List<CarModel> sscFleet = [
  CarModel(
    id: 'grand_i10',
    name: 'Grand i10 Nios',
    brand: 'Hyundai',
    type: 'Hatchback',
    transmission: 'Manual',
    fuelType: 'Petrol',
    seatingCapacity: 5,
    rate12h: 1000,
    rate24h: 1800,
    rate3d: 4800,
    rate7d: 10500,
    primaryImage: 'assets/images/grand_i10.jpg',
    galleryImages: [
      'assets/images/grand_i10.jpg',
      'assets/images/grand_i10_1.jpg',
      'assets/images/grand_i10_2.jpg',
    ],
    features: ['Air Conditioning', 'Touchscreen Music System', 'Power Windows', 'Fastag Enabled'],
    location: 'Kakinada Main Branch',
  ),
  CarModel(
    id: 'renault_kwid',
    name: 'Kwid Climber AMT',
    brand: 'Renault',
    type: 'Compact Hatchback',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seatingCapacity: 5,
    rate12h: 800,
    rate24h: 1400,
    rate3d: 3800,
    rate7d: 8000,
    primaryImage: 'assets/images/renault_kwid.jpg',
    galleryImages: [
      'assets/images/renault_kwid.jpg',
      'assets/images/renault_kwid_1.jpg',
      'assets/images/renault_kwid_2.jpg',
      'assets/images/renault_kwid_3.jpg',
    ],
    features: ['AMT Automatic', 'Reverse Camera', 'Compact Parking Ease', 'Bluetooth Audio'],
    location: 'Kakinada Main Branch',
  ),
  CarModel(
    id: 'skoda_rapid',
    name: 'Rapid 1.0 TSI',
    brand: 'Skoda',
    type: 'Premium Sedan',
    transmission: 'Manual',
    fuelType: 'Petrol',
    seatingCapacity: 5,
    rate12h: 1400,
    rate24h: 2400,
    rate3d: 6500,
    rate7d: 14000,
    primaryImage: 'assets/images/skoda.jpg',
    galleryImages: [
      'assets/images/skoda.jpg',
      'assets/images/skoda_1.jpg',
      'assets/images/skoda_2.jpg',
    ],
    features: ['Turbo TSI Power', 'Alloy Wheels', 'Leather Seats', 'Cruise Control', 'Large Boot'],
    location: 'Rajahmundry Station Hub',
  ),
];

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _selectedLocation = 'All Locations';
  String _selectedPackage = '24h';

  final List<Map<String, String>> _durationPackages = [
    {'key': '12h', 'label': '12 Hours'},
    {'key': '24h', 'label': '24 Hours'},
    {'key': '3d', 'label': '3 Days'},
    {'key': '7d', 'label': '7 Days'},
  ];

  final List<String> _locations = [
    'All Locations',
    'Kakinada Main Branch',
    'Rajahmundry Station Hub',
  ];

  List<CarModel> get _filteredCars {
    if (_selectedLocation == 'All Locations') return sscFleet;
    return sscFleet.where((car) => car.location == _selectedLocation).toList();
  }

  void _showGalleryDialog(BuildContext context, CarModel car) {
    showDialog(
      context: context,
      builder: (context) {
        return Dialog(
          backgroundColor: SSCTheme.darkSurface,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '${car.brand} ${car.name}',
                      style: const TextStyle(
                        color: SSCTheme.textLight,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: SSCTheme.primaryGold),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                SizedBox(
                  height: 200,
                  child: PageView.builder(
                    itemCount: car.galleryImages.length,
                    itemBuilder: (context, index) {
                      return Container(
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          color: SSCTheme.darkCard,
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: Stack(
                            fit: StackFit.expand,
                            children: [
                              Image.asset(
                                car.galleryImages[index],
                                fit: BoxFit.cover,
                                errorBuilder: (context, error, stackTrace) {
                                  return Container(
                                    color: SSCTheme.darkCard,
                                    child: const Center(
                                      child: Icon(Icons.directions_car, color: SSCTheme.primaryGold, size: 50),
                                    ),
                                  );
                                },
                              ),
                              Positioned(
                                bottom: 8,
                                right: 8,
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: Colors.black.withOpacity(0.7),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Text(
                                    '${index + 1} / ${car.galleryImages.length}',
                                    style: const TextStyle(color: SSCTheme.textLight, fontSize: 12),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(height: 14),
                Wrap(
                  spacing: 8,
                  runSpacing: 6,
                  children: car.features
                      .map(
                        (f) => Chip(
                          backgroundColor: SSCTheme.darkCard,
                          side: const BorderSide(color: SSCTheme.darkBorder),
                          label: Text(
                            f,
                            style: const TextStyle(color: SSCTheme.textMuted, fontSize: 11),
                          ),
                        ),
                      )
                      .toList(),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: SSCTheme.darkBg,
      appBar: AppBar(
        backgroundColor: SSCTheme.darkSurface,
        elevation: 0,
        title: Row(
          children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: SSCTheme.primaryGold, width: 1.5),
              ),
              child: ClipOval(
                child: Image.asset(
                  'assets/images/logo.png',
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stackTrace) => const Icon(
                    Icons.directions_car,
                    color: SSCTheme.primaryGold,
                    size: 20,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 10),
            RichText(
              text: const TextSpan(
                children: [
                  TextSpan(
                    text: 'SS CAR ',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w900,
                      color: SSCTheme.primaryGold,
                      letterSpacing: 1.2,
                    ),
                  ),
                  TextSpan(
                    text: 'RENTALS',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: SSCTheme.textLight,
                      letterSpacing: 1.2,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.headset_mic_outlined, color: SSCTheme.primaryGold),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Support Hotline: +91 98663 55123'),
                  backgroundColor: SSCTheme.darkCard,
                ),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.symmetric(vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Hero Banner
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16),
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [SSCTheme.darkSurface, SSCTheme.darkCard],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: SSCTheme.primaryGold.withOpacity(0.4), width: 1),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Self-Drive Luxury & Comfort',
                          style: TextStyle(
                            color: SSCTheme.primaryGold,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
                          'Verified cars with zero security deposit hassle. Easy online KYC verification.',
                          style: TextStyle(
                            color: SSCTheme.textMuted,
                            fontSize: 13,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 10),
                  const Icon(
                    Icons.auto_awesome,
                    color: SSCTheme.primaryGold,
                    size: 38,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Location Selector Section
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Pickup Hub / Location',
                    style: TextStyle(
                      color: SSCTheme.textLight,
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: _locations.map((loc) {
                        final isSelected = loc == _selectedLocation;
                        return Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: ChoiceChip(
                            label: Text(loc),
                            selected: isSelected,
                            selectedColor: SSCTheme.primaryGold,
                            backgroundColor: SSCTheme.darkCard,
                            side: BorderSide(
                              color: isSelected ? SSCTheme.primaryGold : SSCTheme.darkBorder,
                            ),
                            labelStyle: TextStyle(
                              color: isSelected ? SSCTheme.darkBg : SSCTheme.textLight,
                              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                              fontSize: 13,
                            ),
                            onSelected: (val) {
                              if (val) setState(() => _selectedLocation = loc);
                            },
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Duration Package Filter
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Rental Duration Package',
                    style: TextStyle(
                      color: SSCTheme.textLight,
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: _durationPackages.map((pkg) {
                      final isSelected = pkg['key'] == _selectedPackage;
                      return Expanded(
                        child: GestureDetector(
                          onTap: () => setState(() => _selectedPackage = pkg['key']!),
                          child: Container(
                            margin: const EdgeInsets.symmetric(horizontal: 4),
                            padding: const EdgeInsets.symmetric(vertical: 10),
                            decoration: BoxDecoration(
                              color: isSelected ? SSCTheme.primaryGold : SSCTheme.darkCard,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(
                                color: isSelected ? SSCTheme.primaryGold : SSCTheme.darkBorder,
                              ),
                            ),
                            child: Center(
                              child: Text(
                                pkg['label']!,
                                style: TextStyle(
                                  color: isSelected ? SSCTheme.darkBg : SSCTheme.textLight,
                                  fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                                  fontSize: 12,
                                ),
                              ),
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Fleet Catalog List Header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Available Fleet (${_filteredCars.length})',
                    style: const TextStyle(
                      color: SSCTheme.textLight,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Icon(Icons.tune_rounded, color: SSCTheme.primaryGold, size: 20),
                ],
              ),
            ),
            const SizedBox(height: 12),

            // Fleet Car List Cards
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _filteredCars.length,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemBuilder: (context, index) {
                final car = _filteredCars[index];
                final price = car.getRateForPackage(_selectedPackage);
                final pkgLabel = _durationPackages.firstWhere((p) => p['key'] == _selectedPackage)['label'];

                return Card(
                  margin: const EdgeInsets.only(bottom: 16),
                  child: Padding(
                    padding: const EdgeInsets.all(14.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Car Header & Image
                        GestureDetector(
                          onTap: () => _showGalleryDialog(context, car),
                          child: Stack(
                            children: [
                              ClipRRect(
                                borderRadius: BorderRadius.circular(12),
                                child: Container(
                                  height: 180,
                                  width: double.infinity,
                                  color: SSCTheme.darkBg,
                                  child: Image.asset(
                                    car.primaryImage,
                                    fit: BoxFit.cover,
                                    errorBuilder: (context, error, stackTrace) {
                                      return Container(
                                        color: SSCTheme.darkBg,
                                        child: const Center(
                                          child: Icon(
                                            Icons.directions_car_filled_rounded,
                                            color: SSCTheme.primaryGold,
                                            size: 60,
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                                ),
                              ),
                              Positioned(
                                top: 8,
                                right: 8,
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: Colors.black.withOpacity(0.75),
                                    borderRadius: BorderRadius.circular(8),
                                    border: Border.all(color: SSCTheme.primaryGold.withOpacity(0.5)),
                                  ),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: const [
                                      Icon(Icons.collections, color: SSCTheme.primaryGold, size: 14),
                                      SizedBox(width: 4),
                                      Text(
                                        'Photos',
                                        style: TextStyle(color: SSCTheme.textLight, fontSize: 11),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 12),

                        // Title & Transmission
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  car.name,
                                  style: const TextStyle(
                                    color: SSCTheme.textLight,
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Text(
                                  '${car.brand} • ${car.type}',
                                  style: const TextStyle(
                                    color: SSCTheme.textMuted,
                                    fontSize: 13,
                                  ),
                                ),
                              ],
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: SSCTheme.darkBg,
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: SSCTheme.darkBorder),
                              ),
                              child: Text(
                                car.transmission,
                                style: const TextStyle(
                                  color: SSCTheme.primaryGold,
                                  fontSize: 12,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),

                        // Specifications Row
                        Row(
                          children: [
                            const Icon(Icons.airline_seat_recline_normal, color: SSCTheme.textSubtle, size: 16),
                            const SizedBox(width: 4),
                            Text('${car.seatingCapacity} Seats', style: const TextStyle(color: SSCTheme.textMuted, fontSize: 12)),
                            const SizedBox(width: 14),
                            const Icon(Icons.local_gas_station_rounded, color: SSCTheme.textSubtle, size: 16),
                            const SizedBox(width: 4),
                            Text(car.fuelType, style: const TextStyle(color: SSCTheme.textMuted, fontSize: 12)),
                            const SizedBox(width: 14),
                            const Icon(Icons.location_on_outlined, color: SSCTheme.textSubtle, size: 16),
                            const SizedBox(width: 4),
                            Expanded(
                              child: Text(
                                car.location.replaceAll(' Main Branch', '').replaceAll(' Station Hub', ''),
                                style: const TextStyle(color: SSCTheme.textMuted, fontSize: 12),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                        const Divider(color: SSCTheme.darkBorder, height: 24),

                        // Price & Book Now Action
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  '₹${price.toInt()}',
                                  style: const TextStyle(
                                    color: SSCTheme.primaryGold,
                                    fontSize: 22,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Text(
                                  'For $pkgLabel package',
                                  style: const TextStyle(
                                    color: SSCTheme.textSubtle,
                                    fontSize: 11,
                                  ),
                                ),
                              ],
                            ),
                            ElevatedButton.icon(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => BookingScreen(
                                      car: car,
                                      initialPackageKey: _selectedPackage,
                                    ),
                                  ),
                                );
                              },
                              style: ElevatedButton.styleFrom(
                                minimumSize: const Size(130, 44),
                                backgroundColor: SSCTheme.primaryGold,
                                foregroundColor: SSCTheme.darkBg,
                              ),
                              icon: const Icon(Icons.key_rounded, size: 18),
                              label: const Text('Book Now'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
