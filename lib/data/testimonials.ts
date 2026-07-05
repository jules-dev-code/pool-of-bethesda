export interface TestimonialData {
  id: string;
  patient: string;
  rating: number;
  commentFr: string;
  commentEn: string;
}

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: "1",
    patient: "Estelle N.",
    rating: 5,
    commentFr:
      "L'accueil est chaleureux et les soins sont réalisés avec beaucoup de professionnalisme. Je recommande vivement.",
    commentEn:
      "The welcome is warm and the care is provided with great professionalism. I highly recommend it.",
  },
  {
    id: "2",
    patient: "Bertrand K.",
    rating: 5,
    commentFr:
      "Un cabinet moderne, propre et rassurant. Le Dr Myriam prend vraiment le temps d'expliquer chaque étape.",
    commentEn:
      "A modern, clean and reassuring clinic. Dr. Myriam really takes the time to explain every step.",
  },
  {
    id: "3",
    patient: "Aurélie M.",
    rating: 5,
    commentFr:
      "Rendez-vous pris en ligne en quelques minutes, aucune attente sur place. Une expérience très professionnelle.",
    commentEn:
      "Appointment booked online in minutes, no waiting on site. A very professional experience.",
  },
  {
    id: "4",
    patient: "Joseph T.",
    rating: 5,
    commentFr:
      "Enfin un cabinet dentaire où je me sens en confiance avec mes enfants. Le personnel est très patient.",
    commentEn:
      "Finally a dental clinic where I feel confident with my children. The staff is very patient.",
  },
];
