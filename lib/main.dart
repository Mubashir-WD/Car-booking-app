import 'package:flutter/material.dart';
import 'theme.dart';
import 'main_layout.dart';

void main() {
  runApp(const SSCarRentalsApp());
}

class SSCarRentalsApp extends StatelessWidget {
  const SSCarRentalsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SS Car Rentals',
      debugShowCheckedModeBanner: false,
      theme: SSCTheme.darkTheme,
      home: const MainLayout(),
    );
  }
}
