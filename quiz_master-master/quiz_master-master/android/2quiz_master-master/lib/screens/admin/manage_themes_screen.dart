import 'package:flutter/material.dart';
import '../../services/firestore_service.dart';
import '../../models/theme_model.dart';
import '../../widgets/theme_dialog.dart';

class ManageThemesScreen extends StatefulWidget {
  const ManageThemesScreen({super.key});

  @override
  State<ManageThemesScreen> createState() => _ManageThemesScreenState();
}

class _ManageThemesScreenState extends State<ManageThemesScreen> {
  final _firestoreService = FirestoreService();
  List<QuizTheme> _themes = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadThemes();
  }

  Future<void> _loadThemes() async {
    setState(() => _isLoading = true);
    try {
      final themes = await _firestoreService.getThemes();
      setState(() {
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

  Future<void> _deleteTheme(QuizTheme theme) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmer la suppression'),
        content: Text(
          'Voulez-vous vraiment supprimer le thème "${theme.name}" et toutes ses questions?',
        ),
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
        await _firestoreService.deleteTheme(theme.id);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Thème supprimé')),
          );
        }
        _loadThemes();
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Erreur: $e')),
          );
        }
      }
    }
  }

  void _showThemeDialog({QuizTheme? theme}) {
    showDialog(
      context: context,
      builder: (context) => ThemeDialog(
        theme: theme,
        onSave: (newTheme) async {
          try {
            if (theme == null) {
              await _firestoreService.addTheme(newTheme);
            } else {
              await _firestoreService.updateTheme(theme.id, newTheme);
            }
            if (mounted) {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(
                    theme == null ? 'Thème ajouté' : 'Thème modifié',
                  ),
                ),
              );
            }
            _loadThemes();
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gérer les thèmes'),
        backgroundColor: Colors.blue,
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showThemeDialog(),
        icon: const Icon(Icons.add),
        label: const Text('Nouveau thème'),
        backgroundColor: Colors.blue,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _themes.isEmpty
              ? const Center(
                  child: Text('Aucun thème. Créez-en un!'),
                )
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _themes.length,
                  itemBuilder: (context, index) {
                    final theme = _themes[index];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 12),
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor: theme.color,
                          child: Icon(theme.icon, color: Colors.white),
                        ),
                        title: Text(theme.name),
                        subtitle: Text(theme.description),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.edit),
                              onPressed: () => _showThemeDialog(theme: theme),
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete, color: Colors.red),
                              onPressed: () => _deleteTheme(theme),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
    );
  }
}
