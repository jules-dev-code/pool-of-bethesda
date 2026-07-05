export interface FaqData {
  id: string;
  category: string;
  questionFr: string;
  questionEn: string;
  answerFr: string;
  answerEn: string;
}

export const FAQS: FaqData[] = [
  {
    id: "1",
    category: "general",
    questionFr: "À quelle fréquence faut-il consulter un dentiste ?",
    questionEn: "How often should I see a dentist?",
    answerFr:
      "Il est recommandé de consulter au moins une fois tous les six mois pour un contrôle et un détartrage préventif, même en l'absence de douleur.",
    answerEn:
      "It's recommended to visit at least once every six months for a check-up and preventive scaling, even without pain.",
  },
  {
    id: "2",
    category: "soins",
    questionFr: "Le détartrage est-il douloureux ?",
    questionEn: "Is scaling painful?",
    answerFr:
      "Le détartrage est généralement indolore. Une légère sensibilité peut être ressentie chez les personnes aux gencives sensibles, mais elle disparaît rapidement.",
    answerEn:
      "Scaling is generally painless. Slight sensitivity may be felt by people with sensitive gums, but it disappears quickly.",
  },
  {
    id: "3",
    category: "general",
    questionFr: "Les enfants sont-ils pris en charge ?",
    questionEn: "Are children accepted?",
    answerFr:
      "Oui, notre cabinet accueille les enfants dans un environnement rassurant et adapté, avec une approche douce et pédagogique.",
    answerEn:
      "Yes, our clinic welcomes children in a reassuring, adapted environment, with a gentle and educational approach.",
  },
  {
    id: "4",
    category: "paiement",
    questionFr: "Quels sont les moyens de paiement acceptés ?",
    questionEn: "What payment methods are accepted?",
    answerFr:
      "Vous pouvez régler directement au cabinet ou via Orange Money. Le paiement n'est jamais requis pour confirmer votre rendez-vous.",
    answerEn:
      "You can pay directly at the clinic or via Orange Money. Payment is never required to confirm your appointment.",
  },
  {
    id: "5",
    category: "rendez-vous",
    questionFr: "Comment annuler ou modifier un rendez-vous ?",
    questionEn: "How can I cancel or reschedule an appointment?",
    answerFr:
      "Contactez-nous par téléphone ou WhatsApp au moins 24h à l'avance pour annuler ou modifier votre rendez-vous sans frais.",
    answerEn:
      "Contact us by phone or WhatsApp at least 24h in advance to cancel or reschedule your appointment free of charge.",
  },
];
