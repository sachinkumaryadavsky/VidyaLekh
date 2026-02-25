import { db } from "../plugins/db";
import { MarkAttendanceDTO,BulkAttendanceDTO } from "../types/attendanceTypes";

export const attendanceRepository = {

  async markAttendance(data: MarkAttendanceDTO) {
    const { student_id, class_id, date, status } = data;

    await db.query(
      "INSERT INTO attendance (student_id, class_id, date, status) VALUES (?, ?, ?, ?)",
      [student_id, class_id, date, status]
    );
  },

  async getAttendanceByClassAndDate(class_id: number, date: string) {
    const [rows] = await db.query(
      "SELECT * FROM attendance WHERE class_id = ? AND date = ?",
      [class_id, date]
    );

    return rows;
  },
  async bulkInsertAttendance(data: BulkAttendanceDTO) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    for (const record of data.attendance) {
      await connection.query(
        "INSERT INTO attendance (student_id, class_id, date, status) VALUES (?, ?, ?, ?)",
        [record.student_id, data.class_id, data.date, record.status]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
},async getAttendanceByStudentId(studentId: number) {
  const [rows] = await db.query(
    "SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC",
    [studentId]
  );

  return rows;
},
async getAttendanceSummaryByStudentId(studentId: number) {
  const [rows]: any = await db.query(
    `
    SELECT 
      COUNT(*) AS total_days,
      SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS present_days,
      SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) AS absent_days
    FROM attendance
    WHERE student_id = ?
    `,
    [studentId]
  );

  return rows[0];
},

async getClassAttendanceSummary(classId: number, date: string) {
  const [rows]: any = await db.query(
    `
    SELECT 
      COUNT(*) AS total_marked,
      SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS present_count,
      SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) AS absent_count
    FROM attendance
    WHERE class_id = ? AND date = ?
    `,
    [classId, date]
  );

  return rows[0];
}

};