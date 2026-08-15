import 'package:flutter/material.dart';
import 'theme.dart';

class AdminQueueItem {
  final String bookingId;
  final String customerName;
  final String customerPhone;
  final String dlNumber;
  final String carName;
  final String pickupLocation;
  final String package;
  final double amount;
  String status; // 'PENDING', 'APPROVED', 'REJECTED'
  final DateTime submittedAt;

  AdminQueueItem({
    required this.bookingId,
    required this.customerName,
    required this.customerPhone,
    required this.dlNumber,
    required this.carName,
    required this.pickupLocation,
    required this.package,
    required this.amount,
    required this.status,
    required this.submittedAt,
  });
}

class AdminScreen extends StatefulWidget {
  const AdminScreen({super.key});

  @override
  State<AdminScreen> createState() => _AdminScreenState();
}

class _AdminScreenState extends State<AdminScreen> {
  final List<AdminQueueItem> _queue = [
    AdminQueueItem(
      bookingId: 'SSC-8921',
      customerName: 'K. Rajesh Varma',
      customerPhone: '+91 98480 12345',
      dlNumber: 'AP392021004821',
      carName: 'Grand i10 Nios',
      pickupLocation: 'Kakinada Main Branch',
      package: '24 Hours',
      amount: 1800,
      status: 'PENDING',
      submittedAt: DateTime.now().subtract(const Duration(minutes: 45)),
    ),
    AdminQueueItem(
      bookingId: 'SSC-8920',
      customerName: 'S. Anjaneyulu',
      customerPhone: '+91 99591 67890',
      dlNumber: 'AP052019003112',
      carName: 'Kwid Climber AMT',
      pickupLocation: 'Rajahmundry Station Hub',
      package: '12 Hours',
      amount: 800,
      status: 'PENDING',
      submittedAt: DateTime.now().subtract(const Duration(hours: 2)),
    ),
    AdminQueueItem(
      bookingId: 'SSC-7540',
      customerName: 'M. Suresh Kumar',
      customerPhone: '+91 94401 55432',
      dlNumber: 'AP372018009876',
      carName: 'Rapid 1.0 TSI',
      pickupLocation: 'Rajahmundry Station Hub',
      package: '3 Days Special',
      amount: 6500,
      status: 'APPROVED',
      submittedAt: DateTime.now().subtract(const Duration(days: 1)),
    ),
  ];

  void _updateStatus(AdminQueueItem item, String newStatus) {
    setState(() {
      item.status = newStatus;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Booking ${item.bookingId} status updated to $newStatus'),
        backgroundColor: newStatus == 'APPROVED' ? SSCTheme.statusSuccess : SSCTheme.statusError,
      ),
    );
  }

  void _showDocumentViewer(BuildContext context, AdminQueueItem item) {
    showDialog(
      context: context,
      builder: (context) {
        return Dialog(
          backgroundColor: SSCTheme.darkSurface,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
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
                      'KYC Docs - ${item.customerName}',
                      style: const TextStyle(color: SSCTheme.textLight, fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: SSCTheme.primaryGold),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Text('DL No: ${item.dlNumber}', style: const TextStyle(color: SSCTheme.primaryGold, fontSize: 13)),
                const SizedBox(height: 12),
                
                // Document Preview Simulators
                const Text('1. Driving Licence Photo:', style: TextStyle(color: SSCTheme.textMuted, fontSize: 12)),
                const SizedBox(height: 4),
                Container(
                  height: 120,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: SSCTheme.darkCard,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: SSCTheme.darkBorder),
                  ),
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.badge_rounded, color: SSCTheme.primaryGold, size: 36),
                        SizedBox(height: 4),
                        Text('DL_SCAN_VERIFIED.jpg', style: TextStyle(color: SSCTheme.textMuted, fontSize: 11)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                const Text('2. Aadhaar Card Photo:', style: TextStyle(color: SSCTheme.textMuted, fontSize: 12)),
                const SizedBox(height: 4),
                Container(
                  height: 120,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: SSCTheme.darkCard,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: SSCTheme.darkBorder),
                  ),
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.card_membership_rounded, color: SSCTheme.primaryGold, size: 36),
                        SizedBox(height: 4),
                        Text('AADHAAR_SCAN_VERIFIED.jpg', style: TextStyle(color: SSCTheme.textMuted, fontSize: 11)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Close Preview', style: TextStyle(color: SSCTheme.textMuted)),
                    ),
                  ],
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
    final pendingItems = _queue.where((q) => q.status == 'PENDING').toList();

