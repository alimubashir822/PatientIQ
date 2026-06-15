import { db, isDbConnected } from "./db";
import { mockDb } from "./mock-db";
import bcrypt from "bcryptjs";

let useMock = false;
let dbCheckDone = false;

async function checkDatabase() {
  if (dbCheckDone) return;
  const connected = await isDbConnected();
  useMock = !connected;
  dbCheckDone = true;
}

export async function getUserByEmail(email: string) {
  await checkDatabase();
  if (useMock) {
    return mockDb.getUserByEmail(email);
  }
  try {
    return await db.user.findUnique({
      where: { email: email.toLowerCase() }
    });
  } catch {
    return mockDb.getUserByEmail(email);
  }
}

export async function getUserById(id: string) {
  await checkDatabase();
  if (useMock) {
    return mockDb.getUserById(id);
  }
  try {
    return await db.user.findUnique({
      where: { id }
    });
  } catch {
    return mockDb.getUserById(id);
  }
}

export async function getUsers() {
  await checkDatabase();
  if (useMock) {
    return mockDb.getUsers();
  }
  try {
    return await db.user.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch {
    return mockDb.getUsers();
  }
}

export async function createUser(data: any) {
  await checkDatabase();
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  if (useMock) {
    return mockDb.createUser({
      name: data.name,
      email: data.email.toLowerCase(),
      role: data.role || "PATIENT"
    });
  }

  try {
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashedPassword,
        role: data.role || "PATIENT"
      }
    });

    if (user.role === "PATIENT") {
      await db.patient.create({
        data: {
          userId: user.id
        }
      });
    } else if (user.role === "DOCTOR") {
      await db.doctor.create({
        data: {
          userId: user.id,
          specialty: data.specialty || "General Medicine",
          licenseNumber: data.licenseNumber || `LIC-${Date.now()}`
        }
      });
    }

    return user;
  } catch (error) {
    console.error("Prisma createUser failed, falling back to mock:", error);
    return mockDb.createUser({
      name: data.name,
      email: data.email.toLowerCase(),
      role: data.role || "PATIENT"
    });
  }
}

export async function getPatientByUserId(userId: string) {
  await checkDatabase();
  if (useMock) {
    return mockDb.getPatientByUserId(userId);
  }
  try {
    let patient = await db.patient.findUnique({
      where: { userId }
    });
    // Auto-create patient profile if missing but user is PATIENT
    if (!patient) {
      const user = await db.user.findUnique({ where: { id: userId } });
      if (user && user.role === "PATIENT") {
        patient = await db.patient.create({
          data: { userId }
        });
      }
    }
    return patient;
  } catch {
    return mockDb.getPatientByUserId(userId);
  }
}

export async function updatePatientProfile(userId: string, data: any) {
  await checkDatabase();
  if (useMock) {
    return mockDb.updatePatientProfile(userId, data);
  }
  try {
    const patient = await getPatientByUserId(userId);
    if (!patient) return null;
    return await db.patient.update({
      where: { id: patient.id },
      data
    });
  } catch {
    return mockDb.updatePatientProfile(userId, data);
  }
}

export async function getPatients() {
  await checkDatabase();
  if (useMock) {
    const patientList = mockDb.getPatients();
    return patientList.map(p => {
      const u = mockDb.getUserById(p.userId);
      return {
        ...p,
        user: u
      };
    });
  }
  try {
    return await db.patient.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true, image: true }
        }
      }
    });
  } catch {
    const patientList = mockDb.getPatients();
    return patientList.map(p => {
      const u = mockDb.getUserById(p.userId);
      return {
        ...p,
        user: u
      };
    });
  }
}

export async function getDoctors() {
  await checkDatabase();
  if (useMock) {
    const docUsers = mockDb.getUsers().filter(u => u.role === "DOCTOR");
    return docUsers.map(u => {
      const info = mockDb.getDoctorByUserId(u.id);
      return {
        id: info?.id || "",
        userId: u.id,
        user: u,
        specialty: info?.specialty || "",
        licenseNumber: info?.licenseNumber || "",
        bio: info?.bio || "",
        phone: info?.phone || ""
      };
    });
  }
  try {
    return await db.doctor.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true, image: true }
        }
      }
    });
  } catch {
    const docUsers = mockDb.getUsers().filter(u => u.role === "DOCTOR");
    return docUsers.map(u => {
      const info = mockDb.getDoctorByUserId(u.id);
      return {
        id: info?.id || "",
        userId: u.id,
        user: u,
        specialty: info?.specialty || "",
        licenseNumber: info?.licenseNumber || "",
        bio: info?.bio || "",
        phone: info?.phone || ""
      };
    });
  }
}

