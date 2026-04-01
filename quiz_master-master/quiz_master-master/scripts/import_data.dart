import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';

Future<void> main() async {
  print('🚀 Démarrage de l\'import des données...\n');

  // Initialiser Firebase (utilise google-services.json automatiquement)
  await Firebase.initializeApp();

  final db = FirebaseFirestore.instance;

  try {
    // 1. Importer les thèmes
    print('📚 Import des thèmes...');
    await importThemes(db);
    print('✅ Thèmes importés!\n');

    // 2. Importer les questions
    print('❓ Import des questions...');
    await importQuestions(db);
    print('✅ Questions importées!\n');

    print('🎉 Import terminé avec succès!');
    print('   - 5 thèmes créés');
    print('   - 25 questions créées');
  } catch (e) {
    print('❌ Erreur lors de l\'import: $e');
  }
}

Future<void> importThemes(FirebaseFirestore db) async {
  final themes = [
    {
      'id': 'culture_generale',
      'data': {
        'name': 'Culture Générale',
        'description': 'Questions variées sur la culture',
        'icon': 'lightbulb',
        'color': '#FF6B35',
      }
    },
    {
      'id': 'science',
      'data': {
        'name': 'Science',
        'description': 'Questions scientifiques et techniques',
        'icon': 'science',
        'color': '#4ECDC4',
      }
    },
    {
      'id': 'sport',
      'data': {
        'name': 'Sport',
        'description': 'Questions sur le sport et les athlètes',
        'icon': 'sports_soccer',
        'color': '#95E77D',
      }
    },
    {
      'id': 'histoire',
      'data': {
        'name': 'Histoire',
        'description': 'Voyage dans le passé',
        'icon': 'book',
        'color': '#F7B731',
      }
    },
    {
      'id': 'geographie',
      'data': {
        'name': 'Géographie',
        'description': 'Capitales, pays et continents',
        'icon': 'language',
        'color': '#5F27CD',
      }
    },
  ];

  for (var theme in themes) {
    await db
        .collection('themes')
        .doc(theme['id'] as String)
        .set(theme['data'] as Map<String, dynamic>);
    print('   ✓ Thème créé: ${theme['id']}');
  }
}

