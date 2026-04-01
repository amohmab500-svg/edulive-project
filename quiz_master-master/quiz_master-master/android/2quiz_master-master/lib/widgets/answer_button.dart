import 'package:flutter/material.dart';

class AnswerButton extends StatelessWidget {
  final String answer;
  final int index;
  final bool isSelected;
  final bool isCorrect;
  final bool isAnswered;
  final VoidCallback onTap;
  final Color color;

  const AnswerButton({
    super.key,
    required this.answer,
    required this.index,
    required this.isSelected,
    required this.isCorrect,
    required this.isAnswered,
    required this.onTap,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    Color buttonColor = Colors.white;
    Color borderColor = color;
    IconData? icon;

    if (isAnswered) {
      if (isSelected) {
        if (isCorrect) {
          buttonColor = Colors.green;
          borderColor = Colors.green;
          icon = Icons.check_circle;
        } else {
          buttonColor = Colors.red;
          borderColor = Colors.red;
          icon = Icons.cancel;
        }
      } else if (isCorrect) {
        buttonColor = Colors.green.withOpacity(0.3);
        borderColor = Colors.green;
        icon = Icons.check_circle;
      }
    }

    return Material(
      color: buttonColor,
      borderRadius: BorderRadius.circular(12),
      elevation: isAnswered ? 0 : 2,
      child: InkWell(
        onTap: isAnswered ? null : onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            border: Border.all(color: borderColor, width: 2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: isAnswered && (isSelected || isCorrect)
                      ? Colors.white
                      : color,
                ),
                child: Center(
                  child: Text(
                    String.fromCharCode(65 + index), // A, B, C, D
                    style: TextStyle(
                      color: isAnswered && (isSelected || isCorrect)
                          ? buttonColor
                          : Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  answer,
                  style: TextStyle(
                    fontSize: 16,
                    color: isAnswered && (isSelected || isCorrect)
                        ? Colors.white
                        : Colors.black87,
                  ),
                ),
              ),
              if (icon != null)
                Icon(
                  icon,
                  color: Colors.white,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
