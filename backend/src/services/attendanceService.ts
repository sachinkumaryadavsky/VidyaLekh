import { attendanceRepository } from "../repositories/attendanceRepository";
import { MarkAttendanceDTO,BulkAttendanceDTO } from "../types/attendanceTypes";

export const attendanceService = {

  async markAttendance(data: MarkAttendanceDTO) {

    if (!data.student_id || !data.class_id || !data.date) {
      throw new Error("Missing required fields");
    }

    if (!["present", "absent"].includes(data.status)) {
      throw new Error("Invalid attendance status");
    }

    await attendanceRepository.markAttendance(data);

    return { message: "Attendance marked successfully" };
  },

  async getAttendance(class_id: number, date: string) {

    if (!class_id || !date) {
      throw new Error("Class ID and date are required");
    }

    return await attendanceRepository.getAttendanceByClassAndDate(class_id, date);
  },
  async bulkMarkAttendance(data: BulkAttendanceDTO) {

  if (!data.class_id || !data.date || !data.attendance?.length) {
    throw new Error("Invalid attendance payload");
  }

  for (const record of data.attendance) {
    if (!["present", "absent"].includes(record.status)) {
      throw new Error("Invalid attendance status");
    }
  }

  await attendanceRepository.bulkInsertAttendance(data);

  return { message: "Bulk attendance marked successfully" };
},async getAttendanceHistory(studentId: number) {

  if (!studentId) {
    throw new Error("Student ID is required");
  }

  const attendance = await attendanceRepository.getAttendanceByStudentId(studentId);

  return attendance;
},
async getAttendanceSummary(studentId: number) {

  if (!studentId) {
    throw new Error("Student ID is required");
  }

  const summary = await attendanceRepository.getAttendanceSummaryByStudentId(studentId);

  if (!summary || summary.total_days === 0) {
    return {
      student_id: studentId,
      total_days: 0,
      present_days: 0,
      absent_days: 0,
      percentage: 0
    };
  }

  const percentage = Math.round(
    (summary.present_days / summary.total_days) * 100
  );

  return {
    student_id: studentId,
    total_days: summary.total_days,
    present_days: summary.present_days,
    absent_days: summary.absent_days,
    percentage
  };
},

async getClassAttendanceSummary(classId: number, date: string) {

  if (!classId || !date) {
    throw new Error("Class ID and date are required");
  }

  const summary = await attendanceRepository.getClassAttendanceSummary(classId, date);

  if (!summary || summary.total_marked === 0) {
    return {
      class_id: classId,
      date,
      total_students: 0,
      present: 0,
      absent: 0,
      attendance_percentage: 0
    };
  }

  const percentage = (
    (summary.present_count / summary.total_marked) * 100
  ).toFixed(2);

  return {
    class_id: classId,
    date,
    total_students: summary.total_marked,
    present: summary.present_count,
    absent: summary.absent_count,
    attendance_percentage: Number(percentage)
  };
}

};