import 'package:flutter/material.dart';
import 'theme.dart';

class TripBookingModel {
  final String bookingId;
  final String carName;
  final String carBrand;
  final String imagePath;
  final String pickupLocation;
  final String durationPackage;
  final DateTime pickupDate;
  final double totalAmount;
  final String kycStatus; // 'PENDING', 'APPROVED', 'REJECTED'
  final String paymentId;

  const TripBookingModel({
    required this.bookingId,
    required this.carName,
    required this.carBrand,
    required this.imagePath,
    required this.pickupLocation,
    required this.durationPackage,
    required this.pickupDate,
    required this.totalAmount,
    required this.kycStatus,
    required this.paymentId,
  });
}

class TripsScreen extends StatefulWidget {
  const TripsScreen({super.key});

  @override
  State<TripsScreen> createState() => _TripsScreenState();
}

class _TripsScreenState extends State<TripsScreen> {
  // Sample Customer Bookings List
  final List<TripBookingModel> _bookings = [
    TripBookingModel(
      bookingId: 'SSC-8921',
      carName: 'Grand i10 Nios',
      carBrand: 'Hyundai',
      imagePath: 'assets/images/grand_i10.jpg',
      pickupLocation: 'Kakinada Main Branch',
      durationPackage: '24 Hours',
      pickupDate: DateTime.now().add(const Duration(days: 1)),
      totalAmount: 1800,
      kycStatus: 'PENDING',
      paymentId: 'pay_Orx82194821',
    ),
    TripBookingModel(
      bookingId: 'SSC-7540',
      carName: 'Rapid 1.0 TSI',
      carBrand: 'Skoda',
      imagePath: 'assets/images/skoda.jpg',
      pickupLocation: 'Rajahmundry Station Hub',
      durationPackage: '3 Days Special',
      pickupDate: DateTime.now().subtract(const Duration(days: 12)),
      totalAmount: 6500,
      kycStatus: 'APPROVED',
      paymentId: 'pay_Nkx67382104',
    ),
  ];

  Color _getStatusColor(String status) {
    switch (status) {
      case 'APPROVED':
        return SSCTheme.statusSuccess;
      case 'PENDING':
        return SSCTheme.statusWarning;
      case 'REJECTED':
        return SSCTheme.statusError;
      default:
        return SSCTheme.textMuted;
    }
  }

  IconData _getStatusIcon(String status) {
    switch (status) {
      case 'APPROVED':
        return Icons.verified_user_rounded;
      case 'PENDING':
        return Icons.hourglass_top_rounded;
      case 'REJECTED':
        return Icons.gpp_bad_rounded;
      default:
        return Icons.info_outline;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: SSCTheme.darkBg,
      appBar: AppBar(
        title: const Text('My Bookings & KYC Status'),
      ),
      body: _bookings.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: const [
                  Icon(Icons.car_rental_rounded, size: 64, color: SSCTheme.textSubtle),
                  SizedBox(height: 12),
                  Text(
                    'No active bookings found',
                    style: TextStyle(color: SSCTheme.textMuted, fontSize: 16),
                  ),
                ],
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _bookings.length,
              itemBuilder: (context, index) {
                final booking = _bookings[index];
                final statusColor = _getStatusColor(booking.kycStatus);
                final statusIcon = _getStatusIcon(booking.kycStatus);

                return Card(
                  margin: const EdgeInsets.only(bottom: 16),
                  child: Padding(
                    padding: const EdgeInsets.all(14),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Booking ID & KYC Status Badge Header
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'ID: ${booking.bookingId}',
                              style: const TextStyle(
                                color: SSCTheme.primaryGold,
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: statusColor.withOpacity(0.15),
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: statusColor.withOpacity(0.6)),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(statusIcon, color: statusColor, size: 14),
                                  const SizedBox(width: 4),
                                  Text(
                                    'KYC ${booking.kycStatus}',
                                    style: TextStyle(
                                      color: statusColor,
                                      fontSize: 11,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const Divider(color: SSCTheme.darkBorder, height: 20),

                        // Vehicle Info & Thumbnail
                        Row(
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(10),
                              child: Container(
                                width: 80,
                                height: 60,
                                color: SSCTheme.darkBg,
                                child: Image.asset(
                                  booking.imagePath,
                                  fit: BoxFit.cover,
                                  errorBuilder: (c, e, s) => const Icon(
                                    Icons.directions_car,
                                    color: SSCTheme.primaryGold,
                                    size: 36,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    booking.carName,
                                    style: const TextStyle(
                                      color: SSCTheme.textLight,
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text(
                                    '${booking.carBrand} • ${booking.durationPackage}',
                                    style: const TextStyle(color: SSCTheme.textMuted, fontSize: 12),
                                  ),
                                  const SizedBox(height: 4),
                                  Row(
                                    children: [
                                      const Icon(Icons.location_on, color: SSCTheme.primaryGold, size: 13),
                                      const SizedBox(width: 2),
                                      Expanded(
                                        child: Text(
                                          booking.pickupLocation,
                                          style: const TextStyle(color: SSCTheme.textMuted, fontSize: 11),
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),

                        // Pickup Schedule & Amount Footer
                        Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: SSCTheme.darkBg,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text('Pickup Date', style: TextStyle(color: SSCTheme.textSubtle, fontSize: 10)),
                                  Text(
                                    '${booking.pickupDate.day}/${booking.pickupDate.month}/${booking.pickupDate.year}',
                                    style: const TextStyle(color: SSCTheme.textLight, fontSize: 12, fontWeight: FontWeight.w600),
                                  ),
                                ],
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  const Text('Total Paid (Razorpay)', style: TextStyle(color: SSCTheme.textSubtle, fontSize: 10)),
                                  Text(
                                    '₹${booking.totalAmount.toInt()}',
                                    style: const TextStyle(color: SSCTheme.primaryGold, fontSize: 14, fontWeight: FontWeight.bold),
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
              },
            ),
    );
  }
}
