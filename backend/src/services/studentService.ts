import { studentRepository } from "../repositories/studentRepository";
import { CreateStudentDTO } from "../types/studentTypes";

export const studentService = {

  async createStudent(data: CreateStudentDTO) {

    if (!data.admission_number || !data.name) {
      throw new Error("Admission number and name are required");
    }

    await studentRepository.createStudent(data);
  },

  async getStudents() {
    return await studentRepository.getAllStudents();
  },
  async getStudentById(id: number) {
  if (!id) {
    throw new Error("Student ID is required");
  }

  const student = await studentRepository.getStudentById(id);

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
}

};