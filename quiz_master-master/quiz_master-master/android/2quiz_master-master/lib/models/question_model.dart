class Question {
  final String id;
  final String themeId;
  final String text;
  final List<String> options;
  final int answerIndex;

  Question({
    required this.id,
    required this.themeId,
    required this.text,
    required this.options,
    required this.answerIndex,
  });

  factory Question.fromFirestore(Map<String, dynamic> data, String id) {
    return Question(
      id: id,
      themeId: data['themeId'] ?? '',
      text: data['text'] ?? '',
      options: List<String>.from(data['options'] ?? []),
      answerIndex: data['answerIndex'] ?? 0,
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'themeId': themeId,
      'text': text,
      'options': options,
      'answerIndex': answerIndex,
    };
  }
}