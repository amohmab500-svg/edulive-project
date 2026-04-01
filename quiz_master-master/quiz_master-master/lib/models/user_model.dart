class UserModel {
  final String uid;
  final String displayName;
  final String email;
  final Map<String, int> bestScores;
  final bool isAdmin;

  UserModel({
    required this.uid,
    required this.displayName,
    required this.email,
    this.bestScores = const {},
    this.isAdmin = false,
  });

  factory UserModel.fromFirestore(Map<String, dynamic> data, String uid) {
    return UserModel(
      uid: uid,
      displayName: data['displayName'] ?? '',
      email: data['email'] ?? '',
      bestScores: Map<String, int>.from(data['bestScores'] ?? {}),
      isAdmin: data['isAdmin'] ?? false,
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'displayName': displayName,
      'email': email,
      'bestScores': bestScores,
      'isAdmin': isAdmin,
    };
  }

  UserModel copyWith({
    String? displayName,
    String? email,
    Map<String, int>? bestScores,
    bool? isAdmin,
  }) {
    return UserModel(
      uid: uid,
      displayName: displayName ?? this.displayName,
      email: email ?? this.email,
      bestScores: bestScores ?? this.bestScores,
      isAdmin: isAdmin ?? this.isAdmin,
    );
  }
}
