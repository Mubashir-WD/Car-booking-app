import 'package:flutter/material.dart';
import 'theme.dart';
import 'home_screen.dart';

class BookingScreen extends StatefulWidget {
  final CarModel car;
  final String initialPackageKey;

  const BookingScreen({
    super.key,
    required this.car,
    this.initialPackageKey = '24h',
  });

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  late String _selectedPackage;
  DateTime _pickupDate = DateTime.now().add(const Duration(hours: 2));
  TimeOfDay _pickupTime = const TimeOfDay(hour: 10, minute: 0);

  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _dlNumberController = TextEditingController();

  bool _isDlUploaded = false;
  bool _isAadhaarUploaded = false;
  bool _isProcessingPayment = false;

  final Map<String, Map<String, dynamic>> _packageDetails = {
    '12h': {'label': '12 Hours Package', 'hours': 12},
    '24h': {'label': '24 Hours (1 Day)', 'hours': 24},
    '3d': {'label': '3 Days Weekend Special', 'hours': 72},
    '7d': {'label': '7 Days Weekly Package', 'hours': 168},
  };

  @override
  void initState() {
    super.initState();
    _selectedPackage = widget.initialPackageKey;
  }

  @override
  void dispose() {
    _nameController.dispose();
    _phoneController.dispose();
    _dlNumberController.dispose();
    super.dispose();
  }

  double get _rentAmount => widget.car.getRateForPackage(_selectedPackage);
  double get _totalAmount => _rentAmount; // Zero GST & Zero Deposit per SS Car Rentals specs

