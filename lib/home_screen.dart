import 'package:flutter/material.dart';
import 'theme.dart';

// --- Dummy Data Models ---
class CarModel {
  final String id;
  final String name;
  final String brand;
  final bool isEV;
  final int? batteryRangeKm;
  final int? batteryPercentage;
  final double pricePerHour;
  final String imageUrl;
  final int seatingCapacity;
  final String transmission;

  const CarModel({
    required this.id,
    required this.name,
    required this.brand,
    required this.isEV,
    this.batteryRangeKm,
    this.batteryPercentage,
    required this.pricePerHour,
    required this.imageUrl,
    required this.seatingCapacity,
    required this.transmission,
  });
}

// Dummy Car Data
const List<CarModel> dummyEVCars = [
  CarModel(
    id: 'ev_1',
    name: 'Model 3 Performance',
    brand: 'Tesla',
    isEV: true,
    batteryRangeKm: 420,
    batteryPercentage: 100,
    pricePerHour: 22.50,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop',
    seatingCapacity: 5,
    transmission: 'Automatic',
  ),
  CarModel(
    id: 'ev_2',
    name: 'Nexon EV Max',
    brand: 'Tata Motors',
    isEV: true,
    batteryRangeKm: 312,
    batteryPercentage: 95,
    pricePerHour: 14.00,
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop',
    seatingCapacity: 5,
    transmission: 'Automatic',
  ),
  CarModel(
    id: 'ev_3',
    name: 'Ioniq 5 EV',
    brand: 'Hyundai',
    isEV: true,
    batteryRangeKm: 380,
    batteryPercentage: 98,
    pricePerHour: 19.00,
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop',
    seatingCapacity: 5,
    transmission: 'Automatic',
  ),
];

const List<CarModel> dummyAllCars = [
  CarModel(
    id: 'car_1',
    name: 'Model 3 Performance',
    brand: 'Tesla EV',
    isEV: true,
    batteryRangeKm: 420,
    batteryPercentage: 100,
    pricePerHour: 22.50,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop',
    seatingCapacity: 5,
    transmission: 'Automatic',
  ),
  CarModel(
    id: 'car_2',
    name: 'Civic Sport',
    brand: 'Honda',
    isEV: false,
    pricePerHour: 11.50,
    imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=600&auto=format&fit=crop',
    seatingCapacity: 5,
    transmission: 'Automatic',
  ),
  CarModel(
    id: 'car_3',
    name: 'CX-5 AWD',
    brand: 'Mazda',
    isEV: false,
    pricePerHour: 15.00,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop',
    seatingCapacity: 5,
    transmission: 'Automatic',
  ),
  CarModel(
    id: 'car_4',
    name: 'Nexon EV Max',
    brand: 'Tata EV',
    isEV: true,
    batteryRangeKm: 312,
    batteryPercentage: 95,
    pricePerHour: 14.00,
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop',
    seatingCapacity: 5,
    transmission: 'Automatic',
  ),
];

// --- Main HomeScreen Widget ---
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  DateTime _selectedDate = DateTime.now();

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 90)),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: const ColorScheme.light(
              primary: RydETheme.primaryGreen,
              onPrimary: Colors.white,
              onSurface: RydETheme.textDark,
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: RydETheme.pureWhite,
      // 1. Custom Clean White App Bar with Branded RichText
      appBar: AppBar(
        backgroundColor: RydETheme.pureWhite,
        elevation: 0,
        scaffoldBackgroundColor: RydETheme.pureWhite,
        titleSpacing: 20,
        title: RichText(
          text: TextSpan(
            children: [
              TextSpan(
                text: 'ryd ',
                style: TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.w800,
                  color: RydETheme.textDark,
                  fontFamily: 'Poppins',
                ),
              ),
              WidgetSpan(
                alignment: PlaceholderAlignment.middle,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: RydETheme.primaryGreen,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Text(
                    'e',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                      fontFamily: 'Poppins',
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            decoration: BoxDecoration(
              color: Colors.grey.shade100,
              shape: BoxShape.circle,
            ),
            child: IconButton(
              icon: const Icon(Icons.notifications_outlined, color: RydETheme.textDark),
              onPressed: () {},
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.symmetric(vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 2. Search & Date Filter Section
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Rent a Vehicle, Drive Clean',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: RydETheme.textGrey,
                          fontWeight: FontWeight.w500,
                        ),
                  ),
                  const SizedBox(height: 14),
                  Row(
                    children: [
                      // Location Search Bar with Subtle Border -> Green Focus
                      Expanded(
                        child: TextField(
                          decoration: InputDecoration(
                            hintText: 'Search city or pick-up hub...',
                            prefixIcon: const Icon(
                              Icons.location_on,
                              color: RydETheme.primaryGreen,
                            ),
                            hintStyle: const TextStyle(
                              color: RydETheme.textGrey,
                              fontSize: 14,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      // Calendar Date Picker Button
                      InkWell(
                        onTap: _pickDate,
                        borderRadius: BorderRadius.circular(12),
                        child: Container(
                          height: 56,
                          width: 56,
                          decoration: BoxDecoration(
                            color: RydETheme.pureWhite,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: RydETheme.subtleGrey, width: 1.5),
                          ),
                          child: const Icon(
                            Icons.calendar_today_rounded,
                            color: RydETheme.primaryGreen,
                            size: 22,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 28),

            // 3. EV Spotlight (Horizontal Carousel)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: const [
                      Icon(Icons.bolt_rounded, color: RydETheme.primaryGreen, size: 24),
                      SizedBox(width: 6),
                      Text(
                        'Go Green: Top EVs',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: RydETheme.textDark,
                        ),
                      ),
                    ],
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text(
                      'View All',
                      style: TextStyle(
                        color: RydETheme.primaryGreen,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              height: 250,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                padding: const EdgeInsets.only(left: 20, right: 8),
                itemCount: dummyEVCars.length,
                itemBuilder: (context, index) {
                  final car = dummyEVCars[index];
                  return _EVSpotlightCard(car: car);
                },
              ),
            ),

            const SizedBox(height: 28),

            // 4. Standard Fleet List (Vertical List)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  Text(
                    'All Vehicles',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: RydETheme.textDark,
                    ),
                  ),
                  Icon(Icons.tune_rounded, color: RydETheme.textGrey, size: 22),
                ],
              ),
            ),
            const SizedBox(height: 14),
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              padding: const EdgeInsets.symmetric(horizontal: 20),
              itemCount: dummyAllCars.length,
              itemBuilder: (context, index) {
                final car = dummyAllCars[index];
                return _StandardVehicleCard(car: car);
              },
            ),
          ],
        ),
      ),
    );
  }
}

