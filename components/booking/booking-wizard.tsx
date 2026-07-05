"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/booking/progress-indicator";
import { StepService } from "@/components/booking/steps/step-service";
import { StepDate } from "@/components/booking/steps/step-date";
import { StepTime } from "@/components/booking/steps/step-time";
import { StepInfo } from "@/components/booking/steps/step-info";
import { StepPayment } from "@/components/booking/steps/step-payment";
import { StepSummary } from "@/components/booking/steps/step-summary";
import { StepSuccess } from "@/components/booking/steps/step-success";
import { getServiceBySlug } from "@/lib/data/services";
import { createAppointment } from "@/lib/actions/appointments";
import type { BookingInfoValues } from "@/lib/validations/booking";
import type { Locale, PaymentMethod } from "@/lib/types";

interface BookingWizardProps {
  locale: Locale;
}

const STEP_LABELS: Record<Locale, string[]> = {
  fr: ["Service", "Date", "Heure", "Infos", "Paiement", "Résumé"],
  en: ["Service", "Date", "Time", "Info", "Payment", "Summary"],
};

const INFO_FORM_ID = "booking-info-form";

export function BookingWizard({ locale }: BookingWizardProps) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service");

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [serviceSlug, setServiceSlug] = useState<string | null>(
    preselected && getServiceBySlug(preselected) ? preselected : null
  );
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [info, setInfo] = useState<BookingInfoValues | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("ONSITE");

  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;

  const stepsCanContinue = [
    !!serviceSlug,
    !!date,
    !!time,
    true, // validated by form submit itself
    true,
    true,
  ];

  function goNext() {
    if (step === 3) {
      // Déclenche la soumission du formulaire d'infos (étape 4)
      document
        .getElementById(INFO_FORM_ID)
        ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      return;
    }
    setStep((s) => Math.min(s + 1, STEP_LABELS[locale].length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleInfoSubmit(values: BookingInfoValues) {
    setInfo(values);
    setStep(4);
  }

  async function handleConfirm() {
    if (!service || !date || !time || !info) return;
    setSubmitting(true);

    const result = await createAppointment(
      {
        serviceSlug: service.slug,
        date: date.toISOString().split("T")[0],
        time,
        patientName: info.patientName,
        phone: info.phone,
        email: info.email,
        comments: info.comments,
        paymentMethod,
      },
      locale
    );

    setSubmitting(false);

    if (result.success) {
      setDone(true);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  if (done) {
    return <StepSuccess locale={locale} />;
  }

  return (
    <div>
      <ProgressIndicator steps={STEP_LABELS[locale]} currentStep={step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <StepService
              locale={locale}
              selectedSlug={serviceSlug}
              onSelect={(slug) => {
                setServiceSlug(slug);
                setStep(1);
              }}
            />
          )}

          {step === 1 && (
            <StepDate
              locale={locale}
              selectedDate={date}
              onSelect={(d) => {
                setDate(d);
                setTime(null);
                setStep(2);
              }}
            />
          )}

          {step === 2 && date && (
            <StepTime
              locale={locale}
              date={date}
              selectedTime={time}
              onSelect={(t) => {
                setTime(t);
                setStep(3);
              }}
            />
          )}

          {step === 3 && (
            <StepInfo
              locale={locale}
              formId={INFO_FORM_ID}
              defaultValues={info ?? undefined}
              onSubmit={handleInfoSubmit}
            />
          )}

          {step === 4 && (
            <StepPayment
              locale={locale}
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />
          )}

          {step === 5 && service && date && time && info && (
            <StepSummary
              locale={locale}
              service={service}
              date={date}
              time={time}
              patientName={info.patientName}
              phone={info.phone}
              email={info.email}
              comments={info.comments}
              paymentMethod={paymentMethod}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mx-auto mt-10 flex max-w-xl items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={goBack}
          disabled={step === 0 || submitting}
        >
          <ChevronLeft className="h-4 w-4" />
          {locale === "fr" ? "Précédent" : "Back"}
        </Button>

        {step < 5 ? (
          <Button type="button" onClick={goNext} disabled={!stepsCanContinue[step]}>
            {locale === "fr" ? "Suivant" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" onClick={handleConfirm} disabled={submitting} size="lg">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {locale === "fr" ? "Confirmation..." : "Confirming..."}
              </>
            ) : locale === "fr" ? (
              "Confirmer le rendez-vous"
            ) : (
              "Confirm appointment"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
