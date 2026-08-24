import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, User, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

interface AppointmentSectionProps {
  selectedService?: string;
  selectedDoctor?: string;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  selectedService = 'Acne Treatment',
  selectedDoctor = 'First Available Specialist',
}) => {
  const [service, setService] = useState(selectedService);
  const [doctor, setDoctor] = useState(selectedDoctor);
  const [date, setDate] = useState('2026-08-05');
  const [time, setTime] = useState('10:30 AM');

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [doctorList, setDoctorList] = useState<any[]>([]);
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [existingBookings, setExistingBookings] = useState<any[]>([]);

  const ALL_TIME_SLOTS = ['09:30 AM', '11:00 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

  useEffect(() => {
    const savedDocs = localStorage.getItem('aura_admin_doctors');
    if (savedDocs) {
      try {
        const parsed = JSON.parse(savedDocs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDoctorList(parsed.filter((d) => d.status === 'ACTIVE'));
        }
      } catch (e) {}
    } else {
      setDoctorList([
        { id: '1', name: 'Dr. Sarah Jenkins, MD', title: 'Chief Dermatologist' },
        { id: '2', name: 'Dr. Alex Rivera, MD', title: 'Hair Restoration Specialist' },
      ]);
    }

    const savedServices = localStorage.getItem('aura_admin_services');
    if (savedServices) {
      try {
        const parsed = JSON.parse(savedServices);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setServiceList(parsed.filter((s) => s.status === 'ACTIVE'));
        }
      } catch (e) {}
    } else {
      setServiceList([
        { id: '1', title: 'Acne Treatment' },
        { id: '2', title: 'Acne Scar Treatment' },
        { id: '3', title: 'Hydra Facial' },
        { id: '4', title: 'Chemical Peel' },
        { id: '5', title: 'PRP Hair Treatment' },
      ]);
    }

    const savedAppts = localStorage.getItem('aura_admin_appointments');
    if (savedAppts) {
      try {
        const parsed = JSON.parse(savedAppts);
        if (Array.isArray(parsed)) {
          setExistingBookings(parsed);
        }
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (selectedService) setService(selectedService);
  }, [selectedService]);

  useEffect(() => {
    if (selectedDoctor) setDoctor(selectedDoctor);
  }, [selectedDoctor]);

  const getBookedSlotsForDate = (dateStr: string) => {
    return existingBookings
      .filter((b) => {
        if (b.status === 'CANCELLED') return false;
        const isDateMatch = b.date === dateStr;
        const isDoctorMatch =
          doctor === 'First Available Specialist' ||
          b.doctorName === doctor ||
          b.doctorName?.includes(doctor);
        return isDateMatch && isDoctorMatch;
      })
      .map((b) => b.time);
  };

  const bookedSlots = getBookedSlotsForDate(date);

  useEffect(() => {
    if (bookedSlots.includes(time)) {
      const firstAvail = ALL_TIME_SLOTS.find((s) => !bookedSlots.includes(s));
      if (firstAvail) setTime(firstAvail);
    }
  }, [date, doctor, existingBookings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (bookedSlots.includes(time)) {
      alert(`The time slot "${time}" on ${date} is already booked. Please choose an available time slot.`);
      return;
    }

    const ref = 'AUR-' + Math.floor(100000 + Math.random() * 900000);

    const newBooking = {
      id: 'app-' + Date.now(),
      referenceId: ref,
      patientName,
      patientPhone,
      patientEmail,
      serviceName: service,
      doctorName: doctor,
      date,
      time,
      status: 'PENDING',
      notes,
    };

    const updatedAppts = [newBooking, ...existingBookings];
    setExistingBookings(updatedAppts);
    localStorage.setItem('aura_admin_appointments', JSON.stringify(updatedAppts));

    setSubmittedRef(ref);
  };

  return (
    <section id="booking" className="py-20 bg-[#F4F6F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Schedule Your Visit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2521]">
            Book Appointment
          </h2>
          <p className="text-sm text-gray-600">
            Select your preferred treatment, specialist physician, and consultation time.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E8E6] shadow-xl">
          {submittedRef ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2521]">
                Booking Request Received!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you, <strong className="text-[#0B2521]">{patientName}</strong>! Your consultation request has been submitted. Reference ID: <strong className="text-[#C89B7B] font-mono">{submittedRef}</strong>
              </p>

              <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E2E8E6] max-w-md mx-auto text-xs text-left space-y-1.5">
                <div><strong>Patient:</strong> {patientName}</div>
                <div><strong>Procedure:</strong> {service}</div>
                <div><strong>Specialist:</strong> {doctor}</div>
                <div><strong>Requested Date & Time:</strong> {date} at {time}</div>
                <div className="pt-2 border-t border-gray-200 text-amber-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Status: PENDING CLINIC CONFIRMATION
                </div>
              </div>

              <p className="text-xs text-gray-500 font-medium max-w-md mx-auto">
                Our clinic manager will review your request and contact you via phone/WhatsApp to confirm your appointment.
              </p>

              <Button variant="primary" onClick={() => setSubmittedRef(null)}>
                Book Another Appointment
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#0B2521]">Select Treatment *</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full p-3 bg-[#F4F6F5] border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C89B7B]"
                  >
                    {serviceList.map((srv, idx) => (
                      <option key={srv.id || idx} value={srv.title || srv.name}>
                        {srv.title || srv.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0B2521]">Select Doctor *</label>
                  <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="w-full p-3 bg-[#F4F6F5] border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C89B7B]"
                  >
                    <option value="First Available Specialist">First Available Specialist</option>
                    {doctorList.map((doc, idx) => (
                      <option key={doc.id || idx} value={doc.name}>
                        {doc.name} {doc.title ? `(${doc.title})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#0B2521]">Appointment Date *</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    min="2026-08-01"
                    className="w-full p-3 bg-[#F4F6F5] border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C89B7B]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0B2521]">Time Slot *</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 bg-[#F4F6F5] border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C89B7B]"
                  >
                    {ALL_TIME_SLOTS.map((slot) => {
                      const isBooked = bookedSlots.includes(slot);
                      return (
                        <option
                          key={slot}
                          value={slot}
                          disabled={isBooked}
                          className={isBooked ? 'text-gray-400 bg-gray-100 font-normal' : 'font-bold'}
                        >
                          {slot} {isBooked ? '(ALREADY BOOKED)' : '✓ Available'}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#0B2521]">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                      placeholder="e.g. Sarah Johnson"
                      className="w-full pl-9 pr-3 py-3 bg-[#F4F6F5] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C89B7B]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0B2521]">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      required
                      placeholder="(555) 019-2834"
                      className="w-full pl-9 pr-3 py-3 bg-[#F4F6F5] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C89B7B]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0B2521]">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      required
                      placeholder="sarah@example.com"
                      className="w-full pl-9 pr-3 py-3 bg-[#F4F6F5] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C89B7B]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#0B2521]">Skin/Hair Concerns (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Tell our dermatologists about your goals or symptoms..."
                  className="w-full p-3 bg-[#F4F6F5] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C89B7B]"
                />
              </div>

              <Button variant="gold" fullWidth size="lg" type="submit">
                <CalendarIcon className="w-5 h-5" /> Submit Appointment Request
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
