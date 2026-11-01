/* Histoires de chaque unité. Personnages récurrents :
   Amina (comptable à Niamey), son mari Ibrahim (enseignant), leurs enfants Moussa (10 ans) et Fati (6 ans),
   la grand-mère Hadiza, le grand-père Ali et Kofi, collègue ghanéen d'Amina.
   lines     : [anglais, français]
   questions : [question, bonne réponse, mauvaise 1, mauvaise 2, mauvaise 3]
   gaps      : [phrase de l'histoire avec ___, mot manquant, traduction, [3 propositions fausses]]
   discuss   : questions ouvertes à discuter en séance de club */

const STORIES = {
  greet: { title: "A new colleague",
    lines: [
      ["It is Monday morning in Niamey.", "C'est lundi matin à Niamey."],
      ["Amina arrives at the office at eight o'clock.", "Amina arrive au bureau à huit heures."],
      ["A new colleague is waiting at the door.", "Un nouveau collègue attend à la porte."],
      ["“Hello! Good morning,” says Amina.", "« Bonjour ! », dit Amina."],
      ["“Good morning! My name is Kofi. I am from Ghana.”", "« Bonjour ! Je m'appelle Kofi. Je viens du Ghana. »"],
      ["“Nice to meet you, Kofi. How are you?”", "« Enchantée, Kofi. Comment allez-vous ? »"],
      ["“I'm fine, thank you. And you?”", "« Je vais bien, merci. Et vous ? »"],
      ["“I'm fine too. Please, come in.”", "« Je vais bien aussi. Entrez, je vous en prie. »"],
      ["Kofi speaks English, and Amina wants to learn it.", "Kofi parle anglais, et Amina veut l'apprendre."],
      ["“Can you help me with my English, please?” she asks.", "« Pouvez-vous m'aider en anglais, s'il vous plaît ? » demande-t-elle."],
      ["“Yes, of course!” says Kofi with a smile.", "« Oui, bien sûr ! » dit Kofi en souriant."],
      ["In the afternoon, Kofi asks, “Is the meeting today?”", "L'après-midi, Kofi demande : « La réunion est aujourd'hui ? »"],
      ["“No, sorry. It is tomorrow.”", "« Non, désolée. C'est demain. »"],
      ["At six o'clock, Amina says, “Goodbye, Kofi. Good evening!”", "À six heures, Amina dit : « Au revoir, Kofi. Bonne soirée ! »"],
      ["At home, she says good night to her children.", "À la maison, elle dit bonne nuit à ses enfants."]
    ],
    questions: [
      ["Where is Kofi from?", "Ghana", "Niger", "Togo", "Mali"],
      ["What day is it?", "Monday", "Friday", "Sunday", "Tuesday"],
      ["What does Amina want to learn?", "English", "French", "Hausa", "accounting"],
      ["When is the meeting?", "tomorrow", "today", "on Friday", "yesterday"]
    ],
    gaps: [
      ["“I'm fine, ___. And you?”", "thank you", "« Je vais bien, merci. Et vous ? »", ["sorry", "goodbye", "good night"]],
      ["“Can you help me with my English, ___?” she asks.", "please", "« Pouvez-vous m'aider en anglais, s'il vous plaît ? »", ["hello", "sorry", "no"]],
      ["At home, she says ___ to her children.", "good night", "À la maison, elle dit bonne nuit à ses enfants.", ["good morning", "thank you", "please"]]
    ],
    discuss: ["How do you greet a new colleague in English?", "Introduce yourself to the person next to you.", "Who helps you to learn English?"] },

  numbers: { title: "At the shop with Moussa",
    lines: [
      ["On Saturday, Amina goes to the shop with her son Moussa.", "Samedi, Amina va à la boutique avec son fils Moussa."],
      ["Moussa is ten years old, and he loves numbers.", "Moussa a dix ans, et il adore les nombres."],
      ["“Mum, I can count to ten!” he says.", "« Maman, je sais compter jusqu'à dix ! » dit-il."],
      ["“One, two, three, four, five, six, seven, eight, nine, ten!”", "« Un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix ! »"],
      ["Amina buys two bags of rice and three bottles of milk.", "Amina achète deux sacs de riz et trois bouteilles de lait."],
      ["She also buys six eggs and one big fish.", "Elle achète aussi six œufs et un gros poisson."],
      ["Moussa wants eight sweets, but his mother says, “Only one!”", "Moussa veut huit bonbons, mais sa mère dit : « Un seul ! »"],
      ["“How much is it?” Amina asks.", "« Combien ça coûte ? » demande Amina."],
      ["“Five thousand francs, please,” says the shopkeeper.", "« Cinq mille francs, s'il vous plaît », dit le commerçant."],
      ["Moussa counts the money carefully.", "Moussa compte l'argent avec soin."],
      ["They come back home at nine o'clock.", "Ils rentrent à la maison à neuf heures."],
      ["Fati is seven years old next week, and Moussa wants to buy her a present.", "Fati aura sept ans la semaine prochaine, et Moussa veut lui acheter un cadeau."]
    ],
    questions: [
      ["How old is Moussa?", "ten", "six", "eight", "seven"],
      ["How many eggs does Amina buy?", "six", "two", "three", "ten"],
      ["How much is it?", "five thousand francs", "five hundred francs", "two thousand francs", "ten thousand francs"],
      ["When do they come back home?", "at nine o'clock", "at eight o'clock", "at ten o'clock", "at noon"]
    ],
    gaps: [
      ["Amina buys ___ bags of rice and three bottles of milk.", "two", "Amina achète deux sacs de riz et trois bouteilles de lait.", ["six", "nine", "five"]],
      ["Moussa is ___ years old, and he loves numbers.", "ten", "Moussa a dix ans, et il adore les nombres.", ["two", "four", "one"]],
      ["They come back home at ___ o'clock.", "nine", "Ils rentrent à la maison à neuf heures.", ["three", "one", "four"]]
    ],
    discuss: ["How old are you? Ask your partner.", "Count from one to twenty together.", "How much is a bag of rice where you live?"] },

  colours: { title: "Fati's drawing",
    lines: [
      ["Fati is six years old, and she loves colours.", "Fati a six ans, et elle adore les couleurs."],
      ["Today, she is drawing a picture of her house.", "Aujourd'hui, elle dessine sa maison."],
      ["The house is white, and the door is brown.", "La maison est blanche, et la porte est marron."],
      ["The sky is blue, and the sun is yellow.", "Le ciel est bleu, et le soleil est jaune."],
      ["In the garden, there is a green tree with orange fruits.", "Dans le jardin, il y a un arbre vert avec des fruits orange."],
      ["Fati draws her mother in a pink dress.", "Fati dessine sa mère dans une robe rose."],
      ["Her father has a black shirt.", "Son père porte une chemise noire."],
      ["“Where is the red pencil?” she asks Moussa.", "« Où est le crayon rouge ? » demande-t-elle à Moussa."],
      ["“Sorry, I don't know. Take the purple one,” says Moussa.", "« Désolé, je ne sais pas. Prends le violet », dit Moussa."],
      ["Fati shows the picture to her mother.", "Fati montre le dessin à sa mère."],
      ["“It's beautiful! What colour is my dress?” asks Amina.", "« C'est magnifique ! De quelle couleur est ma robe ? » demande Amina."],
      ["“Pink, Mum! It's your favourite colour!”", "« Rose, maman ! C'est ta couleur préférée ! »"]
    ],
    questions: [
      ["What colour is the door?", "brown", "white", "red", "black"],
      ["What colour is the sun?", "yellow", "orange", "red", "pink"],
      ["What colour is Amina's dress?", "pink", "purple", "blue", "green"],
      ["What is Fati drawing?", "her house", "a car", "her school", "a market"]
    ],
    gaps: [
      ["The sky is ___, and the sun is yellow.", "blue", "Le ciel est bleu, et le soleil est jaune.", ["black", "pink", "brown"]],
      ["Her father has a ___ shirt.", "black", "Son père porte une chemise noire.", ["yellow", "pink", "orange"]],
      ["In the garden, there is a ___ tree with orange fruits.", "green", "Dans le jardin, il y a un arbre vert avec des fruits orange.", ["purple", "white", "pink"]]
    ],
    discuss: ["What is your favourite colour? Why?", "Describe the clothes of the person next to you.", "What colours can you see in this room?"] },

  family: { title: "Sunday at Grandma's",
    lines: [
      ["On Sunday, the family visits Amina's parents.", "Dimanche, la famille rend visite aux parents d'Amina."],
      ["Amina's mother is called Hadiza. She is the children's grandmother.", "La mère d'Amina s'appelle Hadiza. C'est la grand-mère des enfants."],
      ["Their grandfather, Ali, is seventy years old.", "Leur grand-père, Ali, a soixante-dix ans."],
      ["Ibrahim is Amina's husband, and Amina is his wife.", "Ibrahim est le mari d'Amina, et Amina est sa femme."],
      ["Moussa has a little sister, Fati.", "Moussa a une petite sœur, Fati."],
      ["Today, their aunt comes with her new baby.", "Aujourd'hui, leur tante vient avec son nouveau bébé."],
      ["The baby is very small and sleeps all the time.", "Le bébé est tout petit et dort tout le temps."],
      ["Grandmother Hadiza cooks rice and chicken for everyone.", "Grand-mère Hadiza cuisine du riz et du poulet pour tout le monde."],
      ["“Where is your brother?” Grandfather Ali asks Fati.", "« Où est ton frère ? » demande grand-père Ali à Fati."],
      ["“He is outside with my father,” she says.", "« Il est dehors avec mon père », dit-elle."],
      ["After lunch, Grandfather tells a funny story.", "Après le déjeuner, grand-père raconte une histoire drôle."],
      ["Every child in the family loves Sunday at Grandma's house.", "Chaque enfant de la famille adore le dimanche chez grand-mère."]
    ],
    questions: [
      ["Who is Hadiza?", "Amina's mother", "Amina's sister", "Ibrahim's mother", "a teacher"],
      ["How old is Grandfather Ali?", "seventy", "sixty", "eighty", "fifty"],
      ["Who is Ibrahim?", "Amina's husband", "Amina's brother", "Kofi's father", "the grandfather"],
      ["What does Grandmother cook?", "rice and chicken", "fish and bread", "meat and onions", "eggs and tomatoes"]
    ],
    gaps: [
      ["Moussa has a little ___, Fati.", "sister", "Moussa a une petite sœur, Fati.", ["brother", "husband", "grandfather"]],
      ["The ___ is very small and sleeps all the time.", "baby", "Le bébé est tout petit et dort tout le temps.", ["father", "wife", "grandmother"]],
      ["Ibrahim is Amina's ___, and Amina is his wife.", "husband", "Ibrahim est le mari d'Amina, et Amina est sa femme.", ["brother", "child", "mother"]]
    ],
    discuss: ["Tell your group about your family.", "How many brothers and sisters do you have?", "What do you do with your family on Sunday?"] },

  food: { title: "At the Grand Market",
    lines: [
      ["Every Saturday, Ibrahim goes to the Grand Market.", "Chaque samedi, Ibrahim va au Grand Marché."],
      ["Today, Amina gives him a list.", "Aujourd'hui, Amina lui donne une liste."],
      ["He needs rice, onions, tomatoes, bread, milk and some meat.", "Il lui faut du riz, des oignons, des tomates, du pain, du lait et de la viande."],
      ["First, he buys a bag of rice and two kilos of onions.", "D'abord, il achète un sac de riz et deux kilos d'oignons."],
      ["“How much are the tomatoes?” he asks a woman.", "« Combien coûtent les tomates ? » demande-t-il à une femme."],
      ["“One thousand francs a kilo,” she says.", "« Mille francs le kilo », dit-elle."],
      ["Then he buys some meat, a fresh fish and a chicken.", "Ensuite, il achète de la viande, un poisson frais et un poulet."],
      ["It is very hot, so he drinks a bottle of water.", "Il fait très chaud, alors il boit une bouteille d'eau."],
      ["At home, Amina looks in the bags and laughs.", "À la maison, Amina regarde dans les sacs et rit."],
      ["“Where are the bread and the milk?”", "« Où sont le pain et le lait ? »"],
      ["“Oh, sorry! I forgot them,” says Ibrahim.", "« Oh, pardon ! Je les ai oubliés », dit Ibrahim."],
      ["He eats an egg sandwich and goes back to the market.", "Il mange un sandwich à l'œuf et retourne au marché."]
    ],
    questions: [
      ["When does Ibrahim go to the market?", "every Saturday", "every Sunday", "every Monday", "every day"],
      ["How much are the tomatoes?", "one thousand francs a kilo", "five hundred francs a kilo", "two thousand francs a kilo", "ten thousand francs"],
      ["What does Ibrahim forget?", "the bread and the milk", "the rice and the fish", "the onions", "the chicken"],
      ["What does Amina give him?", "a list", "some money", "a bag", "a phone"]
    ],
    gaps: [
      ["First, he buys a bag of ___ and two kilos of onions.", "rice", "D'abord, il achète un sac de riz et deux kilos d'oignons.", ["milk", "water", "egg"]],
      ["It is very hot, so he drinks a bottle of ___.", "water", "Il fait très chaud, alors il boit une bouteille d'eau.", ["bread", "meat", "rice"]],
      ["Then he buys some meat, a fresh ___ and a chicken.", "fish", "Ensuite, il achète de la viande, un poisson frais et un poulet.", ["milk", "onion", "bread"]]
    ],
    discuss: ["What do you buy at the market every week?", "Ask your partner “How much is…?” and answer.", "What is your favourite food?"] },

  office: { title: "A busy Tuesday",
    lines: [
      ["Amina is an accountant in an office in Niamey.", "Amina est comptable dans un bureau à Niamey."],
      ["On Tuesday, she has a lot of work.", "Mardi, elle a beaucoup de travail."],
      ["Her boss, Mr Diallo, wants the monthly report today.", "Son chef, M. Diallo, veut le rapport mensuel aujourd'hui."],
      ["Amina opens her computer and reads her email.", "Amina allume son ordinateur et lit ses e-mails."],
      ["A client needs an invoice for his last payment.", "Un client a besoin d'une facture pour son dernier paiement."],
      ["She prepares the invoice, but the printer is broken!", "Elle prépare la facture, mais l'imprimante est en panne !"],
      ["“Kofi, can I use your printer, please?” she asks her colleague.", "« Kofi, puis-je utiliser ton imprimante, s'il te plaît ? » demande-t-elle à son collègue."],
      ["“Of course,” says Kofi, and he also gives her a pen.", "« Bien sûr », dit Kofi, et il lui donne aussi un stylo."],
      ["At three o'clock, there is a meeting with the boss.", "À trois heures, il y a une réunion avec le chef."],
      ["Amina presents her report, and Mr Diallo is happy.", "Amina présente son rapport, et M. Diallo est content."],
      ["“Thank you, Amina. Good work!” he says.", "« Merci, Amina. Bon travail ! » dit-il."]
    ],
    questions: [
      ["What is Amina's job?", "accountant", "teacher", "doctor", "driver"],
      ["What does Mr Diallo want today?", "the monthly report", "an invoice", "a new computer", "a meeting room"],
      ["What is broken?", "the printer", "the computer", "the pen", "the phone"],
      ["When is the meeting?", "at three o'clock", "at ten o'clock", "at eight o'clock", "tomorrow"]
    ],
    gaps: [
      ["Amina opens her ___ and reads her email.", "computer", "Amina allume son ordinateur et lit ses e-mails.", ["pen", "boss", "invoice"]],
      ["A client needs an ___ for his last payment.", "invoice", "Un client a besoin d'une facture pour son dernier paiement.", ["office", "email", "printer"]],
      ["At three o'clock, there is a ___ with the boss.", "meeting", "À trois heures, il y a une réunion avec le chef.", ["report", "pen", "colleague"]]
    ],
    discuss: ["What do you do at work every day?", "Describe your office or your workplace.", "How do you ask a colleague for help in English?"] },

  days: { title: "Moussa's week",
    lines: [
      ["Moussa has a busy week.", "Moussa a une semaine chargée."],
      ["On Monday and Tuesday, he goes to school early.", "Lundi et mardi, il va tôt à l'école."],
      ["On Wednesday afternoon, he plays football with his friends.", "Mercredi après-midi, il joue au football avec ses amis."],
      ["On Thursday, he has an English test.", "Jeudi, il a un contrôle d'anglais."],
      ["Yesterday was Thursday, and the test was easy.", "Hier, c'était jeudi, et le contrôle était facile."],
      ["Today is Friday, the last day of school this week.", "Aujourd'hui, c'est vendredi, le dernier jour d'école de la semaine."],
      ["Tomorrow is Saturday, and Moussa goes to the English Club with his mother.", "Demain, c'est samedi, et Moussa va au club d'anglais avec sa mère."],
      ["On Sunday, the family rests and visits Grandma.", "Dimanche, la famille se repose et rend visite à grand-mère."],
      ["“What day is it today?” asks Fati.", "« Quel jour sommes-nous ? » demande Fati."],
      ["“Today is Friday!” says Moussa.", "« Aujourd'hui, c'est vendredi ! » dit Moussa."],
      ["“And tomorrow, no school!”", "« Et demain, pas d'école ! »"]
    ],
    questions: [
      ["When does Moussa play football?", "on Wednesday", "on Monday", "on Friday", "on Sunday"],
      ["When was the English test?", "on Thursday", "on Tuesday", "on Friday", "on Saturday"],
      ["What day is it today?", "Friday", "Thursday", "Saturday", "Monday"],
      ["Where does Moussa go on Saturday?", "to the English Club", "to school", "to the market", "to the hospital"]
    ],
    gaps: [
      ["On ___ afternoon, he plays football with his friends.", "Wednesday", "Mercredi après-midi, il joue au football avec ses amis.", ["Sunday", "Monday", "Saturday"]],
      ["___ was Thursday, and the test was easy.", "yesterday", "Hier, c'était jeudi, et le contrôle était facile.", ["tomorrow", "today", "Sunday"]],
      ["___ is Saturday, and Moussa goes to the English Club.", "tomorrow", "Demain, c'est samedi, et Moussa va au club d'anglais.", ["yesterday", "Monday", "Tuesday"]]
    ],
    discuss: ["What do you do on Saturday?", "Which day is your favourite? Why?", "What did you do yesterday?"] },

  verbs: { title: "Amina learns English",
    lines: [
      ["Amina wants to learn English for her job.", "Amina veut apprendre l'anglais pour son travail."],
      ["Every morning, she walks to the office.", "Chaque matin, elle va au bureau à pied."],
      ["On the way, she buys a newspaper in English.", "En chemin, elle achète un journal en anglais."],
      ["She works from eight o'clock to five o'clock.", "Elle travaille de huit heures à dix-sept heures."],
      ["At lunch, she eats rice and drinks tea with Kofi.", "Au déjeuner, elle mange du riz et boit du thé avec Kofi."],
      ["Kofi speaks English with her, slowly.", "Kofi parle anglais avec elle, lentement."],
      ["In the evening, she reads a short story.", "Le soir, elle lit une petite histoire."],
      ["Then she writes the new words in a notebook.", "Ensuite, elle écrit les nouveaux mots dans un cahier."],
      ["Her notebook has fifty new words now.", "Son cahier contient maintenant cinquante nouveaux mots."],
      ["At ten o'clock, she is tired, and she goes to sleep.", "À dix heures, elle est fatiguée et va dormir."],
      ["“One day, I will speak English very well,” she thinks.", "« Un jour, je parlerai très bien anglais », pense-t-elle."]
    ],
    questions: [
      ["How does Amina go to the office?", "she walks", "by taxi", "by bus", "by motorbike"],
      ["What does she buy on the way?", "a newspaper", "a book", "some bread", "a pen"],
      ["What does she drink at lunch?", "tea", "milk", "coffee", "juice"],
      ["How many new words are in her notebook?", "fifty", "fifteen", "five", "twenty"]
    ],
    gaps: [
      ["Every morning, she ___ to the office.", "walks", "Chaque matin, elle va au bureau à pied.", ["sleeps", "eats", "reads"]],
      ["At lunch, she eats rice and ___ tea with Kofi.", "drinks", "Au déjeuner, elle mange du riz et boit du thé avec Kofi.", ["writes", "buys", "walks"]],
      ["Then she ___ the new words in a notebook.", "writes", "Ensuite, elle écrit les nouveaux mots dans un cahier.", ["drinks", "sleeps", "eats"]]
    ],
    discuss: ["What do you do every day to learn English?", "Describe your morning routine.", "What time do you go to sleep?"] },

  house: { title: "Kofi's new house",
    lines: [
      ["Kofi has a new house in Niamey.", "Kofi a une nouvelle maison à Niamey."],
      ["On Sunday, he invites Amina's family to visit.", "Dimanche, il invite la famille d'Amina."],
      ["Moussa knocks, and Kofi opens the door.", "Moussa frappe, et Kofi ouvre la porte."],
      ["“Welcome! Come in, please.”", "« Bienvenue ! Entrez, je vous en prie. »"],
      ["The living room is big, with a sofa, two chairs and a television.", "Le salon est grand, avec un canapé, deux chaises et une télévision."],
      ["The kitchen is small, but it is very clean.", "La cuisine est petite, mais elle est très propre."],
      ["There are two bedrooms and one bathroom.", "Il y a deux chambres et une salle de bain."],
      ["In Kofi's bedroom, there is a big bed near the window.", "Dans la chambre de Kofi, il y a un grand lit près de la fenêtre."],
      ["“I love your house!” says Fati.", "« J'adore ta maison ! » dit Fati."],
      ["When they leave, Kofi cannot find his key.", "Quand ils partent, Kofi ne trouve pas sa clé."],
      ["“Is it in the kitchen?” asks Amina.", "« Elle est dans la cuisine ? » demande Amina."],
      ["“No, it's on the television!” laughs Moussa.", "« Non, elle est sur la télévision ! » dit Moussa en riant."]
    ],
    questions: [
      ["When does the family visit Kofi?", "on Sunday", "on Monday", "on Saturday", "on Friday"],
      ["What is in the living room?", "a sofa, two chairs and a television", "a bed and a table", "a big fridge", "a computer"],
      ["How many bedrooms are there?", "two", "one", "three", "four"],
      ["Where is the key?", "on the television", "in the kitchen", "on the bed", "in the bathroom"]
    ],
    gaps: [
      ["Moussa knocks, and Kofi opens the ___.", "door", "Moussa frappe, et Kofi ouvre la porte.", ["bed", "key", "chair"]],
      ["The ___ is small, but it is very clean.", "kitchen", "La cuisine est petite, mais elle est très propre.", ["key", "chair", "window"]],
      ["When they leave, Kofi cannot find his ___.", "key", "Quand ils partent, Kofi ne trouve pas sa clé.", ["kitchen", "bathroom", "bed"]]
    ],
    discuss: ["Describe your house or your room.", "What is your favourite room? Why?", "Ask your partner: “Is there a … in your house?”"] },

  town: { title: "Where is the bank?",
    lines: [
      ["Kofi is new in Niamey, and he doesn't know the town very well.", "Kofi est nouveau à Niamey, et il ne connaît pas bien la ville."],
      ["On Monday, he needs to go to the bank.", "Lundi, il doit aller à la banque."],
      ["He asks a man in the street, “Excuse me, where is the bank, please?”", "Il demande à un homme dans la rue : « Excusez-moi, où est la banque, s'il vous plaît ? »"],
      ["“Go straight, then turn left after the school,” says the man.", "« Allez tout droit, puis tournez à gauche après l'école », dit l'homme."],
      ["“Is it far?” asks Kofi.", "« C'est loin ? » demande Kofi."],
      ["“It's ten minutes on foot, or you can take a taxi.”", "« C'est à dix minutes à pied, ou vous pouvez prendre un taxi. »"],
      ["The streets are full of cars, motorbikes and bicycles.", "Les rues sont pleines de voitures, de motos et de vélos."],
      ["Kofi decides to walk.", "Kofi décide de marcher."],
      ["He passes a big shop and the hospital.", "Il passe devant une grande boutique et l'hôpital."],
      ["After the school, he turns left, and there is the bank!", "Après l'école, il tourne à gauche, et voilà la banque !"],
      ["In the evening, he is tired, so he goes home by bus.", "Le soir, il est fatigué, alors il rentre en bus."]
    ],
    questions: [
      ["Where does Kofi need to go?", "to the bank", "to the hospital", "to school", "to the shop"],
      ["What must he do after the school?", "turn left", "turn right", "go straight", "take a bus"],
      ["How does he go to the bank?", "on foot", "by taxi", "by bus", "by motorbike"],
      ["How does he go home?", "by bus", "by taxi", "on foot", "by bicycle"]
    ],
    gaps: [
      ["“It's ten minutes on foot, or you can take a ___.”", "taxi", "« C'est à dix minutes à pied, ou vous pouvez prendre un taxi. »", ["bank", "street", "school"]],
      ["He passes a big shop and the ___.", "hospital", "Il passe devant une grande boutique et l'hôpital.", ["bicycle", "car", "bus"]],
      ["In the evening, he is tired, so he goes home by ___.", "bus", "Le soir, il est fatigué, alors il rentre en bus.", ["shop", "bank", "hospital"]]
    ],
    discuss: ["Explain the way from your house to the market.", "How do you go to work or to school?", "Practise asking for directions in pairs."] },

  // ---------------------------------------------------------------- INTERMÉDIAIRE
  intro: { title: "A new member at the English Club",
    lines: [
      ["Every Saturday afternoon, the English Club meets in a small room near the river.", "Chaque samedi après-midi, le club d'anglais se réunit dans une petite salle près du fleuve."],
      ["Today, there is a new member, and the leader asks him to introduce himself.", "Aujourd'hui, il y a un nouveau membre, et l'animateur lui demande de se présenter."],
      ["He stands up and smiles at everyone.", "Il se lève et sourit à tout le monde."],
      ["“Good afternoon, everyone. My name is Kofi Mensah.”", "« Bon après-midi à tous. Je m'appelle Kofi Mensah. »"],
      ["“I come from Accra, the capital city of Ghana, a country in West Africa.”", "« Je viens d'Accra, la capitale du Ghana, un pays d'Afrique de l'Ouest. »"],
      ["“I am thirty-two years old, and I work as an accountant.”", "« J'ai trente-deux ans et je travaille comme comptable. »"],
      ["“I have been living in Niamey for two years.”", "« J'habite à Niamey depuis deux ans. »"],
      ["“I speak three languages: English, Twi and a little French.”", "« Je parle trois langues : l'anglais, le twi et un peu de français. »"],
      ["“I'm single, but my brother is married and has two children.”", "« Je suis célibataire, mais mon frère est marié et a deux enfants. »"],
      ["“My favourite hobby is football, and I also enjoy cooking.”", "« Mon loisir préféré est le football, et j'aime aussi cuisiner. »"],
      ["Everybody claps, and Amina asks him a question.", "Tout le monde applaudit, et Amina lui pose une question."],
      ["“Why did you choose to live in Niger?”", "« Pourquoi avez-vous choisi de vivre au Niger ? »"],
      ["“Because I found a good job here, and the people are very kind,” he answers.", "« Parce que j'ai trouvé un bon travail ici, et les gens sont très gentils », répond-il."],
      ["Then the leader turns to Amina and says, “Now it's your turn. Tell us your name, your age and your job.”", "Puis l'animateur se tourne vers Amina et dit : « À votre tour. Dites-nous votre nom, votre âge et votre métier. »"],
      ["Amina is a little nervous, but she takes a deep breath and begins.", "Amina est un peu nerveuse, mais elle respire profondément et commence."]
    ],
    questions: [
      ["Where is Kofi from?", "Accra, in Ghana", "Lagos, in Nigeria", "Lomé, in Togo", "Bamako, in Mali"],
      ["What is Kofi's job?", "accountant", "teacher", "doctor", "engineer"],
      ["How many languages does Kofi speak?", "three", "two", "four", "one"],
      ["Why does Kofi live in Niger?", "because he found a good job", "because his wife is from Niger", "because he studies there", "because he likes the weather"]
    ],
    gaps: [
      ["“I am thirty-two years old, and I work as an ___.”", "accountant", "« J'ai trente-deux ans et je travaille comme comptable. »", ["hobby", "country", "language"]],
      ["“I'm ___, but my brother is married and has two children.”", "single", "« Je suis célibataire, mais mon frère est marié et a deux enfants. »", ["married", "city", "job"]],
      ["“My favourite ___ is football, and I also enjoy cooking.”", "hobby", "« Mon loisir préféré est le football, et j'aime aussi cuisiner. »", ["country", "age", "name"]]
    ],
    discuss: ["Introduce yourself in five sentences, like Kofi.", "Why do you want to learn English?", "Ask another member about his or her hobby, then tell the group."] },

  phone: { title: "An important call",
    lines: [
      ["On Wednesday morning, the office phone rings, and Amina answers it.", "Mercredi matin, le téléphone du bureau sonne, et Amina répond."],
      ["“Good morning, Sahel Accounting. This is Amina speaking. How can I help you?”", "« Bonjour, Sahel Accounting. Amina à l'appareil. Que puis-je pour vous ? »"],
      ["“Hello, this is Mrs Johnson from Lagos. Could I speak to Mr Diallo, please?”", "« Bonjour, ici Mme Johnson, de Lagos. Pourrais-je parler à M. Diallo, s'il vous plaît ? »"],
      ["“Hold on, please. I'll check if he is available.”", "« Patientez, s'il vous plaît. Je vérifie s'il est disponible. »"],
      ["Amina calls Mr Diallo's office, but the line is busy.", "Amina appelle le bureau de M. Diallo, mais la ligne est occupée."],
      ["“I'm sorry, Mrs Johnson. He is busy on another call at the moment.”", "« Je suis désolée, Madame Johnson. Il est en ligne pour le moment. »"],
      ["“Can I take a message?”", "« Puis-je prendre un message ? »"],
      ["“Yes, please. Tell him that I need the audit report before Friday.”", "« Oui, s'il vous plaît. Dites-lui que j'ai besoin du rapport d'audit avant vendredi. »"],
      ["“Of course. Could you give me your phone number?”", "« Bien sûr. Pourriez-vous me donner votre numéro de téléphone ? »"],
      ["Mrs Johnson gives her number, and Amina writes it down carefully.", "Mme Johnson donne son numéro, et Amina le note soigneusement."],
      ["“Thank you. He will call you back this afternoon.”", "« Merci. Il vous rappellera cet après-midi. »"],
      ["Just after she hangs up, the phone rings again.", "Juste après qu'elle a raccroché, le téléphone sonne de nouveau."],
      ["“Hello, is this the hospital?” asks a man.", "« Allô, c'est l'hôpital ? » demande un homme."],
      ["“No, sorry. I think you have the wrong number,” Amina says politely.", "« Non, désolée. Je crois que vous vous êtes trompé de numéro », dit poliment Amina."],
      ["At two o'clock, Mr Diallo calls Mrs Johnson back, and everything is fine.", "À quatorze heures, M. Diallo rappelle Mme Johnson, et tout s'arrange."]
    ],
    questions: [
      ["Who does Mrs Johnson want to speak to?", "Mr Diallo", "Amina", "Kofi", "the hospital"],
      ["Why can't Mr Diallo answer?", "he is busy on another call", "he is at the hospital", "he is on holiday", "he is sleeping"],
      ["What does Mrs Johnson need?", "the audit report", "an invoice", "a new phone", "a meeting room"],
      ["When does Mr Diallo call her back?", "at two o'clock", "at ten o'clock", "tomorrow", "on Friday"]
    ],
    gaps: [
      ["“___, please. I'll check if he is available.”", "hold on", "« Patientez, s'il vous plaît. Je vérifie s'il est disponible. »", ["hang up", "wrong number", "busy"]],
      ["Amina calls Mr Diallo's office, but the line is ___.", "busy", "Amina appelle le bureau de M. Diallo, mais la ligne est occupée.", ["available", "message", "number"]],
      ["“No, sorry. I think you have the wrong ___,” Amina says politely.", "number", "« Non, désolée. Je crois que vous vous êtes trompé de numéro », dit poliment Amina.", ["message", "call", "line"]]
    ],
    discuss: ["Practise a phone call in pairs: one person calls, the other takes a message.", "What do you say when someone has the wrong number?", "Is it easier to speak English on the phone or face to face? Why?"] },

  meeting: { title: "The budget meeting",
    lines: [
      ["On Thursday at ten o'clock, there is an important meeting at the office.", "Jeudi à dix heures, il y a une réunion importante au bureau."],
      ["There are six participants around the table.", "Il y a six participants autour de la table."],
      ["Mr Diallo opens the meeting and reads the agenda.", "M. Diallo ouvre la réunion et lit l'ordre du jour."],
      ["The first point is the budget for next year.", "Le premier point est le budget de l'année prochaine."],
      ["Kofi presents a proposal: the company should buy new computers.", "Kofi présente une proposition : l'entreprise devrait acheter de nouveaux ordinateurs."],
      ["“In my opinion, our computers are too old and too slow,” he says.", "« À mon avis, nos ordinateurs sont trop vieux et trop lents », dit-il."],
      ["Amina agrees with him, but she has a question.", "Amina est d'accord avec lui, mais elle a une question."],
      ["“I agree with you, Kofi, but can our budget pay for ten computers?”", "« Je suis d'accord avec toi, Kofi, mais notre budget peut-il payer dix ordinateurs ? »"],
      ["Another colleague, Mrs Sow, disagrees.", "Une autre collègue, Mme Sow, n'est pas d'accord."],
      ["“I see your point, but I think we should train the staff first.”", "« Je comprends votre point de vue, mais je pense que nous devrions d'abord former le personnel. »"],
      ["They discuss the proposal for thirty minutes.", "Ils discutent de la proposition pendant trente minutes."],
      ["Finally, they make a decision: five computers this year and five next year.", "Finalement, ils prennent une décision : cinq ordinateurs cette année et cinq l'année prochaine."],
      ["The deadline for the purchase is the end of March.", "La date limite pour l'achat est la fin mars."],
      ["Amina writes the minutes of the meeting.", "Amina rédige le compte rendu de la réunion."],
      ["Mr Diallo says, “Thank you, everyone. Let's check our schedule and meet again next month.”", "M. Diallo dit : « Merci à tous. Vérifions notre planning et retrouvons-nous le mois prochain. »"]
    ],
    questions: [
      ["How many participants are there?", "six", "five", "ten", "three"],
      ["What is Kofi's proposal?", "to buy new computers", "to train the staff", "to hire a new accountant", "to change the office"],
      ["What is the final decision?", "five computers this year and five next year", "ten computers this year", "no new computers", "train the staff first"],
      ["Who writes the minutes?", "Amina", "Kofi", "Mr Diallo", "Mrs Sow"]
    ],
    gaps: [
      ["Mr Diallo opens the meeting and reads the ___.", "agenda", "M. Diallo ouvre la réunion et lit l'ordre du jour.", ["deadline", "budget", "decision"]],
      ["Kofi presents a ___: the company should buy new computers.", "proposal", "Kofi présente une proposition : l'entreprise devrait acheter de nouveaux ordinateurs.", ["schedule", "minutes", "participant"]],
      ["The ___ for the purchase is the end of March.", "deadline", "La date limite pour l'achat est la fin mars.", ["agenda", "proposal", "minutes"]]
    ],
    discuss: ["Give your opinion: should a small company buy new computers or train its staff first?", "Practise agreeing and disagreeing politely with your partner.", "What makes a good meeting?"] },

  money: { title: "Ibrahim at the bank",
    lines: [
      ["Ibrahim wants to buy a motorbike to go to school.", "Ibrahim veut acheter une moto pour aller à l'école."],
      ["He doesn't have enough money, so he goes to the bank on Monday morning.", "Il n'a pas assez d'argent, alors il va à la banque lundi matin."],
      ["First, he asks the bank clerk for the balance of his account.", "D'abord, il demande à l'employée de banque le solde de son compte."],
      ["“You have three hundred and fifty thousand francs,” she says.", "« Vous avez trois cent cinquante mille francs », dit-elle."],
      ["“The motorbike costs seven hundred thousand francs. Can I get a loan?”", "« La moto coûte sept cent mille francs. Puis-je obtenir un prêt ? »"],
      ["“Yes. The interest rate is nine percent a year, and you can pay over twelve months.”", "« Oui. Le taux d'intérêt est de neuf pour cent par an, et vous pouvez rembourser sur douze mois. »"],
      ["Ibrahim is not sure, so he calls Amina, who is an accountant.", "Ibrahim hésite, alors il appelle Amina, qui est comptable."],
      ["“Is nine percent a good rate?” he asks.", "« Neuf pour cent, c'est un bon taux ? » demande-t-il."],
      ["“It's not bad, but don't forget the insurance and the tax,” Amina answers.", "« Ce n'est pas mal, mais n'oublie pas l'assurance et la taxe », répond Amina."],
      ["Ibrahim decides to take the loan.", "Ibrahim décide de prendre le prêt."],
      ["He also asks for a credit card, so he doesn't need to carry a lot of cash.", "Il demande aussi une carte bancaire, pour ne pas avoir à porter beaucoup d'espèces."],
      ["The next day, the bank makes a transfer to the motorbike seller.", "Le lendemain, la banque fait un virement au vendeur de motos."],
      ["The seller gives Ibrahim a receipt and the keys.", "Le vendeur donne à Ibrahim un reçu et les clés."],
      ["Ibrahim is very happy. Now he can ride to school in ten minutes.", "Ibrahim est très content. Maintenant, il peut aller à l'école en dix minutes."],
      ["“But remember,” says Amina, “every month, the payment comes out of your bank account!”", "« Mais n'oublie pas, dit Amina, chaque mois, le remboursement sort de ton compte bancaire ! »"]
    ],
    questions: [
      ["Why does Ibrahim go to the bank?", "to get a loan for a motorbike", "to open an account", "to pay his tax", "to change money"],
      ["What is the balance of his account?", "three hundred and fifty thousand francs", "seven hundred thousand francs", "ninety thousand francs", "one million francs"],
      ["What is the interest rate?", "nine percent", "twelve percent", "five percent", "nineteen percent"],
      ["What does the seller give him?", "a receipt and the keys", "a credit card", "some cash", "a loan"]
    ],
    gaps: [
      ["First, he asks the bank clerk for the ___ of his account.", "balance", "D'abord, il demande à l'employée de banque le solde de son compte.", ["receipt", "tax", "transfer"]],
      ["Ibrahim decides to take the ___.", "loan", "Ibrahim décide de prendre le prêt.", ["cash", "balance", "receipt"]],
      ["The seller gives Ibrahim a ___ and the keys.", "receipt", "Le vendeur donne à Ibrahim un reçu et les clés.", ["loan", "tax", "balance"]]
    ],
    discuss: ["Do you prefer to pay in cash or by card? Why?", "What advice would you give to someone who wants a loan?", "Explain one money word from the story to your partner, in English."] },

  travel: { title: "Amina goes to Accra",
    lines: [
      ["Amina has a training course in Accra, the capital of Ghana.", "Amina a une formation à Accra, la capitale du Ghana."],
      ["It is her first trip to an English-speaking country.", "C'est son premier voyage dans un pays anglophone."],
      ["On Monday morning, Ibrahim drives her to the airport in Niamey.", "Lundi matin, Ibrahim la conduit à l'aéroport de Niamey."],
      ["She shows her ticket and her passport at the check-in desk.", "Elle montre son billet et son passeport au comptoir d'enregistrement."],
      ["Her luggage is not heavy: one small suitcase and a bag.", "Ses bagages ne sont pas lourds : une petite valise et un sac."],
      ["Unfortunately, there is a delay of two hours because of the weather.", "Malheureusement, il y a un retard de deux heures à cause de la météo."],
      ["Amina is a little nervous, so she reads her English notebook.", "Amina est un peu nerveuse, alors elle relit son cahier d'anglais."],
      ["Finally, the flight leaves at eleven o'clock.", "Finalement, le vol part à onze heures."],
      ["On arrival in Accra, Kofi's cousin, Ama, is waiting for her.", "À l'arrivée à Accra, la cousine de Kofi, Ama, l'attend."],
      ["“Welcome to Ghana! Did you have a good flight?” Ama asks.", "« Bienvenue au Ghana ! Vous avez fait bon vol ? » demande Ama."],
      ["“Yes, thank you, but it was late,” Amina answers.", "« Oui, merci, mais il était en retard », répond Amina."],
      ["They take a taxi to the hotel.", "Elles prennent un taxi pour aller à l'hôtel."],
      ["At the reception, Amina says, “Good evening. I have a reservation for five nights.”", "À la réception, Amina dit : « Bonsoir. J'ai une réservation pour cinq nuits. »"],
      ["The receptionist gives her a key and a map of the city.", "Le réceptionniste lui donne une clé et un plan de la ville."],
      ["That night, Amina calls her family: “I spoke English all day, and people understood me!”", "Ce soir-là, Amina appelle sa famille : « J'ai parlé anglais toute la journée, et les gens m'ont comprise ! »"]
    ],
    questions: [
      ["Where is the training course?", "in Accra", "in Lagos", "in Niamey", "in London"],
      ["How long is the delay?", "two hours", "one hour", "five hours", "thirty minutes"],
      ["Who is waiting for Amina in Accra?", "Kofi's cousin, Ama", "Kofi", "Ibrahim", "Mr Diallo"],
      ["How many nights is the reservation for?", "five", "two", "three", "seven"]
    ],
    gaps: [
      ["She shows her ticket and her ___ at the check-in desk.", "passport", "Elle montre son billet et son passeport au comptoir d'enregistrement.", ["map", "hotel", "delay"]],
      ["Unfortunately, there is a ___ of two hours because of the weather.", "delay", "Malheureusement, il y a un retard de deux heures à cause de la météo.", ["ticket", "reservation", "luggage"]],
      ["The receptionist gives her a key and a ___ of the city.", "map", "Le réceptionniste lui donne une clé et un plan de la ville.", ["flight", "passport", "ticket"]]
    ],
    discuss: ["Tell the group about a trip you made.", "Practise checking in at a hotel, in pairs.", "Which English-speaking country would you like to visit? Why?"] },

  health: { title: "Moussa is sick",
    lines: [
      ["On Tuesday night, Moussa feels very hot and tired.", "Mardi soir, Moussa a très chaud et se sent fatigué."],
      ["Amina checks his temperature: he has a fever of thirty-nine degrees.", "Amina prend sa température : il a trente-neuf de fièvre."],
      ["He also has a bad cough and a headache.", "Il a aussi une forte toux et mal à la tête."],
      ["The next morning, Amina calls the hospital to make an appointment.", "Le lendemain matin, Amina appelle l'hôpital pour prendre rendez-vous."],
      ["“Can the doctor see my son today, please?”", "« Le médecin peut-il voir mon fils aujourd'hui, s'il vous plaît ? »"],
      ["“Yes, come at nine o'clock,” says the receptionist.", "« Oui, venez à neuf heures », dit la réceptionniste."],
      ["At the hospital, a nurse takes Moussa's temperature again.", "À l'hôpital, une infirmière reprend la température de Moussa."],
      ["Then the doctor examines him carefully.", "Ensuite, le médecin l'examine attentivement."],
      ["“First, we will do a malaria test,” the doctor says.", "« D'abord, nous allons faire un test de paludisme », dit le médecin."],
      ["Twenty minutes later, he smiles: “Good news, the test is negative. It's a bad cold.”", "Vingt minutes plus tard, il sourit : « Bonne nouvelle, le test est négatif. C'est un gros rhume. »"],
      ["He writes a prescription for some medicine.", "Il rédige une ordonnance pour des médicaments."],
      ["“Take this medicine twice a day for five days, and drink a lot of water.”", "« Prenez ce médicament deux fois par jour pendant cinq jours, et buvez beaucoup d'eau. »"],
      ["“He should rest at home and not go to school this week.”", "« Il doit se reposer à la maison et ne pas aller à l'école cette semaine. »"],
      ["On the way home, Amina buys the medicine at the pharmacy.", "Sur le chemin du retour, Amina achète les médicaments à la pharmacie."],
      ["After three days, the fever is gone, and Moussa wants to play football again.", "Au bout de trois jours, la fièvre est partie, et Moussa veut rejouer au football."]
    ],
    questions: [
      ["What is Moussa's temperature?", "thirty-nine degrees", "thirty-seven degrees", "forty-one degrees", "thirty-five degrees"],
      ["What test does the doctor do first?", "a malaria test", "an eye test", "an English test", "a blood pressure test"],
      ["How often must Moussa take the medicine?", "twice a day", "once a day", "three times a day", "every hour"],
      ["When does the fever go?", "after three days", "after one day", "after a week", "after five days"]
    ],
    gaps: [
      ["He also has a bad cough and a ___.", "headache", "Il a aussi une forte toux et mal à la tête.", ["pharmacy", "nurse", "appointment"]],
      ["The next morning, Amina calls the hospital to make an ___.", "appointment", "Le lendemain matin, Amina appelle l'hôpital pour prendre rendez-vous.", ["medicine", "fever", "doctor"]],
      ["On the way home, Amina buys the medicine at the ___.", "pharmacy", "Sur le chemin du retour, Amina achète les médicaments à la pharmacie.", ["nurse", "headache", "fever"]]
    ],
    discuss: ["What do you do when you have a fever?", "Practise a dialogue between a patient and a doctor.", "What can we do every day to stay healthy?"] }
};
