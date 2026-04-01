import 'dart:async';
import 'package:flutter/material.dart';
import '../models/theme_model.dart';
import '../models/question_model.dart';
import '../services/firestore_service.dart';
import '../services/auth_service.dart';
import '../widgets/answer_button.dart';
import 'result_screen.dart';

class QuizScreen extends StatefulWidget {
  final QuizTheme theme;
  final int numberOfQuestions;

  const QuizScreen({
    super.key,
    required this.theme,
    required this.numberOfQuestions,
  });

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  final _firestoreService = FirestoreService();
  final _authService = AuthService();
  List<Question> _questions = [];
  int _currentQuestionIndex = 0;
  int _score = 0;
  bool _isLoading = true;
  bool _answered = false;
  int? _selectedAnswerIndex;
  Timer? _timer;
  int _timeLeft = 10;

  @override
  void initState() {
    super.initState();
    _loadQuestions();
  }

  Future<void> _loadQuestions() async {
    setState(() => _isLoading = true);
    try {
      final allQuestions =
          await _firestoreService.getQuestionsByTheme(widget.theme.id);
      if (allQuestions.isEmpty) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
                content: Text('Aucune question disponible pour ce thème')),
          );
          Navigator.pop(context);
        }
        return;
      }
      // Mélanger et limiter le nombre de questions
      allQuestions.shuffle();
      final limitedQuestions =
          allQuestions.take(widget.numberOfQuestions).toList();

      setState(() {
        _questions = limitedQuestions;
        _isLoading = false;
      });
      _startTimer();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erreur: $e')),
        );
        Navigator.pop(context);
      }
    }
  }

  void _startTimer() {
    _timeLeft = 10;
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        if (_timeLeft > 0) {
          _timeLeft--;
        } else {
          _timer?.cancel();
          if (!_answered) {
            _skipQuestion();
          }
        }
      });
    });
  }

  void _skipQuestion() {
    setState(() {
      _answered = true;
    });

    Future.delayed(const Duration(milliseconds: 500), () {
      if (_currentQuestionIndex < _questions.length - 1) {
        setState(() {
          _currentQuestionIndex++;
          _answered = false;
          _selectedAnswerIndex = null;
        });
        _startTimer();
      } else {
        _timer?.cancel();
        _finishQuiz();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _answerQuestion(int answerIndex) {
    if (_answered) return;

    _timer?.cancel();
    setState(() {
      _answered = true;
      _selectedAnswerIndex = answerIndex;
      if (answerIndex == _questions[_currentQuestionIndex].answerIndex) {
        _score++;
      }
    });

    Future.delayed(const Duration(seconds: 1), () {
      if (_currentQuestionIndex < _questions.length - 1) {
        setState(() {
          _currentQuestionIndex++;
          _answered = false;
          _selectedAnswerIndex = null;
        });
        _startTimer();
      } else {
        _timer?.cancel();
        _finishQuiz();
      }
    });
  }

  Future<void> _finishQuiz() async {
    final uid = _authService.currentUser?.uid;
    if (uid != null) {
      await _firestoreService.updateBestScore(uid, widget.theme.id, _score);
    }

    if (mounted) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => ResultScreen(
            score: _score,
            totalQuestions: _questions.length,
            theme: widget.theme,
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(title: Text(widget.theme.name)),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    final question = _questions[_currentQuestionIndex];

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.theme.name),
        backgroundColor: widget.theme.color,
      ),
      body: SafeArea(
        child: Column(
          children: [
            LinearProgressIndicator(
              value: (_currentQuestionIndex + 1) / _questions.length,
              backgroundColor: Colors.grey[200],
              valueColor: AlwaysStoppedAnimation<Color>(widget.theme.color),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Question ${_currentQuestionIndex + 1}/${_questions.length}',
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: _timeLeft <= 3 ? Colors.red : widget.theme.color,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      children: [
                        const Icon(
                          Icons.timer,
                          color: Colors.white,
                          size: 20,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '${_timeLeft}s',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Card(
                      elevation: 4,
                      child: Padding(
                        padding: const EdgeInsets.all(24.0),
                        child: Text(
                          question.text,
                          style: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w500,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),
                    ...List.generate(
                      question.options.length,
                      (index) => Padding(
                        padding: const EdgeInsets.only(bottom: 16),
                        child: AnswerButton(
                          answer: question.options[index],
                          index: index,
                          isSelected: _selectedAnswerIndex == index,
                          isCorrect: index == question.answerIndex,
                          isAnswered: _answered,
                          onTap: () => _answerQuestion(index),
                          color: widget.theme.color,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