Future<void> importQuestions(FirebaseFirestore db) async {
  final questions = [
    // Culture Générale
    {
      'themeId': 'culture_generale',
      'text': 'Quelle est la capitale de la France?',
      'options': ['Paris', 'Lyon', 'Marseille', 'Nice'],
      'answerIndex': 0,
    },
    {
      'themeId': 'culture_generale',
      'text': 'Qui a peint la Joconde?',
      'options': ['Michel-Ange', 'Léonard de Vinci', 'Raphaël', 'Donatello'],
      'answerIndex': 1,
    },
    {
      'themeId': 'culture_generale',
      'text': 'Combien y a-t-il de continents?',
      'options': ['5', '6', '7', '8'],
      'answerIndex': 2,
    },
    {
      'themeId': 'culture_generale',
      'text': 'Quelle est la langue la plus parlée au monde?',
      'options': ['Anglais', 'Espagnol', 'Mandarin', 'Hindi'],
      'answerIndex': 2,
    },
    {
      'themeId': 'culture_generale',
      'text': 'Quel est le plus grand océan?',
      'options': ['Atlantique', 'Indien', 'Pacifique', 'Arctique'],
      'answerIndex': 2,
    },

    // Science
    {
      'themeId': 'science',
      'text': 'Quelle planète est la plus proche du Soleil?',
      'options': ['Vénus', 'Mercure', 'Mars', 'Terre'],
      'answerIndex': 1,
    },
    {
      'themeId': 'science',
      'text': 'Quel est le symbole chimique de l\'or?',
      'options': ['Go', 'Au', 'Or', 'Ag'],
      'answerIndex': 1,
    },
    {
      'themeId': 'science',
      'text': 'Combien y a-t-il d\'os dans le corps humain adulte?',
      'options': ['186', '206', '226', '246'],
      'answerIndex': 1,
    },
    {
      'themeId': 'science',
      'text': 'Quelle est la vitesse de la lumière?',
      'options': [
        '300 000 km/s',
        '150 000 km/s',
        '450 000 km/s',
        '600 000 km/s'
      ],
      'answerIndex': 0,
    },
    {
      'themeId': 'science',
      'text': 'Quel gaz les plantes absorbent-elles pour la photosynthèse?',
      'options': ['Oxygène', 'Azote', 'Dioxyde de carbone', 'Hydrogène'],
      'answerIndex': 2,
    },

    // Sport
    {
      'themeId': 'sport',
      'text': 'Combien de joueurs composent une équipe de football?',
      'options': ['9', '10', '11', '12'],
      'answerIndex': 2,
    },
    {
      'themeId': 'sport',
      'text': 'Quelle est la durée d\'un match de basket NBA?',
      'options': ['40 minutes', '45 minutes', '48 minutes', '60 minutes'],
      'answerIndex': 2,
    },
    {
      'themeId': 'sport',
      'text': 'Combien de Grand Chelem y a-t-il en tennis?',
      'options': ['3', '4', '5', '6'],
      'answerIndex': 1,
    },
    {
      'themeId': 'sport',
      'text': 'Quel pays a remporté le plus de Coupes du Monde de football?',
      'options': ['Allemagne', 'Argentine', 'Brésil', 'Italie'],
      'answerIndex': 2,
    },
    {
      'themeId': 'sport',
      'text': 'Combien de points vaut un essai au rugby?',
      'options': ['3', '5', '7', '10'],
      'answerIndex': 1,
    },

    // Histoire
    {
      'themeId': 'histoire',
      'text': 'En quelle année a eu lieu la Révolution française?',
      'options': ['1789', '1799', '1804', '1815'],
      'answerIndex': 0,
    },
    {
      'themeId': 'histoire',
      'text': 'Qui était le premier empereur romain?',
      'options': ['Jules César', 'Auguste', 'Néron', 'Caligula'],
      'answerIndex': 1,
    },
    {
      'themeId': 'histoire',
      'text': 'Quelle guerre a duré de 1914 à 1918?',
      'options': [
        'Guerre de Cent Ans',
        'Première Guerre mondiale',
        'Seconde Guerre mondiale',
        'Guerre de Trente Ans'
      ],
      'answerIndex': 1,
    },
    {
      'themeId': 'histoire',
      'text': 'Qui a découvert l\'Amérique en 1492?',
      'options': [
        'Vasco de Gama',
        'Christophe Colomb',
        'Magellan',
        'Marco Polo'
      ],
      'answerIndex': 1,
    },
    {
      'themeId': 'histoire',
      'text': 'Dans quel pays se trouve la cité antique de Pompéi?',
      'options': ['Grèce', 'Turquie', 'Italie', 'Égypte'],
      'answerIndex': 2,
    },

    // Géographie
    {
      'themeId': 'geographie',
      'text': 'Quelle est la capitale du Japon?',
      'options': ['Kyoto', 'Osaka', 'Tokyo', 'Hiroshima'],
      'answerIndex': 2,
    },
    {
      'themeId': 'geographie',
      'text': 'Quel est le plus long fleuve du monde?',
      'options': ['Nil', 'Amazone', 'Yangtsé', 'Mississippi'],
      'answerIndex': 0,
    },
    {
      'themeId': 'geographie',
      'text': 'Combien de pays composent l\'Union Européenne?',
      'options': ['25', '27', '28', '30'],
      'answerIndex': 1,
    },
    {
      'themeId': 'geographie',
      'text': 'Quelle est la plus haute montagne du monde?',
      'options': ['K2', 'Everest', 'Kilimandjaro', 'Mont Blanc'],
      'answerIndex': 1,
    },
    {
      'themeId': 'geographie',
      'text': 'Quel pays a la plus grande population?',
      'options': ['Inde', 'Chine', 'États-Unis', 'Indonésie'],
      'answerIndex': 0,
    },
  ];

  int count = 0;
  for (var question in questions) {
    await db.collection('questions').add(question);
    count++;
    if (count % 5 == 0) {
      print('   ✓ $count questions importées...');
    }
  }
  print('   ✓ Total: $count questions');
}
