// In-memory mock database for PatientIQ
// Used as a fallback when the PostgreSQL database is not available or connected

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  createdAt: Date;
}

export interface MockPatient {
  id: string;
  userId: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
}

export interface MockDoctor {
  id: string;
  userId: string;
  specialty: string;
  licenseNumber: string;
  bio: string;
  phone: string;
}

export interface MockMedicalRecord {
  id: string;
  patientId: string;
  recordType: "CONDITION" | "ALLERGY" | "MEDICATION" | "VISIT";
  title: string;
  description: string;
  status: string;
  date: string;
  provider: string;
}

export interface MockDocument {
  id: string;
  patientId: string;
  title: string;
  fileUrl: string;
  fileType: string;
  category: "LAB_REPORT" | "PRESCRIPTION" | "DISCHARGE_SUMMARY" | "IMAGING" | "OTHER";
  uploadedAt: string;
}

export interface MockLabResult {
  id: string;
  patientId: string;
  testName: string;
  testDate: string;
  resultValue: string;
  referenceRange: string;
  unit: string;
  status: "NORMAL" | "HIGH" | "LOW" | "CRITICAL";
  notes: string;
}

export interface MockAppointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  reason: string;
  notes: string;
}

export interface MockMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  sentAt: string;
  isRead: boolean;
}

export interface MockAuditLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

// Initial Data Store
const users: MockUser[] = [
  { id: "u-patient-1", name: "Jane Doe", email: "patient@patientiq.com", role: "PATIENT", createdAt: new Date("2026-01-15") },
  { id: "u-doctor-1", name: "Dr. Sarah Jenkins", email: "doctor@patientiq.com", role: "DOCTOR", createdAt: new Date("2025-06-01") },
  { id: "u-doctor-2", name: "Dr. Alex Mercer", email: "doctor2@patientiq.com", role: "DOCTOR", createdAt: new Date("2025-08-10") },
  { id: "u-admin-1", name: "System Admin", email: "admin@patientiq.com", role: "ADMIN", createdAt: new Date("2025-01-01") }
];

const patients: MockPatient[] = [
  {
    id: "p-1",
    userId: "u-patient-1",
    phone: "+1 (555) 019-2834",
    dateOfBirth: "1985-05-12",
    gender: "Female",
    bloodType: "A+",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    emergencyContactName: "John Doe",
    emergencyContactPhone: "+1 (555) 019-2835",
    emergencyContactRelation: "Spouse"
  }
];

const doctors: MockDoctor[] = [
  {
    id: "d-1",
    userId: "u-doctor-1",
    specialty: "Cardiology",
    licenseNumber: "MD-98231",
    bio: "Dr. Jenkins is an experienced cardiologist specializing in preventive medicine and heart health management. She has been in practice for over 12 years.",
    phone: "+1 (555) 014-9922"
  },
  {
    id: "d-2",
    userId: "u-doctor-2",
    specialty: "Neurology",
    licenseNumber: "MD-44391",
    bio: "Dr. Mercer specializes in central nervous system disorders and advanced headache and sleep treatments.",
    phone: "+1 (555) 014-8844"
  }
];

const medicalRecords: MockMedicalRecord[] = [
  { id: "mr-1", patientId: "p-1", recordType: "CONDITION", title: "Hypertension (High Blood Pressure)", description: "Diagnosed during routine annual checkup. Managed with medication and low-sodium diet.", status: "Active", date: "2024-02-10", provider: "Dr. Sarah Jenkins" },
  { id: "mr-2", patientId: "p-1", recordType: "ALLERGY", title: "Penicillin Allergy", description: "Hives and respiratory distress upon exposure. Avoid all beta-lactam antibiotics.", status: "Active", date: "2021-08-15", provider: "Mercy General Hospital" },
  { id: "mr-3", patientId: "p-1", recordType: "MEDICATION", title: "Lisinopril 10mg", description: "Take 1 tablet daily by mouth. Refills remaining: 3.", status: "Active", date: "2026-02-10", provider: "Dr. Sarah Jenkins" },
  { id: "mr-4", patientId: "p-1", recordType: "VISIT", title: "Routine Cardiology Follow-up", description: "Checked blood pressure (132/82). Adjusted diet advice. Recommended next checkup in 6 months.", status: "Completed", date: "2026-03-15", provider: "Dr. Sarah Jenkins" }
];

