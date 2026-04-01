import 'package:flutter/material.dart';

class QuizTheme {
  final String id;
  final String name;
  final String description;
  final IconData icon;
  final Color color;

  QuizTheme({
    required this.id,
    required this.name,
    required this.description,
    required this.icon,
    required this.color,
  });

  factory QuizTheme.fromFirestore(Map<String, dynamic> data, String id) {
    return QuizTheme(
      id: id,
      name: data['name'] ?? '',
      description: data['description'] ?? '',
      icon: _getIconFromString(data['icon']),
      color: _getColorFromString(data['color']),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'name': name,
      'description': description,
      'icon': _getStringFromIcon(icon),
      'color': _getStringFromColor(color),
    };
  }

  static IconData _getIconFromString(String? iconName) {
    switch (iconName) {
      case 'quiz':
        return Icons.quiz;
      case 'lightbulb':
        return Icons.lightbulb;
      case 'science':
        return Icons.science;
      case 'sports_soccer':
        return Icons.sports_soccer;
      case 'book':
        return Icons.book;
      case 'calculate':
        return Icons.calculate;
      case 'language':
        return Icons.language;
      case 'history':
        return Icons.history;
      case 'music_note':
        return Icons.music_note;
      case 'palette':
        return Icons.palette;
      default:
        return Icons.quiz;
    }
  }

  static String _getStringFromIcon(IconData icon) {
    if (icon == Icons.quiz) return 'quiz';
    if (icon == Icons.lightbulb) return 'lightbulb';
    if (icon == Icons.science) return 'science';
    if (icon == Icons.sports_soccer) return 'sports_soccer';
    if (icon == Icons.book) return 'book';
    if (icon == Icons.calculate) return 'calculate';
    if (icon == Icons.language) return 'language';
    if (icon == Icons.history) return 'history';
    if (icon == Icons.music_note) return 'music_note';
    if (icon == Icons.palette) return 'palette';
    return 'quiz';
  }

  static Color _getColorFromString(String? colorHex) {
    if (colorHex == null || colorHex.isEmpty) return Colors.blue;
    return Color(int.parse(colorHex.replaceFirst('#', '0xFF')));
  }

  static String _getStringFromColor(Color color) {
    return '#${color.value.toRadixString(16).substring(2).toUpperCase()}';
  }
}
