import 'package:flutter/material.dart';
import '../../services/firestore_service.dart';
import '../../models/question_model.dart';
import '../../models/theme_model.dart';
import '../../widgets/question_dialog.dart';

class ManageQuestionsScreen extends StatefulWidget {
  const ManageQuestionsScreen({super.key});

  @override
  State<ManageQuestionsScreen> createState() => _ManageQuestionsScreenState();
}

class _ManageQuestionsScreenState extends State<ManageQuestionsScreen> {
  final _firestoreService = FirestoreService();
  List<Question> _questions = [];
  List<QuizTheme> _themes = [];
  bool _isLoading = true;
  String? _filterThemeId;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    try {
      final questions = await _firestoreService.getAllQuestions();
      final themes = await _firestoreService.getThemes();
      setState(() {
        _questions = questions;
        _themes = themes;
        _isLoading = false;
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erreur: $e')),
        );
      }
      setState(() => _isLoading = false);
    }
  }

  List<Question> get _filteredQuestions {
    if (_filterThemeId == null) return _questions;
    return _questions.where((q) => q.themeId == _filterThemeId).toList();
  }

  Future<void> _deleteQuestion(Question question) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmer la suppression'),
        content: const Text('Voulez-vous vraiment supprimer cette question?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Annuler'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Supprimer'),
          ),
        ],
      ),
    );

    if (confirm == true) {
      try {
        await _firestoreService.deleteQuestion(question.id);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Question supprimée')),
          );
        }
        _loadData();
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Erreur: $e')),
          );
        }
      }
    }
  }

  void _showQuestionDialog({Question? question}) {
    if (_themes.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Veuillez d\'abord créer un thème'),
        ),
      );
      return;
    }

    showDialog(
      context: context,
      builder: (context) => QuestionDialog(
        question: question,
        themes: _themes,
        onSave: (newQuestion) async {
          try {
            if (question == null) {
              await _firestoreService.addQuestion(newQuestion);
            } else {
              await _firestoreService.updateQuestion(question.id, newQuestion);
            }
            if (mounted) {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(
                    question == null ? 'Question ajoutée' : 'Question modifiée',
                  ),
                ),
              );
            }
            _loadData();
          } catch (e) {
            if (mounted) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Erreur: $e')),
              );
            }
          }
        },
      ),
    );
  }

  String _getThemeName(String themeId) {
    final theme = _themes.firstWhere(
      (t) => t.id == themeId,
      orElse: () => QuizTheme(
        id: '',
        name: 'Inconnu',
        description: '',
        icon: Icons.quiz,
        color: Colors.grey,
      ),
    );
    return theme.name;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gérer les questions'),
        backgroundColor: Colors.green,
        actions: [
          if (_themes.isNotEmpty)
            PopupMenuButton<String>(
              icon: const Icon(Icons.filter_list),
              onSelected: (value) {
                setState(() {
                  _filterThemeId = value == 'all' ? null : value;
                });
              },
              itemBuilder: (context) => [
                const PopupMenuItem(
                  value: 'all',
                  child: Text('Tous les thèmes'),
                ),
                ..._themes.map(
                  (theme) => PopupMenuItem(
                    value: theme.id,
                    child: Text(theme.name),
                  ),
                ),
              ],
            ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showQuestionDialog(),
        icon: const Icon(Icons.add),
        label: const Text('Nouvelle question'),
        backgroundColor: Colors.green,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _filteredQuestions.isEmpty
              ? const Center(
                  child: Text('Aucune question. Créez-en une!'),
                )
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _filteredQuestions.length,
                  itemBuilder: (context, index) {
                    final question = _filteredQuestions[index];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 12),
                      child: ExpansionTile(
                        title: Text(
                          question.text,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        subtitle: Text(_getThemeName(question.themeId)),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.edit),
                              onPressed: () =>
                                  _showQuestionDialog(question: question),
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete, color: Colors.red),
                              onPressed: () => _deleteQuestion(question),
                            ),
                          ],
                        ),
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Options:',
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 8),
                                ...question.options.asMap().entries.map(
                                      (entry) => Padding(
                                        padding:
                                            const EdgeInsets.only(bottom: 4),
                                        child: Row(
                                          children: [
                                            Icon(
                                              entry.key == question.answerIndex
                                                  ? Icons.check_circle
                                                  : Icons
                                                      .radio_button_unchecked,
                                              color: entry.key ==
                                                      question.answerIndex
                                                  ? Colors.green
                                                  : Colors.grey,
                                            ),
                                            const SizedBox(width: 8),
                                            Expanded(
                                              child: Text(
                                                '${String.fromCharCode(65 + entry.key)}. ${entry.value}',
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
    );
  }
}
