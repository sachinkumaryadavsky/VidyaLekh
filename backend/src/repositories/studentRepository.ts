import { db } from "../plugins/db";
import { CreateStudentDTO } from "../types/studentTypes";

export const studentRepository = {

  async createStudent(data: CreateStudentDTO) {
    const { admission_number, name, class_id, parent_phone } = data;

    await db.query(
      "INSERT INTO students (admission_number, name, class_id, parent_phone) VALUES (?, ?, ?, ?)",
      [admission_number, name, class_id, parent_phone]
    );
  },

  async getAllStudents() {
    const [rows] = await db.query("SELECT * FROM students");
    return rows;
  },

  async getStudentById(id: number) {
  const [rows]: any = await db.query(
    "SELECT * FROM students WHERE id = ?",
    [id]
  );

  return rows[0] || null;
}

};