import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface ClinicNotificationEmailProps {
  patientName: string;
  phone: string;
  email: string;
  serviceName: string;
  date: string;
  time: string;
  comments?: string;
  paymentMethod: string;
}

export default function ClinicNotificationEmail({
  patientName,
  phone,
  email,
  serviceName,
  date,
  time,
  comments,
  paymentMethod,
}: ClinicNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nouveau rendez-vous : {patientName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>📅 Nouveau rendez-vous reçu</Heading>

          <Section style={detailsBox}>
            <Text style={detailRow}>
              <strong>Patient :</strong> {patientName}
            </Text>
            <Text style={detailRow}>
              <strong>Téléphone :</strong> {phone}
            </Text>
            <Text style={detailRow}>
              <strong>Email :</strong> {email}
            </Text>
            <Text style={detailRow}>
              <strong>Service :</strong> {serviceName}
            </Text>
            <Text style={detailRow}>
              <strong>Date :</strong> {date}
            </Text>
            <Text style={detailRow}>
              <strong>Heure :</strong> {time}
            </Text>
            <Text style={detailRow}>
              <strong>Paiement :</strong>{" "}
              {paymentMethod === "ORANGE_MONEY" ? "Orange Money" : "Sur place"}
            </Text>
            {comments && (
              <Text style={detailRow}>
                <strong>Commentaires :</strong> {comments}
              </Text>
            )}
          </Section>

          <Hr style={hr} />
          <Text style={footerText}>
            Connectez-vous au tableau de bord pour confirmer ou gérer ce
            rendez-vous.
          </Text>
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

const heading = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#0b2f70",
};

const detailsBox = {
  backgroundColor: "#eef5ff",
  borderRadius: "12px",
  padding: "20px",
  margin: "20px 0",
};

const detailRow = {
  fontSize: "14px",
  color: "#374151",
  margin: "4px 0",
};

const hr = { borderColor: "#e5e7eb", margin: "24px 0" };

const footerText = {
  fontSize: "12px",
  color: "#9ca3af",
};
