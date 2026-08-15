import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// SS Car Rentals - Luxury Gold & Dark Theme System
class SSCTheme {
  // Brand Color Palette: Gold Luxury & Deep Premium Dark
  static const Color primaryGold = Color(0xFFD4AF37); // Luxury Gold Accent
  static const Color accentGold = Color(0xFFF3E5AB);  // Soft Gold Light Highlight
  static const Color darkBg = Color(0xFF0D0D11);      // Deep Main Background
  static const Color darkSurface = Color(0xFF16161F); // Surface Container
  static const Color darkCard = Color(0xFF1C1C28);    // Card Surface
  static const Color darkBorder = Color(0xFF2D2D3D);  // Subtle Border
  
  // Status Colors
  static const Color statusSuccess = Color(0xFF10B981); // Emerald Green Approved
  static const Color statusWarning = Color(0xFFF59E0B); // Amber Pending
  static const Color statusError = Color(0xFFEF4444);   // Crimson Rejected

  // Text Shades
  static const Color textLight = Color(0xFFF8FAFC);   // Primary Heading Text
  static const Color textMuted = Color(0xFF94A3B8);   // Secondary Subtitle Text
  static const Color textSubtle = Color(0xFF64748B);  // Muted Details Text

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: darkBg,

      colorScheme: const ColorScheme.dark(
        brightness: Brightness.dark,
        primary: primaryGold,
        onPrimary: darkBg,
        secondary: accentGold,
        onSecondary: darkBg,
        error: statusError,
        onError: textLight,
        surface: darkSurface,
        onSurface: textLight,
      ),

      // Typography using Google Fonts Poppins
      textTheme: GoogleFonts.poppinsTextTheme(ThemeData.dark().textTheme).copyWith(
        displayLarge: GoogleFonts.poppins(
          fontSize: 30,
          fontWeight: FontWeight.bold,
          color: textLight,
        ),
        headlineMedium: GoogleFonts.poppins(
          fontSize: 22,
          fontWeight: FontWeight.bold,
          color: textLight,
        ),
        titleLarge: GoogleFonts.poppins(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: textLight,
        ),
        bodyLarge: GoogleFonts.poppins(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          color: textLight,
        ),
        bodyMedium: GoogleFonts.poppins(
          fontSize: 14,
          fontWeight: FontWeight.normal,
          color: textMuted,
        ),
      ),

      // App Bar Theme
      appBarTheme: AppBarTheme(
        backgroundColor: darkSurface,
        elevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(color: primaryGold),
        titleTextStyle: GoogleFonts.poppins(
          color: textLight,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),

      // Elevated Button Theme (Luxury Gold Button with Dark Text)
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryGold,
          foregroundColor: darkBg,
          elevation: 4,
          shadowColor: primaryGold.withOpacity(0.3),
          minimumSize: const Size.fromHeight(52),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          textStyle: GoogleFonts.poppins(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),

      // Outlined Button Theme
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primaryGold,
          side: const BorderSide(color: primaryGold, width: 1.5),
          minimumSize: const Size.fromHeight(50),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          textStyle: GoogleFonts.poppins(
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      // Input Decoration Theme
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: darkCard,
        contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
        hintStyle: GoogleFonts.poppins(color: textSubtle, fontSize: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: darkBorder, width: 1.5),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: darkBorder, width: 1.5),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: primaryGold, width: 2.0),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: statusError, width: 1.5),
        ),
      ),

      // Card Theme
      cardTheme: CardTheme(
        color: darkCard,
        elevation: 2,
        shadowColor: Colors.black45,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: darkBorder, width: 1),
        ),
      ),

      // Bottom Navigation Bar Theme
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: darkSurface,
        selectedItemColor: primaryGold,
        unselectedItemColor: textSubtle,
        elevation: 12,
        type: BottomNavigationBarType.fixed,
      ),
    );
  }
}

/// Backward compatibility alias
class RydETheme extends SSCTheme {
  static const Color primaryGreen = SSCTheme.primaryGold;
  static const Color pureWhite = SSCTheme.darkSurface;
  static const Color textDark = SSCTheme.textLight;
  static const Color textGrey = SSCTheme.textMuted;
  static const Color subtleGrey = SSCTheme.darkBorder;
  static ThemeData get lightTheme => SSCTheme.darkTheme;
}
