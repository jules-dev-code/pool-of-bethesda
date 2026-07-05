export interface ServiceData {
  slug: string;
  icon: string; // nom d'icône Lucide
  titleFr: string;
  titleEn: string;
  shortFr: string;
  shortEn: string;
  descriptionFr: string;
  descriptionEn: string;
  benefitsFr: string[];
  benefitsEn: string[];
  processFr: string[];
  processEn: string[];
  aftercareFr: string[];
  aftercareEn: string[];
  duration: number; // minutes
}

export const SERVICES: ServiceData[] = [
  {
    slug: "consultation",
    icon: "Stethoscope",
    titleFr: "Consultation",
    titleEn: "Consultation",
    shortFr: "Un bilan complet de votre santé bucco-dentaire.",
    shortEn: "A complete assessment of your oral health.",
    descriptionFr:
      "Notre consultation initiale permet d'évaluer précisément l'état de votre bouche, de vos dents et de vos gencives grâce à un examen approfondi et, si nécessaire, des radiographies. C'est la première étape essentielle vers un sourire sain.",
    descriptionEn:
      "Our initial consultation allows us to precisely assess the condition of your mouth, teeth and gums through a thorough examination and, if necessary, X-rays. It's the essential first step towards a healthy smile.",
    benefitsFr: [
      "Diagnostic précis et personnalisé",
      "Plan de traitement adapté à vos besoins",
      "Dépistage précoce des problèmes",
    ],
    benefitsEn: [
      "Precise, personalized diagnosis",
      "Treatment plan tailored to your needs",
      "Early detection of issues",
    ],
    processFr: [
      "Accueil et recueil de vos antécédents",
      "Examen clinique complet",
      "Radiographies si nécessaire",
      "Explication du diagnostic et des options",
    ],
    processEn: [
      "Welcome and medical history review",
      "Complete clinical examination",
      "X-rays if necessary",
      "Diagnosis and options explained",
    ],
    aftercareFr: [
      "Suivre les recommandations personnalisées",
      "Planifier les soins conseillés",
    ],
    aftercareEn: [
      "Follow personalized recommendations",
      "Schedule recommended care",
    ],
    duration: 30,
  },
  {
    slug: "detartrage",
    icon: "Sparkles",
    titleFr: "Détartrage",
    titleEn: "Scaling",
    shortFr: "Élimination du tartre pour des dents propres et saines.",
    shortEn: "Tartar removal for clean, healthy teeth.",
    descriptionFr:
      "Le détartrage élimine la plaque dentaire et le tartre accumulés, prévenant ainsi les caries et les maladies parodontales. Réalisé avec des instruments de précision, ce soin redonne éclat et fraîcheur à votre sourire.",
    descriptionEn:
      "Scaling removes accumulated plaque and tartar, preventing cavities and gum disease. Performed with precision instruments, this treatment restores brightness and freshness to your smile.",
    benefitsFr: [
      "Prévention des caries et maladies des gencives",
      "Haleine plus fraîche",
      "Dents visuellement plus blanches",
    ],
    benefitsEn: [
      "Prevents cavities and gum disease",
      "Fresher breath",
      "Visibly whiter teeth",
    ],
    processFr: [
      "Examen préalable des gencives",
      "Détartrage aux ultrasons",
      "Polissage final",
    ],
    processEn: [
      "Preliminary gum examination",
      "Ultrasonic scaling",
      "Final polishing",
    ],
    aftercareFr: [
      "Éviter les aliments très chauds ou froids 24h",
      "Maintenir une bonne hygiène quotidienne",
    ],
    aftercareEn: [
      "Avoid very hot or cold foods for 24h",
      "Maintain good daily hygiene",
    ],
    duration: 45,
  },
  {
    slug: "extraction",
    icon: "Pointer",
    titleFr: "Extraction dentaire",
    titleEn: "Tooth Extraction",
    shortFr: "Extraction en douceur, dans le respect de votre confort.",
    shortEn: "Gentle extraction, respecting your comfort.",
    descriptionFr:
      "Lorsqu'une dent ne peut plus être sauvée, notre équipe procède à son extraction avec douceur et précision, sous anesthésie locale, en veillant à votre confort à chaque étape.",
    descriptionEn:
      "When a tooth can no longer be saved, our team performs its extraction gently and precisely, under local anesthesia, ensuring your comfort at every step.",
    benefitsFr: [
      "Soulagement immédiat de la douleur",
      "Prévention des infections",
      "Procédure sécurisée et encadrée",
    ],
    benefitsEn: [
      "Immediate pain relief",
      "Infection prevention",
      "Safe, supervised procedure",
    ],
    processFr: [
      "Anesthésie locale",
      "Extraction délicate",
      "Consignes post-opératoires",
    ],
    processEn: [
      "Local anesthesia",
      "Gentle extraction",
      "Post-operative instructions",
    ],
    aftercareFr: [
      "Éviter de fumer pendant 48h",
      "Appliquer une compresse froide si besoin",
      "Respecter les consignes de cicatrisation",
    ],
    aftercareEn: [
      "Avoid smoking for 48h",
      "Apply a cold compress if needed",
      "Follow healing instructions",
    ],
    duration: 40,
  },
  {
    slug: "soins-conservateurs",
    icon: "ShieldCheck",
    titleFr: "Soins conservateurs",
    titleEn: "Restorative Care",
    shortFr: "Traiter et préserver vos dents naturelles.",
    shortEn: "Treating and preserving your natural teeth.",
    descriptionFr:
      "Nos soins conservateurs (obturations, traitements de caries) visent à traiter les dents atteintes tout en préservant un maximum de tissu dentaire naturel, pour une santé bucco-dentaire durable.",
    descriptionEn:
      "Our restorative care (fillings, cavity treatments) aims to treat affected teeth while preserving as much natural tooth tissue as possible, for lasting oral health.",
    benefitsFr: [
      "Préservation de la dent naturelle",
      "Résultat esthétique discret",
      "Solution durable",
    ],
    benefitsEn: [
      "Preserves the natural tooth",
      "Discreet aesthetic result",
      "Long-lasting solution",
    ],
    processFr: [
      "Anesthésie locale si nécessaire",
      "Retrait de la carie",
      "Obturation esthétique",
    ],
    processEn: [
      "Local anesthesia if needed",
      "Cavity removal",
      "Aesthetic filling",
    ],
    aftercareFr: ["Éviter de mâcher du côté traité quelques heures"],
    aftercareEn: ["Avoid chewing on the treated side for a few hours"],
    duration: 60,
  },
  {
    slug: "protheses",
    icon: "Gem",
    titleFr: "Prothèses dentaires",
    titleEn: "Dental Prosthetics",
    shortFr: "Retrouvez un sourire complet et fonctionnel.",
    shortEn: "Regain a complete, functional smile.",
    descriptionFr:
      "Couronnes, bridges ou prothèses amovibles : nous concevons des solutions sur-mesure pour restaurer l'esthétique et la fonction de votre sourire, avec des matériaux de haute qualité.",
    descriptionEn:
      "Crowns, bridges or removable dentures: we design custom solutions to restore the aesthetics and function of your smile, using high-quality materials.",
    benefitsFr: [
      "Sourire naturel et fonctionnel",
      "Matériaux durables et biocompatibles",
      "Confort de mastication retrouvé",
    ],
    benefitsEn: [
      "Natural, functional smile",
      "Durable, biocompatible materials",
      "Restored chewing comfort",
    ],
    processFr: [
      "Prise d'empreintes",
      "Fabrication sur-mesure",
      "Pose et ajustements",
    ],
    processEn: [
      "Impressions taken",
      "Custom fabrication",
      "Fitting and adjustments",
    ],
    aftercareFr: [
      "Entretien quotidien recommandé",
      "Contrôles réguliers de suivi",
    ],
    aftercareEn: [
      "Daily maintenance recommended",
      "Regular follow-up check-ups",
    ],
    duration: 90,
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
