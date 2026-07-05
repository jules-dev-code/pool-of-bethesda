import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";
import { CLINIC } from "@/lib/constants";

interface AppointmentConfirmationEmailProps {
  patientName: string;
  serviceName: string;
  date: string; // déjà formaté, ex: "12 juillet 2026"
  time: string; // "09:30"
  locale?: "fr" | "en";
}

export default function AppointmentConfirmationEmail({
  patientName,
  serviceName,
  date,
  time,
  locale = "fr",
}: AppointmentConfirmationEmailProps) {
  const t =
    locale === "fr"
      ? {
          preview: "Confirmation de votre rendez-vous",
          greeting: `Bonjour ${patientName},`,
          intro:
            "Votre rendez-vous au Cabinet Dentaire Pool of Bethesa a bien été enregistré.",
          details: "Détails de votre rendez-vous",
          service: "Service",
          date: "Date",
          time: "Heure",
          address: "Adresse",
          phone: "Téléphone",
          instructions:
            "Merci de vous présenter 10 minutes avant l'heure prévue. En cas d'empêchement, contactez-nous au moins 24h à l'avance.",
          button: "Voir le cabinet sur la carte",
          signature: "À très bientôt,\nL'équipe du Cabinet Dentaire Pool of Bethesa",
        }
      : {
          preview: "Your appointment confirmation",
          greeting: `Hello ${patientName},`,
          intro:
            "Your appointment at Pool of Bethesda Dental Clinic has been successfully booked.",
          details: "Appointment details",
          service: "Service",
          date: "Date",
          time: "Time",
          address: "Address",
          phone: "Phone",
          instructions:
            "Please arrive 10 minutes before your scheduled time. If you need to reschedule, contact us at least 24h in advance.",
          button: "View clinic on map",
          signature: "See you soon,\nPool of Bethesda Dental Clinic Team",
        };

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Text style={logoText}>Pool of Bethesa</Text>
          </Section>

          <Heading style={heading}>{t.preview}</Heading>
          <Text style={paragraph}>{t.greeting}</Text>
          <Text style={paragraph}>{t.intro}</Text>

          <Section style={detailsBox}>
            <Text style={detailsTitle}>{t.details}</Text>
            <Text style={detailRow}>
              <strong>{t.service} :</strong> {serviceName}
            </Text>
            <Text style={detailRow}>
              <strong>{t.date} :</strong> {date}
            </Text>
            <Text style={detailRow}>
              <strong>{t.time} :</strong> {time}
            </Text>
          </Section>

          <Text style={paragraph}>{t.instructions}</Text>

          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button style={button} href={CLINIC.email ? "#" : "#"}>
              {t.button}
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footerText}>
            {CLINIC.address}
            <br />
            {t.phone} : {CLINIC.phone} — {CLINIC.email}
          </Text>
          <Text style={footerText}>{t.signature}</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f4f7fb",
  fontFamily: "Inter, Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px",
  borderRadius: "16px",
  maxWidth: "560px",
};

const logoSection = { textAlign: "center" as const, marginBottom: "16px" };
const logoText = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#0b2f70",
};

const heading = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#0b2f70",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#374151",
};

const detailsBox = {
  backgroundColor: "#eef5ff",
  borderRadius: "12px",
  padding: "20px",
  margin: "20px 0",
};

const detailsTitle = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#0b2f70",
  marginBottom: "8px",
};

const detailRow = {
  fontSize: "14px",
  color: "#374151",
  margin: "4px 0",
};

const button = {
  backgroundColor: "#134fbf",
  borderRadius: "999px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "none",
  padding: "12px 28px",
};

const hr = { borderColor: "#e5e7eb", margin: "24px 0" };

const footerText = {
  fontSize: "12px",
  color: "#9ca3af",
  lineHeight: "18px",
};