export async function getDoctorByUserId(userId: string) {
  await checkDatabase();
  if (useMock) {
    return mockDb.getDoctorByUserId(userId);
  }
  try {
    return await db.doctor.findUnique({
      where: { userId },
      include: {
        user: true
      }
    });
  } catch {
    return mockDb.getDoctorByUserId(userId);
  }
}

export async function getMedicalRecords(userId: string) {
  await checkDatabase();
  const patient = await getPatientByUserId(userId);
  if (!patient) return [];

  if (useMock) {
    return mockDb.getMedicalRecords(patient.id);
  }
  try {
    return await db.medicalRecord.findMany({
      where: { patientId: patient.id },
      orderBy: { date: "desc" }
    });
  } catch {
    return mockDb.getMedicalRecords(patient.id);
  }
}

export async function createMedicalRecord(userId: string, data: any) {
  await checkDatabase();
  const patient = await getPatientByUserId(userId);
  if (!patient) return null;

  if (useMock) {
    return mockDb.createMedicalRecord({
      patientId: patient.id,
      recordType: data.recordType,
      title: data.title,
      description: data.description || "",
      status: data.status || "Active",
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      provider: data.provider || "PatientIQ System"
    });
  }
  try {
    return await db.medicalRecord.create({
      data: {
        patientId: patient.id,
        recordType: data.recordType,
        title: data.title,
        description: data.description,
        status: data.status,
        date: data.date ? new Date(data.date) : new Date(),
        provider: data.provider
      }
    });
  } catch {
    return mockDb.createMedicalRecord({
      patientId: patient.id,
      recordType: data.recordType,
      title: data.title,
      description: data.description || "",
      status: data.status || "Active",
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      provider: data.provider || "PatientIQ System"
    });
  }
}

export async function getDocuments(userId: string) {
  await checkDatabase();
  const patient = await getPatientByUserId(userId);
  if (!patient) return [];

  if (useMock) {
    return mockDb.getDocuments(patient.id);
  }
  try {
    return await db.document.findMany({
      where: { patientId: patient.id },
      orderBy: { uploadedAt: "desc" }
    });
  } catch {
    return mockDb.getDocuments(patient.id);
  }
}

export async function createDocument(userId: string, data: any) {
  await checkDatabase();
  const patient = await getPatientByUserId(userId);
  if (!patient) return null;

  if (useMock) {
    return mockDb.createDocument({
      patientId: patient.id,
      title: data.title,
      fileUrl: data.fileUrl,
      fileType: data.fileType || "pdf",
      category: data.category || "OTHER"
    });
  }
  try {
    return await db.document.create({
      data: {
        patientId: patient.id,
        title: data.title,
        fileUrl: data.fileUrl,
        fileType: data.fileType || "pdf",
        category: data.category || "OTHER"
      }
    });
  } catch {
    return mockDb.createDocument({
      patientId: patient.id,
      title: data.title,
      fileUrl: data.fileUrl,
      fileType: data.fileType || "pdf",
      category: data.category || "OTHER"
    });
  }
}

export async function getLabResults(userId: string) {
  await checkDatabase();
  const patient = await getPatientByUserId(userId);
  if (!patient) return [];

  if (useMock) {
    return mockDb.getLabResults(patient.id);
  }
  try {
    return await db.labResult.findMany({
      where: { patientId: patient.id },
      orderBy: { testDate: "desc" }
    });
  } catch {
    return mockDb.getLabResults(patient.id);
  }
}