    return Scaffold(
      backgroundColor: SSCTheme.darkBg,
      appBar: AppBar(
        title: const Text('Admin Verification Queue'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Queue Stats Bar
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: SSCTheme.darkSurface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: SSCTheme.primaryGold.withOpacity(0.3)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Column(
                    children: [
                      Text('${pendingItems.length}', style: const TextStyle(color: SSCTheme.statusWarning, fontSize: 20, fontWeight: FontWeight.bold)),
                      const Text('Pending Queue', style: TextStyle(color: SSCTheme.textMuted, fontSize: 11)),
                    ],
                  ),
                  Container(width: 1, height: 30, color: SSCTheme.darkBorder),
                  Column(
                    children: [
                      Text('${_queue.where((q) => q.status == 'APPROVED').length}', style: const TextStyle(color: SSCTheme.statusSuccess, fontSize: 20, fontWeight: FontWeight.bold)),
                      const Text('Approved Today', style: TextStyle(color: SSCTheme.textMuted, fontSize: 11)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            const Text(
              'KYC Documents Queue',
              style: TextStyle(color: SSCTheme.textLight, fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),

            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _queue.length,
              itemBuilder: (context, index) {
                final item = _queue[index];
                final isPending = item.status == 'PENDING';

                return Card(
                  margin: const EdgeInsets.only(bottom: 14),
                  child: Padding(
                    padding: const EdgeInsets.all(14),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              item.customerName,
                              style: const TextStyle(color: SSCTheme.textLight, fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: item.status == 'APPROVED'
                                    ? SSCTheme.statusSuccess.withOpacity(0.2)
                                    : item.status == 'REJECTED'
                                        ? SSCTheme.statusError.withOpacity(0.2)
                                        : SSCTheme.statusWarning.withOpacity(0.2),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text(
                                item.status,
                                style: TextStyle(
                                  color: item.status == 'APPROVED'
                                      ? SSCTheme.statusSuccess
                                      : item.status == 'REJECTED'
                                          ? SSCTheme.statusError
                                          : SSCTheme.statusWarning,
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Phone: ${item.customerPhone} • DL: ${item.dlNumber}',
                          style: const TextStyle(color: SSCTheme.textMuted, fontSize: 12),
                        ),
                        Text(
                          'Vehicle: ${item.carName} (${item.package}) • Paid: ₹${item.amount.toInt()}',
                          style: const TextStyle(color: SSCTheme.primaryGold, fontSize: 12, fontWeight: FontWeight.w600),
                        ),
                        const Divider(color: SSCTheme.darkBorder, height: 20),

                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            OutlinedButton.icon(
                              onPressed: () => _showDocumentViewer(context, item),
                              style: OutlinedButton.styleFrom(
                                minimumSize: const Size(120, 36),
                                side: const BorderSide(color: SSCTheme.darkBorder),
                              ),
                              icon: const Icon(Icons.description_outlined, size: 16, color: SSCTheme.textLight),
                              label: const Text('View KYC Docs', style: TextStyle(color: SSCTheme.textLight, fontSize: 12)),
                            ),
                            if (isPending)
                              Row(
                                children: [
                                  IconButton(
                                    icon: const Icon(Icons.cancel_outlined, color: SSCTheme.statusError),
                                    onPressed: () => _updateStatus(item, 'REJECTED'),
                                  ),
                                  const SizedBox(width: 4),
                                  ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: SSCTheme.statusSuccess,
                                      foregroundColor: Colors.white,
                                      minimumSize: const Size(90, 36),
                                    ),
                                    onPressed: () => _updateStatus(item, 'APPROVED'),
                                    child: const Text('Approve', style: TextStyle(fontSize: 12)),
                                  ),
                                ],
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
