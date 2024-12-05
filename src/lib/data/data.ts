import Attendance from '@/assets/attendanc.png'
import Leave from '@/assets/leave.png'

export const menuItems = [
    {
      imageSrc: Attendance,
      title: "Absensi Kehadiran",
      description:
        "Catat jam kerja Anda dengan mudah dengan fitur clock-in dan clock-out yang akurat.",
      buttonText: "Absen Sekarang",
      onClick: "attendance",
    },
    {
      imageSrc: Leave,
      title: "Ajukan Cuti",
      description:
        "Ajukan permohonan cuti Anda dengan mudah dan pantau status persetujuan permohonan Anda.",
      buttonText: "Ajukan Cuti",
      onClick: "leave",
    },
  ];