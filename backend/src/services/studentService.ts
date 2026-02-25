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
},
async updateStudent(id: number, data: any) {
  if (!id) {
    throw new Error("Student ID is required");
  }

  const existingStudent = await studentRepository.getStudentById(id);

  if (!existingStudent) {
    throw new Error("Student not found");
  }

  await studentRepository.updateStudent(id, data);

  return { message: "Student updated successfully" };
},

async updateStudentStatus(id: number, status: string) {
  if (!id) {
    throw new Error("Student ID is required");
  }

  if (!["active", "inactive"].includes(status)) {
    throw new Error("Invalid status value");
  }

  const existingStudent = await studentRepository.getStudentById(id);

  if (!existingStudent) {
    throw new Error("Student not found");
  }

  await studentRepository.updateStudentStatus(id, status);

  return { message: "Student status updated successfully" };
}

};