  Future<void> _selectPickupDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _pickupDate,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 60)),
      builder: (context, child) {
        return Theme(
          data: ThemeData.dark().copyWith(
            colorScheme: const ColorScheme.dark(
              primary: SSCTheme.primaryGold,
              onPrimary: SSCTheme.darkBg,
              surface: SSCTheme.darkSurface,
              onSurface: SSCTheme.textLight,
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null) {
      setState(() => _pickupDate = picked);
    }
  }

  Future<void> _selectPickupTime() async {
    final picked = await showTimePicker(
      context: context,
      initialTime: _pickupTime,
      builder: (context, child) {
        return Theme(
          data: ThemeData.dark().copyWith(
            colorScheme: const ColorScheme.dark(
              primary: SSCTheme.primaryGold,
              onPrimary: SSCTheme.darkBg,
              surface: SSCTheme.darkSurface,
              onSurface: SSCTheme.textLight,
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null) {
      setState(() => _pickupTime = picked);
    }
  }

  void _handleBookingSubmit() async {
    if (!_formKey.currentState!.validate()) return;
    if (!_isDlUploaded || !_isAadhaarUploaded) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please attach both Driving Licence and Aadhaar photo for KYC verification.'),
          backgroundColor: SSCTheme.statusError,
        ),
      );
      return;
    }

    setState(() => _isProcessingPayment = true);

    // Simulate Razorpay Payment Gateway & Admin Submission
    await Future.delayed(const Duration(seconds: 2));

    if (!mounted) return;
    setState(() => _isProcessingPayment = false);

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) {
        return AlertDialog(
          backgroundColor: SSCTheme.darkSurface,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          icon: const Icon(Icons.check_circle_rounded, color: SSCTheme.statusSuccess, size: 54),
          title: const Text(
            'Booking Submitted!',
            style: TextStyle(color: SSCTheme.textLight, fontWeight: FontWeight.bold),
          ),
          content: Text(
            'Your booking for ${widget.car.name} has been initiated via Razorpay (Payment ID: pay_${DateTime.now().millisecondsSinceEpoch}).\n\nKYC Verification status is PENDING admin approval.',
            textAlign: TextAlign.center,
            style: const TextStyle(color: SSCTheme.textMuted, fontSize: 13),
          ),
          actions: [
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context); // close dialog
                Navigator.pop(context); // back to home / trips
              },
              child: const Text('View My Bookings'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: SSCTheme.darkBg,
      appBar: AppBar(
        title: const Text('Reserve Vehicle'),
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Car Summary Header Card
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: SSCTheme.darkSurface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: SSCTheme.darkBorder),
                ),
                child: Row(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: Container(
                        width: 90,
                        height: 70,
                        color: SSCTheme.darkCard,
                        child: Image.asset(
                          widget.car.primaryImage,
                          fit: BoxFit.cover,
                          errorBuilder: (c, e, s) => const Icon(
                            Icons.directions_car,
                            color: SSCTheme.primaryGold,
                            size: 36,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.car.name,
                            style: const TextStyle(
                              color: SSCTheme.textLight,
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            '${widget.car.brand} • ${widget.car.transmission}',
                            style: const TextStyle(color: SSCTheme.textMuted, fontSize: 12),
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              const Icon(Icons.location_on, color: SSCTheme.primaryGold, size: 14),
                              const SizedBox(width: 2),
                              Expanded(
                                child: Text(
                                  widget.car.location,
                                  style: const TextStyle(color: SSCTheme.primaryGold, fontSize: 11),
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
              ),
              const SizedBox(height: 20),

              // Package Duration Selector
              const Text(
                '1. Select Duration Package',
                style: TextStyle(color: SSCTheme.textLight, fontSize: 15, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
                decoration: BoxDecoration(
                  color: SSCTheme.darkCard,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: SSCTheme.darkBorder),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedPackage,
                    dropdownColor: SSCTheme.darkCard,
                    isExpanded: true,
                    icon: const Icon(Icons.keyboard_arrow_down, color: SSCTheme.primaryGold),
                    items: _packageDetails.entries.map((entry) {
                      final key = entry.key;
                      final details = entry.value;
                      final price = widget.car.getRateForPackage(key);
                      return DropdownMenuItem<String>(
                        value: key,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(details['label'], style: const TextStyle(color: SSCTheme.textLight, fontSize: 14)),
                            Text('₹${price.toInt()}', style: const TextStyle(color: SSCTheme.primaryGold, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      );
                    }).toList(),
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedPackage = val);
                    },
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Pickup Schedule Date & Time Picker
              const Text(
                '2. Pickup Date & Schedule',
                style: TextStyle(color: SSCTheme.textLight, fontSize: 15, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  Expanded(
                    child: InkWell(
                      onTap: _selectPickupDate,
                      borderRadius: BorderRadius.circular(12),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                        decoration: BoxDecoration(
                          color: SSCTheme.darkCard,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: SSCTheme.darkBorder),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.calendar_month, color: SSCTheme.primaryGold, size: 20),
                            const SizedBox(width: 8),
                            Text(
                              '${_pickupDate.day}/${_pickupDate.month}/${_pickupDate.year}',
                              style: const TextStyle(color: SSCTheme.textLight, fontSize: 13),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: InkWell(
                      onTap: _selectPickupTime,
                      borderRadius: BorderRadius.circular(12),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                        decoration: BoxDecoration(
                          color: SSCTheme.darkCard,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: SSCTheme.darkBorder),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.access_time, color: SSCTheme.primaryGold, size: 20),
                            const SizedBox(width: 8),
                            Text(
                              _pickupTime.format(context),
                              style: const TextStyle(color: SSCTheme.textLight, fontSize: 13),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Customer Details Section
              const Text(
                '3. Customer Information',
                style: TextStyle(color: SSCTheme.textLight, fontSize: 15, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: _nameController,
                style: const TextStyle(color: SSCTheme.textLight),
                decoration: const InputDecoration(
                  labelText: 'Full Name (as on Driving Licence)',
                  prefixIcon: Icon(Icons.person_outline, color: SSCTheme.primaryGold),
                ),
                validator: (val) => val == null || val.trim().isEmpty ? 'Please enter full name' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                style: const TextStyle(color: SSCTheme.textLight),
                decoration: const InputDecoration(
                  labelText: '10-Digit Mobile Number',
                  prefixIcon: Icon(Icons.phone_outlined, color: SSCTheme.primaryGold),
                ),
                validator: (val) => val == null || val.trim().length < 10 ? 'Enter valid mobile number' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _dlNumberController,
                style: const TextStyle(color: SSCTheme.textLight),
                decoration: const InputDecoration(
                  labelText: 'Driving Licence Number',
                  prefixIcon: Icon(Icons.badge_outlined, color: SSCTheme.primaryGold),
                ),
                validator: (val) => val == null || val.trim().isEmpty ? 'Enter Driving Licence Number' : null,
              ),
              const SizedBox(height: 20),

              // Mandatory KYC Upload Attachments Simulator
              const Text(
                '4. Mandatory KYC Photo Upload',
                style: TextStyle(color: SSCTheme.textLight, fontSize: 15, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 4),
              const Text(
                'Self-drive rental regulations require clear photos of your Driving Licence & Aadhaar Card.',
                style: TextStyle(color: SSCTheme.textMuted, fontSize: 12),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: InkWell(
                      onTap: () {
                        setState(() => _isDlUploaded = !_isDlUploaded);
                      },
                      borderRadius: BorderRadius.circular(12),
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: _isDlUploaded ? SSCTheme.statusSuccess.withOpacity(0.15) : SSCTheme.darkCard,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: _isDlUploaded ? SSCTheme.statusSuccess : SSCTheme.darkBorder,
                          ),
                        ),
                        child: Column(
                          children: [
                            Icon(
                              _isDlUploaded ? Icons.check_circle : Icons.upload_file_rounded,
                              color: _isDlUploaded ? SSCTheme.statusSuccess : SSCTheme.primaryGold,
                              size: 28,
                            ),
                            const SizedBox(height: 6),
                            Text(
                              _isDlUploaded ? 'DL Attached ✓' : 'Attach DL Photo',
                              style: TextStyle(
                                color: _isDlUploaded ? SSCTheme.statusSuccess : SSCTheme.textLight,
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: InkWell(
                      onTap: () {
                        setState(() => _isAadhaarUploaded = !_isAadhaarUploaded);
                      },
                      borderRadius: BorderRadius.circular(12),
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: _isAadhaarUploaded ? SSCTheme.statusSuccess.withOpacity(0.15) : SSCTheme.darkCard,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: _isAadhaarUploaded ? SSCTheme.statusSuccess : SSCTheme.darkBorder,
                          ),
                        ),
                        child: Column(
                          children: [
                            Icon(
                              _isAadhaarUploaded ? Icons.check_circle : Icons.upload_file_rounded,
                              color: _isAadhaarUploaded ? SSCTheme.statusSuccess : SSCTheme.primaryGold,
                              size: 28,
                            ),
                            const SizedBox(height: 6),
                            Text(
                              _isAadhaarUploaded ? 'Aadhaar Attached ✓' : 'Attach Aadhaar Photo',
                              style: TextStyle(
                                color: _isAadhaarUploaded ? SSCTheme.statusSuccess : SSCTheme.textLight,
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Price Breakdown Summary
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: SSCTheme.darkSurface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: SSCTheme.primaryGold.withOpacity(0.3)),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Rental Rate', style: TextStyle(color: SSCTheme.textMuted, fontSize: 13)),
                        Text('₹${_rentAmount.toInt()}', style: const TextStyle(color: SSCTheme.textLight, fontSize: 13)),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        Text('Security Deposit', style: TextStyle(color: SSCTheme.textMuted, fontSize: 13)),
                        Text('₹0 (No Deposit Required)', style: TextStyle(color: SSCTheme.statusSuccess, fontSize: 12, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        Text('GST Taxes & Charges', style: TextStyle(color: SSCTheme.textMuted, fontSize: 13)),
                        Text('₹0 (Included)', style: TextStyle(color: SSCTheme.textMuted, fontSize: 12)),
                      ],
                    ),
                    const Divider(color: SSCTheme.darkBorder, height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Total Amount Payable', style: TextStyle(color: SSCTheme.textLight, fontSize: 15, fontWeight: FontWeight.bold)),
                        Text(
                          '₹${_totalAmount.toInt()}',
                          style: const TextStyle(color: SSCTheme.primaryGold, fontSize: 22, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Submit & Pay via Razorpay Button
              ElevatedButton(
                onPressed: _isProcessingPayment ? null : _handleBookingSubmit,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size.fromHeight(54),
                  backgroundColor: SSCTheme.primaryGold,
                  foregroundColor: SSCTheme.darkBg,
                ),
                child: _isProcessingPayment
                    ? const CircularProgressIndicator(color: SSCTheme.darkBg)
                    : Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.payment_rounded, size: 20),
                          const SizedBox(width: 8),
                          Text('Pay ₹${_totalAmount.toInt()} via Razorpay'),
                        ],
                      ),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