export async function createLabResult(userId: string, data: any) {
  await checkDatabase();
  const patient = await getPatientByUserId(userId);
  if (!patient) return null;

  if (useMock) {
    return mockDb.createLabResult({
      patientId: patient.id,
      testName: data.testName,
      testDate: data.testDate ? new Date(data.testDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      resultValue: data.resultValue,
      referenceRange: data.referenceRange || "",
      unit: data.unit || "",
      status: data.status || "NORMAL",
      notes: data.notes || ""
    });
  }
  try {
    return await db.labResult.create({
      data: {
        patientId: patient.id,
        testName: data.testName,
        testDate: data.testDate ? new Date(data.testDate) : new Date(),
        resultValue: data.resultValue,
        referenceRange: data.referenceRange,
        unit: data.unit,
        status: data.status || "NORMAL",
        notes: data.notes
      }
    });
  } catch {
    return mockDb.createLabResult({
      patientId: patient.id,
      testName: data.testName,
      testDate: data.testDate ? new Date(data.testDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      resultValue: data.resultValue,
      referenceRange: data.referenceRange || "",
      unit: data.unit || "",
      status: data.status || "NORMAL",
      notes: data.notes || ""
    });
  }
}

export async function getAppointments(userId: string, role: string) {
  await checkDatabase();
  if (role === "PATIENT") {
    const patient = await getPatientByUserId(userId);
    if (!patient) return [];
    if (useMock) {
      const apps = mockDb.getAppointments(patient.id, undefined);
      return apps.map(app => {
        const doc = mockDb.getDoctorById(app.doctorId);
        const docUser = doc ? mockDb.getUserById(doc.userId) : null;
        return {
          ...app,
          doctor: {
            ...doc,
            user: docUser
          }
        };
      });
    }
    try {
      return await db.appointment.findMany({
        where: { patientId: patient.id },
        include: {
          doctor: {
            include: { user: true }
          }
        },
        orderBy: { dateTime: "asc" }
      });
    } catch {
      const apps = mockDb.getAppointments(patient.id, undefined);
      return apps.map(app => {
        const doc = mockDb.getDoctorById(app.doctorId);
        const docUser = doc ? mockDb.getUserById(doc.userId) : null;
        return {
          ...app,
          doctor: {
            ...doc,
            user: docUser
          }
        };
      });
    }
  } else if (role === "DOCTOR") {
    const doctor = await getDoctorByUserId(userId);
    if (!doctor) return [];
    if (useMock) {
      const apps = mockDb.getAppointments(undefined, doctor.id);
      return apps.map(app => {
        const pat = mockDb.getPatientById(app.patientId);
        const patUser = pat ? mockDb.getUserById(pat.userId) : null;
        return {
          ...app,
          patient: {
            ...pat,
            user: patUser
          }
        };
      });
    }
    try {
      return await db.appointment.findMany({
        where: { doctorId: doctor.id },
        include: {
          patient: {
            include: { user: true }
          }
        },
        orderBy: { dateTime: "asc" }
      });
    } catch {
      const apps = mockDb.getAppointments(undefined, doctor.id);
      return apps.map(app => {
        const pat = mockDb.getPatientById(app.patientId);
        const patUser = pat ? mockDb.getUserById(pat.userId) : null;
        return {
          ...app,
          patient: {
            ...pat,
            user: patUser
          }
        };
      });
    }
  }
  return [];
}

export async function createAppointment(userId: string, data: any) {
  await checkDatabase();
  const patient = await getPatientByUserId(userId);
  if (!patient) return null;

  if (useMock) {
    return mockDb.createAppointment({
      patientId: patient.id,
      doctorId: data.doctorId,
      dateTime: new Date(data.dateTime).toISOString(),
      reason: data.reason,
      notes: data.notes || ""
    });
  }
  try {
    return await db.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: data.doctorId,
        dateTime: new Date(data.dateTime),
        reason: data.reason,
        notes: data.notes
      }
    });
  } catch {
    return mockDb.createAppointment({
      patientId: patient.id,
      doctorId: data.doctorId,
      dateTime: new Date(data.dateTime).toISOString(),
      reason: data.reason,
      notes: data.notes || ""
    });
  }
}

export async function updateAppointmentStatus(id: string, status: any) {
  await checkDatabase();
  if (useMock) {
    return mockDb.updateAppointmentStatus(id, status);
  }
  try {
    return await db.appointment.update({
      where: { id },
      data: { status }
    });
  } catch {
    return mockDb.updateAppointmentStatus(id, status);
  }
}

export async function getAuditLogs() {
  await checkDatabase();
  if (useMock) {
    return mockDb.getAuditLogs();
  }
  try {
    return await db.auditLog.findMany({
      include: { user: true },
      orderBy: { timestamp: "desc" }
    });
  } catch {
    return mockDb.getAuditLogs();
  }
}

export async function createAuditLog(userId: string, action: string, details?: string, ipAddress?: string) {
  await checkDatabase();
  if (useMock) {
    return mockDb.createAuditLog({
      userId,
      action,
      details: details || "",
      ipAddress: ipAddress || "127.0.0.1"
    });
  }
  try {
    return await db.auditLog.create({
      data: {
        userId,
        action,
        details,
        ipAddress
      }
    });
  } catch {
    return mockDb.createAuditLog({
      userId,
      action,
      details: details || "",
      ipAddress: ipAddress || "127.0.0.1"
    });
  }
}