const documents: MockDocument[] = [
  { id: "doc-1", patientId: "p-1", title: "Discharge Summary - Cardiology Unit", fileUrl: "/files/discharge_summary.pdf", fileType: "pdf", category: "DISCHARGE_SUMMARY", uploadedAt: "2026-03-16T10:00:00Z" },
  { id: "doc-2", patientId: "p-1", title: "Chest X-Ray Imaging Report", fileUrl: "/files/chest_xray.png", fileType: "png", category: "IMAGING", uploadedAt: "2026-01-10T14:30:00Z" }
];

const labResults: MockLabResult[] = [
  { id: "lab-1", patientId: "p-1", testName: "Complete Blood Count (CBC)", testDate: "2026-03-01", resultValue: "White Blood Cells: 6.8 x10^3/uL, Red Blood Cells: 4.4 x10^6/uL, Hemoglobin: 13.5 g/dL, Platelets: 245 x10^3/uL", referenceRange: "WBC: 4.5-11.0, RBC: 4.0-5.2, Hb: 12.0-15.5", unit: "Standard", status: "NORMAL", notes: "All CBC values fall within normal physiological ranges." },
  { id: "lab-2", patientId: "p-1", testName: "Lipid Panel", testDate: "2026-05-15", resultValue: "Total Cholesterol: 215, LDL: 138, HDL: 47, Triglycerides: 155", referenceRange: "Total < 200, LDL < 100, HDL > 40, Triglycerides < 150", unit: "mg/dL", status: "HIGH", notes: "Slightly elevated LDL and Triglycerides. Advised to restrict high-fat foods and retest in 3 months." }
];

const appointments: MockAppointment[] = [
  { id: "app-1", patientId: "p-1", doctorId: "d-1", dateTime: "2026-06-25T10:00:00.000Z", status: "CONFIRMED", reason: "Follow-up check on blood pressure and check refills for Lisinopril.", notes: "Bring current blood pressure logs." },
  { id: "app-2", patientId: "p-1", doctorId: "d-2", dateTime: "2026-07-10T14:30:00.000Z", status: "PENDING", reason: "First consultation for persistent sleep issues and headaches.", notes: "Initial consult." }
];

const messages: MockMessage[] = [
  { id: "msg-1", senderId: "u-doctor-1", receiverId: "u-patient-1", content: "Hello Jane, I reviewed your recent lipid panel. Since your LDL cholesterol is slightly high, I want to discuss dietary adjustments. Let's talk during your follow-up appointment on June 25th.", sentAt: "2026-05-16T09:15:00Z", isRead: true },
  { id: "msg-2", senderId: "u-patient-1", receiverId: "u-doctor-1", content: "Thank you Dr. Jenkins. I will start tracking my meals and bring my logs. Can I continue the current dose of Lisinopril?", sentAt: "2026-05-16T11:20:00Z", isRead: true },
  { id: "msg-3", senderId: "u-doctor-1", receiverId: "u-patient-1", content: "Yes, please continue with Lisinopril 10mg daily as prescribed. We will check your blood pressure at the clinic.", sentAt: "2026-05-16T12:00:00Z", isRead: true }
];

const auditLogs: MockAuditLog[] = [
  { id: "log-1", userId: "u-admin-1", action: "SYSTEM_INITIALIZE", details: "Mock Database initialized with default records.", ipAddress: "127.0.0.1", timestamp: "2026-06-15T18:00:00Z" }
];

