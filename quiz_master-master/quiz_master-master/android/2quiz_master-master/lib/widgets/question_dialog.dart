import 'package:flutter/material.dart';
import '../models/question_model.dart';
import '../models/theme_model.dart';

class QuestionDialog extends StatefulWidget {
  final Question? question;
  final List<QuizTheme> themes;
  final Function(Question) onSave;

  const QuestionDialog({
    super.key,
    this.question,
    required this.themes,
    required this.onSave,
  });

  @override
  State<QuestionDialog> createState() => _QuestionDialogState();
}

class _QuestionDialogState extends State<QuestionDialog> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _questionController;
  late List<TextEditingController> _optionControllers;
  late String _selectedThemeId;
  int _correctAnswerIndex = 0;

  @override
  void initState() {
    super.initState();
    _questionController =
        TextEditingController(text: widget.question?.text ?? '');
    _selectedThemeId = widget.question?.themeId ?? widget.themes.first.id;
    _correctAnswerIndex = widget.question?.answerIndex ?? 0;

    if (widget.question != null) {
      _optionControllers = widget.question!.options
          .map((opt) => TextEditingController(text: opt))
          .toList();
    } else {
      _optionControllers = List.generate(4, (_) => TextEditingController());
    }
  }

  @override
  void dispose() {
    _questionController.dispose();
    for (var controller in _optionControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
        widget.question == null ? 'Nouvelle question' : 'Modifier la question',
      ),
      content: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              DropdownButtonFormField<String>(
                value: _selectedThemeId,
                decoration: const InputDecoration(
                  labelText: 'Thème',
                  border: OutlineInputBorder(),
                ),
                items: widget.themes.map((theme) {
                  return DropdownMenuItem(
                    value: theme.id,
                    child: Text(theme.name),
                  );
                }).toList(),
                onChanged: (value) {
                  if (value != null) {
                    setState(() => _selectedThemeId = value);
                  }
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _questionController,
                decoration: const InputDecoration(
                  labelText: 'Question',
                  border: OutlineInputBorder(),
                ),
                maxLines: 3,
                validator: (value) => value?.isEmpty == true ? 'Requis' : null,
              ),
              const SizedBox(height: 16),
              const Text(
                'Cocher la bonne réponse :',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              ...List.generate(4, (index) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    children: [
                      Radio<int>(
                        value: index,
                        groupValue: _correctAnswerIndex,
                        onChanged: (value) {
                          if (value != null) {
                            setState(() => _correctAnswerIndex = value);
                          }
                        },
                      ),
                      Expanded(
                        child: TextFormField(
                          controller: _optionControllers[index],
                          decoration: InputDecoration(
                            labelText:
                                'Option ${String.fromCharCode(65 + index)}',
                            border: const OutlineInputBorder(),
                          ),
                          validator: (value) =>
                              value?.isEmpty == true ? 'Requis' : null,
                        ),
                      ),
                    ],
                  ),
                );
              }),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Annuler'),
        ),
        ElevatedButton(
          onPressed: () {
            if (_formKey.currentState!.validate()) {
              widget.onSave(
                Question(
                  id: widget.question?.id ?? '',
                  themeId: _selectedThemeId,
                  text: _questionController.text,
                  options: _optionControllers.map((c) => c.text).toList(),
                  answerIndex: _correctAnswerIndex,
                ),
              );
            }
          },
          child: const Text('Enregistrer'),
        ),
      ],
    );
  }
}
