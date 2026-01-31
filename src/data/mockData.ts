// Mock data for demo purposes

export interface MedicalNote {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  phone: string;
  email?: string;
  visitDate: string;
  service: string;
  status: 'active' | 'completed';
  bloodType?: string;
  allergies?: string;
  medicalHistory: MedicalNote[];
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed';
  message?: string;
}

export const patients: Patient[] = [
  { 
    id: '1', 
    name: 'Abebe Bekele', 
    age: 35, 
    gender: 'Male', 
    phone: '+251911234567',
    email: 'abebe@email.com',
    visitDate: '2024-01-28', 
    service: 'General Consultation', 
    status: 'completed',
    bloodType: 'O+',
    allergies: 'Penicillin',
    medicalHistory: [
      { id: '1', date: '2024-01-28', doctor: 'Dr. Solomon', diagnosis: 'Common Cold', treatment: 'Rest & fluids', notes: 'Patient recovered well' },
      { id: '2', date: '2024-01-15', doctor: 'Dr. Abere', diagnosis: 'Hypertension', treatment: 'Medication prescribed', notes: 'Follow-up in 2 weeks' }
    ]
  },
  { 
    id: '2', 
    name: 'Tigist Haile', 
    age: 28, 
    gender: 'Female', 
    phone: '+251922345678',
    email: 'tigist@email.com',
    visitDate: '2024-01-28', 
    service: 'Maternal Care', 
    status: 'active',
    bloodType: 'A+',
    allergies: 'None',
    medicalHistory: [
      { id: '1', date: '2024-01-28', doctor: 'Dr. Kebede', diagnosis: 'Pregnancy Checkup', treatment: 'Prenatal vitamins', notes: 'Healthy pregnancy, 28 weeks' }
    ]
  },
  { 
    id: '3', 
    name: 'Dawit Tesfaye', 
    age: 42, 
    gender: 'Male', 
    phone: '+251933456789',
    email: 'dawit@email.com',
    visitDate: '2024-01-27', 
    service: 'Laboratory Services', 
    status: 'completed',
    bloodType: 'B+',
    allergies: 'Aspirin',
    medicalHistory: [
      { id: '1', date: '2024-01-27', doctor: 'Dr. Ahmed', diagnosis: 'Blood Work', treatment: 'Labs completed', notes: 'Results normal, no issues' }
    ]
  },
  { 
    id: '4', 
    name: 'Sara Mengistu', 
    age: 31, 
    gender: 'Female', 
    phone: '+251944567890',
    email: 'sara@email.com',
    visitDate: '2024-01-27', 
    service: 'Child Care', 
    status: 'completed',
    bloodType: 'AB+',
    allergies: 'Latex',
    medicalHistory: [
      { id: '1', date: '2024-01-27', doctor: 'Dr. Milkessa', diagnosis: 'Child Checkup', treatment: 'Vaccination', notes: 'Child healthy, all vaccines up to date' }
    ]
  },
  { 
    id: '5', 
    name: 'Yohannes Girma', 
    age: 55, 
    gender: 'Male', 
    phone: '+251955678901',
    email: 'yohannes@email.com',
    visitDate: '2024-01-26', 
    service: 'General Consultation', 
    status: 'completed',
    bloodType: 'O+',
    allergies: 'None',
    medicalHistory: [
      { id: '1', date: '2024-01-26', doctor: 'Dr. Solomon', diagnosis: 'Diabetes Monitoring', treatment: 'Insulin adjustments', notes: 'Regular monitoring required' }
    ]
  },
  { 
    id: '6', 
    name: 'Hana Solomon', 
    age: 24, 
    gender: 'Female', 
    phone: '+251966789012',
    email: 'hana@email.com',
    visitDate: '2024-01-26', 
    service: 'Laboratory Services', 
    status: 'completed',
    bloodType: 'A+',
    allergies: 'Sulfonamides',
    medicalHistory: [
      { id: '1', date: '2024-01-26', doctor: 'Dr. Abebe', diagnosis: 'Routine Checkup', treatment: 'Health screening', notes: 'All tests normal' }
    ]
  },
];

export const appointments: Appointment[] = [
  { id: '1', patientName: 'Aster Gebremariam', phone: '+251911111111', service: 'General Consultation', date: '2024-01-29', time: '09:00', status: 'pending', message: 'First time visit' },
  { id: '2', patientName: 'Bereket Hailu', phone: '+251922222222', service: 'Laboratory Services', date: '2024-01-29', time: '10:30', status: 'confirmed' },
  { id: '3', patientName: 'Chaltu Worku', phone: '+251933333333', service: 'Maternal Care', date: '2024-01-29', time: '14:00', status: 'pending', message: 'Monthly checkup' },
  { id: '4', patientName: 'Daniel Assefa', phone: '+251944444444', service: 'Child Care', date: '2024-01-30', time: '11:00', status: 'confirmed' },
  { id: '5', patientName: 'Eden Mulugeta', phone: '+251955555555', service: 'General Consultation', date: '2024-01-30', time: '15:30', status: 'pending' },
];

