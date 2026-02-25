import { db } from "../plugins/db";
import { CreateExamDTO,CreateSubjectDTO, BulkMarksDTO } from "../types/examTypes";


export const examRepository = {

  async createExam(data: CreateExamDTO) {
    const { name, class_id, exam_date } = data;

    const [result]: any = await db.query(
      "INSERT INTO exams (name, class_id, exam_date) VALUES (?, ?, ?)",
      [name, class_id, exam_date]
    );

    return {
      id: result.insertId,
      name,
      class_id,
      exam_date
    };
  },
  async createSubject(data: CreateSubjectDTO) {
  const { name, class_id } = data;

  const [result]: any = await db.query(
    "INSERT INTO subjects (name, class_id) VALUES (?, ?)",
    [name, class_id]
  );

  return {
    id: result.insertId,
    name,
    class_id
  };
},
async bulkInsertMarks(data: BulkMarksDTO) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    for (const record of data.marks) {
      await connection.query(
        `
        INSERT INTO marks 
        (student_id, exam_id, subject_id, marks_obtained)
        VALUES (?, ?, ?, ?)
        `,
        [
          record.student_id,
          data.exam_id,
          data.subject_id,
          record.marks_obtained
        ]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
,
async getSubjectMaxMarks(subjectId: number) {
  const [rows]: any = await db.query(
    "SELECT max_marks FROM subjects WHERE id = ?",
    [subjectId]
  );

  if (!rows.length) {
    throw new Error("Invalid subject");
  }

  return rows[0].max_marks;
},
async getStudentExamResult(studentId: number, examId: number) {
  const [rows]: any = await db.query(
    `
    SELECT 
      SUM(m.marks_obtained) AS total_obtained,
      SUM(s.max_marks) AS total_max
    FROM marks m
    JOIN subjects s ON s.id = m.subject_id
    WHERE m.student_id = ? AND m.exam_id = ?
    `,
    [studentId, examId]
  );

  return rows[0];
}
};