// Helper Functions
export const mockDb = {
  getUsers: () => users,
  getUserById: (id: string) => users.find(u => u.id === id),
  getUserByEmail: (email: string) => users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  createUser: (user: Omit<MockUser, "id" | "createdAt">) => {
    const newUser = { ...user, id: `u-${Date.now()}`, createdAt: new Date() };
    users.push(newUser);
    if (user.role === "PATIENT") {
      patients.push({
        id: `p-${Date.now()}`,
        userId: newUser.id,
        phone: "",
        dateOfBirth: "",
        gender: "",
        bloodType: "",
        address: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelation: ""
      });
    }
    return newUser;
  },

  getPatients: () => patients,
  getPatientById: (id: string) => patients.find(p => p.id === id),
  getPatientByUserId: (userId: string) => patients.find(p => p.userId === userId),
  updatePatientProfile: (userId: string, data: Partial<MockPatient>) => {
    const patientIndex = patients.findIndex(p => p.userId === userId);
    if (patientIndex !== -1) {
      patients[patientIndex] = { ...patients[patientIndex], ...data };
      return patients[patientIndex];
    }
    return null;
  },

  getDoctors: () => doctors,
  getDoctorById: (id: string) => doctors.find(d => d.id === id),
  getDoctorByUserId: (userId: string) => doctors.find(d => d.userId === userId),
  
  getMedicalRecords: (patientId: string) => medicalRecords.filter(mr => mr.patientId === patientId),
  createMedicalRecord: (record: Omit<MockMedicalRecord, "id">) => {
    const newRecord = { ...record, id: `mr-${Date.now()}` };
    medicalRecords.push(newRecord);
    return newRecord;
  },

  getDocuments: (patientId: string) => documents.filter(doc => doc.patientId === patientId),
  createDocument: (doc: Omit<MockDocument, "id" | "uploadedAt">) => {
    const newDoc = { ...doc, id: `doc-${Date.now()}`, uploadedAt: new Date().toISOString() };
    documents.push(newDoc);
    return newDoc;
  },

  getLabResults: (patientId: string) => labResults.filter(lr => lr.patientId === patientId),
  createLabResult: (result: Omit<MockLabResult, "id">) => {
    const newResult = { ...result, id: `lab-${Date.now()}` };
    labResults.push(newResult);
    return newResult;
  },

  getAppointments: (patientId?: string, doctorId?: string) => {
    if (patientId) return appointments.filter(app => app.patientId === patientId);
    if (doctorId) return appointments.filter(app => app.doctorId === doctorId);
    return appointments;
  },
  createAppointment: (app: Omit<MockAppointment, "id" | "status">) => {
    const newApp: MockAppointment = { ...app, id: `app-${Date.now()}`, status: "PENDING" };
    appointments.push(newApp);
    return newApp;
  },
  updateAppointmentStatus: (id: string, status: MockAppointment["status"]) => {
    const appIndex = appointments.findIndex(app => app.id === id);
    if (appIndex !== -1) {
      appointments[appIndex].status = status;
      return appointments[appIndex];
    }
    return null;
  },

  getMessages: (userId1: string, userId2: string) => {
    return messages.filter(
      msg =>
        (msg.senderId === userId1 && msg.receiverId === userId2) ||
        (msg.senderId === userId2 && msg.receiverId === userId1)
    ).sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());
  },
  createMessage: (msg: Omit<MockMessage, "id" | "sentAt" | "isRead">) => {
    const newMsg: MockMessage = { ...msg, id: `msg-${Date.now()}`, sentAt: new Date().toISOString(), isRead: false };
    messages.push(newMsg);
    return newMsg;
  },

  getAuditLogs: () => auditLogs,
  createAuditLog: (log: Omit<MockAuditLog, "id" | "timestamp">) => {
    const newLog = { ...log, id: `log-${Date.now()}`, timestamp: new Date().toISOString() };
    auditLogs.push(newLog);
    return newLog;
  }
};
