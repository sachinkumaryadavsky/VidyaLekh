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
},
async updateStudent(id: number, data: any) {
  const { name, class_id, parent_phone, status } = data;

  await db.query(
    `UPDATE students 
     SET name = ?, class_id = ?, parent_phone = ?, status = ?
     WHERE id = ?`,
    [name, class_id, parent_phone, status, id]
  );
},
async updateStudentStatus(id: number, status: string) {
  await db.query(
    "UPDATE students SET status = ? WHERE id = ?",
    [status, id]
  );
}

};