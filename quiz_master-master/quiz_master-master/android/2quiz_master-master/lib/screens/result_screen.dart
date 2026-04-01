import 'package:flutter/material.dart';
import '../models/theme_model.dart';
import 'home_screen.dart';
import 'quiz_settings_screen.dart';

class ResultScreen extends StatelessWidget {
  final int score;
  final int totalQuestions;
  final QuizTheme theme;

  const ResultScreen({
    super.key,
    required this.score,
    required this.totalQuestions,
    required this.theme,
  });

  String _getMessage() {
    final percentage = (score / totalQuestions) * 100;
    if (percentage <= 40) {
      return 'Tu peux mieux faire!';
    } else if (percentage <= 70) {
      return 'Bien joué!';
    } else {
      return 'Excellent!';
    }
  }

  IconData _getIcon() {
    final percentage = (score / totalQuestions) * 100;
    if (percentage <= 40) {
      return Icons.sentiment_dissatisfied;
    } else if (percentage <= 70) {
      return Icons.sentiment_satisfied;
    } else {
      return Icons.sentiment_very_satisfied;
    }
  }

  Color _getColor() {
    final percentage = (score / totalQuestions) * 100;
    if (percentage <= 40) {
      return Colors.red;
    } else if (percentage <= 70) {
      return Colors.orange;
    } else {
      return Colors.green;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  _getIcon(),
                  size: 100,
                  color: _getColor(),
                ),
                const SizedBox(height: 24),
                Text(
                  _getMessage(),
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: _getColor(),
                      ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 32),
                Card(
                  elevation: 8,
                  child: Padding(
                    padding: const EdgeInsets.all(32.0),
                    child: Column(
                      children: [
                        Text(
                          'Ton score',
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          '$score/$totalQuestions',
                          style: Theme.of(context)
                              .textTheme
                              .displayLarge
                              ?.copyWith(
                                fontWeight: FontWeight.bold,
                                color: theme.color,
                              ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '${((score / totalQuestions) * 100).toStringAsFixed(0)}%',
                          style: Theme.of(context).textTheme.headlineSmall,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 48),
                ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) => QuizSettingsScreen(theme: theme),
                      ),
                    );
                  },
                  icon: const Icon(Icons.refresh),
                  label: const Text('Rejouer'),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 32,
                      vertical: 16,
                    ),
                    backgroundColor: theme.color,
                  ),
                ),
                const SizedBox(height: 16),
                OutlinedButton.icon(
                  onPressed: () {
                    Navigator.pushAndRemoveUntil(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const HomeScreen()),
                      (route) => false,
                    );
                  },
                  icon: const Icon(Icons.home),
                  label: const Text('Retour aux thèmes'),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 32,
                      vertical: 16,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