// --- Component: EV Spotlight Card (Horizontal Carousel Item) ---
class _EVSpotlightCard extends StatelessWidget {
  final CarModel car;

  const _EVSpotlightCard({required this.car});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 260,
      margin: const EdgeInsets.only(right: 16, bottom: 8),
      decoration: BoxDecoration(
        color: RydETheme.pureWhite,
        borderRadius: BorderRadius.circular(18),
        boxShadow: const [
          BoxShadow(
            color: Color(0x0C000000),
            blurRadius: 12,
            offset: Offset(0, 4),
          ),
        ],
        border: Border.all(color: RydETheme.lightGreen.withOpacity(0.5), width: 1.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image with EV Badge overlay
          Stack(
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(18)),
                child: Image.network(
                  car.imageUrl,
                  height: 130,
                  width: double.infinity,
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stackTrace) {
                    return Container(
                      height: 130,
                      color: Colors.grey.shade200,
                      child: const Center(
                        child: Icon(Icons.directions_car, size: 40, color: RydETheme.primaryGreen),
                      ),
                    );
                  },
                ),
              ),
              Positioned(
                top: 10,
                right: 10,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: RydETheme.primaryGreen,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.bolt, color: Colors.white, size: 14),
                      const SizedBox(width: 2),
                      Text(
                        '${car.batteryPercentage}% • ${car.batteryRangeKm} km',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  car.brand.toUpperCase(),
                  style: const TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: RydETheme.primaryGreen,
                    letterSpacing: 1,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  car.name,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                    color: RydETheme.textDark,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    RichText(
                      text: TextSpan(
                        children: [
                          TextSpan(
                            text: '\$${car.pricePerHour.toStringAsFixed(2)}',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: RydETheme.textDark,
                              fontFamily: 'Poppins',
                            ),
                          ),
                          const TextSpan(
                            text: ' /hr',
                            style: TextStyle(
                              fontSize: 12,
                              color: RydETheme.textGrey,
                              fontFamily: 'Poppins',
                            ),
                          ),
                        ],
                      ),
                    ),
                    const Icon(
                      Icons.arrow_forward_rounded,
                      color: RydETheme.primaryGreen,
                      size: 20,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// --- Component: Standard Vehicle Card (Vertical List Item) ---
class _StandardVehicleCard extends StatelessWidget {
  final CarModel car;

  const _StandardVehicleCard({required this.car});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: RydETheme.pureWhite,
        borderRadius: BorderRadius.circular(16),
        boxShadow: const [
          BoxShadow(
            color: Color(0x08000000),
            blurRadius: 10,
            offset: Offset(0, 2),
          ),
        ],
        border: Border.all(color: RydETheme.subtleGrey, width: 1),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          children: [
            // Vehicle Thumbnail with EV Badge if EV
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Stack(
                children: [
                  Image.network(
                    car.imageUrl,
                    width: 105,
                    height: 90,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        width: 105,
                        height: 90,
                        color: Colors.grey.shade200,
                        child: const Icon(Icons.directions_car, color: RydETheme.primaryGreen),
                      );
                    },
                  ),
                  if (car.isEV)
                    Positioned(
                      top: 6,
                      left: 6,
                      child: Container(
                        padding: const EdgeInsets.all(4),
                        decoration: const BoxDecoration(
                          color: RydETheme.primaryGreen,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.bolt, color: Colors.white, size: 12),
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(width: 14),

            // Vehicle Specs & Details
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    car.name,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: RydETheme.textDark,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Icon(Icons.airline_seat_recline_normal, size: 14, color: RydETheme.textGrey),
                      const SizedBox(width: 2),
                      Text(
                        '${car.seatingCapacity} Seats',
                        style: const TextStyle(fontSize: 12, color: RydETheme.textGrey),
                      ),
                      const SizedBox(width: 10),
                      const Icon(Icons.settings, size: 14, color: RydETheme.textGrey),
                      const SizedBox(width: 2),
                      Text(
                        car.transmission,
                        style: const TextStyle(fontSize: 12, color: RydETheme.textGrey),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      RichText(
                        text: TextSpan(
                          children: [
                            TextSpan(
                              text: '\$${car.pricePerHour.toStringAsFixed(2)}',
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: RydETheme.textDark,
                                fontFamily: 'Poppins',
                              ),
                            ),
                            const TextSpan(
                              text: ' /hr',
                              style: TextStyle(
                                fontSize: 12,
                                color: RydETheme.textGrey,
                                fontFamily: 'Poppins',
                              ),
                            ),
                          ],
                        ),
                      ),
                      // Solid Green "Book Now" Button
                      SizedBox(
                        height: 36,
                        child: ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: RydETheme.primaryGreen,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 14),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                            elevation: 0,
                          ),
                          child: const Text(
                            'Book Now',
                            style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
