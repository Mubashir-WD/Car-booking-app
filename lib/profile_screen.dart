import 'package:flutter/material.dart';
import 'theme.dart';
import 'admin_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: SSCTheme.darkBg,
      appBar: AppBar(
        title: const Text('Account & Support'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // User Header Profile Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: SSCTheme.darkSurface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: SSCTheme.primaryGold.withOpacity(0.3)),
              ),
              child: Row(
                children: [
                  Container(
                    width: 56,
                    height: 56,
                    decoration: BoxDecoration(
                      color: SSCTheme.darkCard,
                      shape: BoxShape.circle,
                      border: Border.all(color: SSCTheme.primaryGold, width: 2),
                    ),
                    child: const Icon(Icons.person, color: SSCTheme.primaryGold, size: 30),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Mubashir',
                          style: TextStyle(
                            color: SSCTheme.textLight,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 2),
                        Text(
                          '+91 98765 43210 • Verified Customer',
                          style: TextStyle(color: SSCTheme.textMuted, fontSize: 12),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Quick Support & Actions Section
            Card(
              child: Column(
                children: [
                  ListTile(
                    leading: const Icon(Icons.chat_bubble_outline, color: SSCTheme.primaryGold),
                    title: const Text('WhatsApp Customer Support', style: TextStyle(color: SSCTheme.textLight, fontSize: 14)),
                    subtitle: const Text('+91 98663 55123 (Instant Assistance)', style: TextStyle(color: SSCTheme.textMuted, fontSize: 12)),
                    trailing: const Icon(Icons.open_in_new, color: SSCTheme.primaryGold, size: 18),
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Opening WhatsApp Support (+91 98663 55123)...'),
                          backgroundColor: SSCTheme.darkCard,
                        ),
                      );
                    },
                  ),
                  const Divider(color: SSCTheme.darkBorder, height: 1),
                  ListTile(
                    leading: const Icon(Icons.verified_outlined, color: SSCTheme.statusSuccess),
                    title: const Text('KYC Document Records', style: TextStyle(color: SSCTheme.textLight, fontSize: 14)),
                    subtitle: const Text('Driving Licence & Aadhaar Uploaded', style: TextStyle(color: SSCTheme.textMuted, fontSize: 12)),
                    trailing: const Icon(Icons.check_circle, color: SSCTheme.statusSuccess, size: 18),
                  ),
                  const Divider(color: SSCTheme.darkBorder, height: 1),
                  ListTile(
                    leading: const Icon(Icons.shield_outlined, color: SSCTheme.primaryGold),
                    title: const Text('Self-Drive Rental Guidelines', style: TextStyle(color: SSCTheme.textLight, fontSize: 14)),
                    subtitle: const Text('Speed limit 80km/h, Fuel policy & Fastag', style: TextStyle(color: SSCTheme.textMuted, fontSize: 12)),
                    trailing: const Icon(Icons.chevron_right, color: SSCTheme.textSubtle),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Admin Portal Access Switch
            Card(
              color: SSCTheme.darkSurface,
              child: ListTile(
                leading: const Icon(Icons.admin_panel_settings_outlined, color: SSCTheme.primaryGold),
                title: const Text(
                  'Admin Verification Portal',
                  style: TextStyle(color: SSCTheme.primaryGold, fontSize: 14, fontWeight: FontWeight.bold),
                ),
                subtitle: const Text('Review customer KYC approvals queue', style: TextStyle(color: SSCTheme.textMuted, fontSize: 12)),
                trailing: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: SSCTheme.darkCard,
                    foregroundColor: SSCTheme.primaryGold,
                    side: const BorderSide(color: SSCTheme.primaryGold),
                    minimumSize: const Size(80, 36),
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const AdminScreen()),
                    );
                  },
                  child: const Text('Open Queue'),
                ),
              ),
            ),
            const SizedBox(height: 24),

            // App Footer Branding Info
            const Text(
              'SS Car Rentals • Self Drive Cars',
              style: TextStyle(color: SSCTheme.textSubtle, fontSize: 12, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 4),
            const Text(
              'Kakinada & Rajahmundry • Version 2.4.0',
              style: TextStyle(color: SSCTheme.textSubtle, fontSize: 11),
            ),
          ],
        ),
      ),
    );
  }
}
