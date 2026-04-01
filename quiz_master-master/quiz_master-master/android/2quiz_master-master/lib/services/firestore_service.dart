import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/question_model.dart';
import '../models/theme_model.dart';
import '../models/user_model.dart';

class FirestoreService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // Get all themes
  Future<List<QuizTheme>> getThemes() async {
    try {
      QuerySnapshot snapshot = await _firestore.collection('themes').get();
      return snapshot.docs
          .map((doc) => QuizTheme.fromFirestore(
              doc.data() as Map<String, dynamic>, doc.id))
          .toList();
    } catch (e) {
      throw 'Erreur lors du chargement des thèmes: $e';
    }
  }

  // Get questions by theme
  Future<List<Question>> getQuestionsByTheme(String themeId) async {
    try {
      QuerySnapshot snapshot = await _firestore
          .collection('questions')
          .where('themeId', isEqualTo: themeId)
          .get();
      return snapshot.docs
          .map((doc) => Question.fromFirestore(
              doc.data() as Map<String, dynamic>, doc.id))
          .toList();
    } catch (e) {
      throw 'Erreur lors du chargement des questions: $e';
    }
  }

  // Get user data
  Future<UserModel?> getUserData(String uid) async {
    try {
      DocumentSnapshot doc =
          await _firestore.collection('users').doc(uid).get();
      if (doc.exists) {
        return UserModel.fromFirestore(
            doc.data() as Map<String, dynamic>, doc.id);
      }
      return null;
    } catch (e) {
      throw 'Erreur lors du chargement des données utilisateur: $e';
    }
  }

  // Update best score
  Future<void> updateBestScore(String uid, String themeId, int score) async {
    try {
      DocumentReference userDoc = _firestore.collection('users').doc(uid);
      DocumentSnapshot snapshot = await userDoc.get();

      if (snapshot.exists) {
        Map<String, dynamic> data = snapshot.data() as Map<String, dynamic>;
        Map<String, int> bestScores =
            Map<String, int>.from(data['bestScores'] ?? {});

        if (!bestScores.containsKey(themeId) || score > bestScores[themeId]!) {
          bestScores[themeId] = score;
          await userDoc.update({'bestScores': bestScores});
        }
      }
    } catch (e) {
      throw 'Erreur lors de la mise à jour du score: $e';
    }
  }

  // Admin: Add theme
  Future<void> addTheme(QuizTheme theme) async {
    try {
      await _firestore.collection('themes').add(theme.toFirestore());
    } catch (e) {
      throw 'Erreur lors de l\'ajout du thème: $e';
    }
  }

  // Admin: Update theme
  Future<void> updateTheme(String themeId, QuizTheme theme) async {
    try {
      await _firestore
          .collection('themes')
          .doc(themeId)
          .update(theme.toFirestore());
    } catch (e) {
      throw 'Erreur lors de la mise à jour du thème: $e';
    }
  }

  // Admin: Delete theme
  Future<void> deleteTheme(String themeId) async {
    try {
      // Delete theme
      await _firestore.collection('themes').doc(themeId).delete();

      // Delete all questions associated with this theme
      QuerySnapshot questionsSnapshot = await _firestore
          .collection('questions')
          .where('themeId', isEqualTo: themeId)
          .get();

      for (var doc in questionsSnapshot.docs) {
        await doc.reference.delete();
      }
    } catch (e) {
      throw 'Erreur lors de la suppression du thème: $e';
    }
  }

  // Admin: Add question
  Future<void> addQuestion(Question question) async {
    try {
      await _firestore.collection('questions').add(question.toFirestore());
    } catch (e) {
      throw 'Erreur lors de l\'ajout de la question: $e';
    }
  }

  // Admin: Update question
  Future<void> updateQuestion(String questionId, Question question) async {
    try {
      await _firestore
          .collection('questions')
          .doc(questionId)
          .update(question.toFirestore());
    } catch (e) {
      throw 'Erreur lors de la mise à jour de la question: $e';
    }
  }

  // Admin: Delete question
  Future<void> deleteQuestion(String questionId) async {
    try {
      await _firestore.collection('questions').doc(questionId).delete();
    } catch (e) {
      throw 'Erreur lors de la suppression de la question: $e';
    }
  }

  // Admin: Get all questions
  Future<List<Question>> getAllQuestions() async {
    try {
      QuerySnapshot snapshot = await _firestore.collection('questions').get();
      return snapshot.docs
          .map((doc) => Question.fromFirestore(
              doc.data() as Map<String, dynamic>, doc.id))
          .toList();
    } catch (e) {
      throw 'Erreur lors du chargement des questions: $e';
    }
  }
}