export const dailyPatientStats = [
  { date: 'Mon', patients: 12 },
  { date: 'Tue', patients: 15 },
  { date: 'Wed', patients: 18 },
  { date: 'Thu', patients: 14 },
  { date: 'Fri', patients: 22 },
  { date: 'Sat', patients: 25 },
  { date: 'Sun', patients: 10 },
];

export const monthlyPatientStats = [
  { month: 'Aug', patients: 180 },
  { month: 'Sep', patients: 220 },
  { month: 'Oct', patients: 195 },
  { month: 'Nov', patients: 260 },
  { month: 'Dec', patients: 310 },
  { month: 'Jan', patients: 285 },
];

export const serviceDistribution = [
  { name: 'General Consultation', value: 35, color: 'hsl(168, 76%, 36%)' },
  { name: 'Laboratory Services', value: 25, color: 'hsl(210, 80%, 55%)' },
  { name: 'Maternal & Child Care', value: 20, color: 'hsl(15, 85%, 57%)' },
  { name: 'Emergency Care', value: 12, color: 'hsl(150, 60%, 45%)' },
  { name: 'Other Services', value: 8, color: 'hsl(270, 60%, 55%)' },
];

export interface StaffMember {
  id: string;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Lab Technician' | 'Administrator' | 'Receptionist';
  specialty?: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  license?: string;
}

export const staffMembers: StaffMember[] = [
  { id: '1', name: 'Dr. Solomon Abebe', role: 'Doctor', specialty: 'General Medicine', email: 'solomon.abebe@sheger.com', phone: '+251911111111', joinDate: '2020-03-15', status: 'active', license: 'LIC-2020-001' },
  { id: '2', name: 'Dr. Kebede Tekle', role: 'Doctor', specialty: 'Obstetrics', email: 'kebede.tekle@sheger.com', phone: '+251922222222', joinDate: '2019-06-20', status: 'active', license: 'LIC-2019-002' },
  { id: '3', name: 'Nurse Tigist Worku', role: 'Nurse', email: 'tigist.worku@sheger.com', phone: '+251933333333', joinDate: '2021-01-10', status: 'active' },
  { id: '4', name: 'Lab Tech Abere Assefa', role: 'Lab Technician', email: 'abere.assefa@sheger.com', phone: '+251944444444', joinDate: '2021-09-05', status: 'active', license: 'LAB-2021-001' },
  { id: '5', name: 'Admin Hiwot Teshome', role: 'Administrator', email: 'hiwot.teshome@sheger.com', phone: '+251955555555', joinDate: '2020-11-15', status: 'active' },
  { id: '6', name: 'Receptionist Meseret Fikre', role: 'Receptionist', email: 'meseret.fikre@sheger.com', phone: '+251966666666', joinDate: '2022-02-01', status: 'active' },
];

export const services = [
  {
    id: 'general',
    title: 'General Consultation',
    description: 'Comprehensive medical consultations with experienced physicians for diagnosis and treatment of common ailments, chronic conditions, and preventive care.',
    icon: 'stethoscope',
    priceRange: '300 - 500 ETB',
    features: ['Physical examination', 'Health assessment', 'Prescription services', 'Follow-up care'],
  },
  {
    id: 'laboratory',
    title: 'Laboratory Services',
    description: 'State-of-the-art diagnostic laboratory offering accurate and timely test results for blood work, urinalysis, and other essential medical tests.',
    icon: 'flask',
    priceRange: '150 - 2,000 ETB',
    features: ['Blood tests', 'Urinalysis', 'Rapid testing', 'Same-day results'],
  },
  {
    id: 'maternal',
    title: 'Maternal & Child Care',
    description: 'Dedicated care for mothers and children including prenatal checkups, postnatal care, vaccinations, and pediatric consultations.',
    icon: 'baby',
    priceRange: '400 - 800 ETB',
    features: ['Prenatal care', 'Postnatal checkups', 'Vaccinations', 'Growth monitoring'],
  },
  {
    id: 'emergency',
    title: 'Emergency & Outpatient Care',
    description: 'Prompt medical attention for urgent health concerns and injuries. Available during extended hours for your convenience.',
    icon: 'ambulance',
    priceRange: '500 - 1,500 ETB',
    features: ['Urgent care', 'Minor injuries', 'First aid', 'Referral services'],
  },
];
