export type CustomerPlan = "basic" | "standard" | "premium";

export type CustomerRecord = {
  slug: string;
  plan: CustomerPlan;

  groomFullName?: string;
  brideFullName?: string;
  groomName: string;
  brideName: string;
  coupleNames: string;

  dateISO: string;
  ceremonyName: string;
  ceremonyAddress: string;
  ceremonyMapUrl?: string;
  receptionName: string;
  receptionAddress: string;
  receptionMapUrl?: string;

  rsvpWhatsappNumber?: string;
  contactEmail?: string;
  notes?: string;

  createdAt: string;
  updatedAt: string;
};
