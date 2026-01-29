// lib/forms.ts
export type RequirementKey =
  | "signature"
  | "fee"
  | "supportingDoc"
  | "correctForm"
  | "notarized";

export type FormTemplate = {
  title: string;
  code: string;
  flavor: string;
  requirements: Array<{ key: RequirementKey; label: string }>;
};

export const FORM_TEMPLATES: FormTemplate[] = [
  {
    title: "Planetary Entry Permit",
    code: "8-C",
    flavor: "For all non-terrestrial entities requesting \"temporary\" occupation.",
    requirements: [
      { key: "signature", label: "Entry Signature" },
      { key: "fee", label: "Docking Fee Receipt" },
      { key: "supportingDoc", label: "Planetary Passport" },
      { key: "correctForm", label: "Form 8-C" },
      { key: "notarized", label: "Embassy Notary" },
    ],
  },
  {
    title: "Orbital Parking Validation",
    code: "OPV-2",
    flavor: "No hovering within county sightlines without validation.",
    requirements: [
      { key: "signature", label: "Landing Officer Sign" },
      { key: "fee", label: "Parking Meter Stub" },
      { key: "correctForm", label: "OPV-2 Permit" },
      { key: "notarized", label: "Harbor Notary" },
      { key: "supportingDoc", label: "Orbit Slot Proof" },
    ],
  },
  {
    title: "Telepathic Networking License",
    code: "TN-4",
    flavor: "Collective cognition is subject to local noise ordinances.",
    requirements: [
      { key: "supportingDoc", label: "Signal Ethics Brief" },
      { key: "signature", label: "Neural Signature" },
      { key: "fee", label: "Bandwidth Fee Receipt" },
      { key: "correctForm", label: "TN-4 License" },
      { key: "notarized", label: "Cognitive Notary" },
    ],
  },
  {
    title: "Invasion Impact Assessment",
    code: "EIA-12",
    flavor: "Please identify all affected wetlands, moods, and timelines.",
    requirements: [
      { key: "supportingDoc", label: "Wetlands Survey" },
      { key: "fee", label: "Impact Fee Receipt" },
      { key: "signature", label: "Lead Analyst Sign" },
      { key: "notarized", label: "Environmental Notary" },
      { key: "correctForm", label: "EIA-12 Packet" },
    ],
  },
  {
    title: "Hive Mind Collective Disclosure",
    code: "HMCBD-19",
    flavor: "List all consciousnesses with >10% voting share.",
    requirements: [
      { key: "signature", label: "Collective Sign" },
      { key: "supportingDoc", label: "Member Roster" },
      { key: "correctForm", label: "HMCBD-19 Sheet" },
      { key: "fee", label: "Registry Fee" },
      { key: "notarized", label: "Unity Notary" },
    ],
  },
  {
    title: "Expedite Request (Emergency)",
    code: "X-1",
    flavor: "Submitted under \"cosmic urgency.\" Missing one item by design.",
    requirements: [
      { key: "signature", label: "Emergency Signoff" },
      { key: "fee", label: "Rush Fee Receipt" },
      { key: "supportingDoc", label: "Urgency Memo" },
      { key: "correctForm", label: "X-1 Form" },
      { key: "notarized", label: "Afterhours Notary" },
    ],
  },
];

export const REQUIREMENT_META: Record<
  RequirementKey,
  { short: string; emoji: string }
> = {
  signature: { short: "SIG", emoji: "SIG" },
  fee: { short: "FEE", emoji: "FEE" },
  supportingDoc: { short: "DOC", emoji: "DOC" },
  correctForm: { short: "FORM", emoji: "FORM" },
  notarized: { short: "NOTARY", emoji: "NOTARY" },
};
