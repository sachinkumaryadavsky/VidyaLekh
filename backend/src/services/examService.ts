import { examRepository } from "../repositories/examRepository";
import { CreateExamDTO,CreateSubjectDTO,BulkMarksDTO } from "../types/examTypes";

export const examService = {

  async createExam(data: CreateExamDTO) {

    if (!data.name || !data.class_id) {
      throw new Error("Exam name and class ID are required");
    }

    return await examRepository.createExam(data);
  },
  async createSubject(data: CreateSubjectDTO) {

  if (!data.name || !data.class_id) {
    throw new Error("Subject name and class ID are required");
  }

  return await examRepository.createSubject(data);
},
async bulkEnterMarks(data: BulkMarksDTO) {

  const maxMarks = await examRepository.getSubjectMaxMarks(
    data.subject_id
  );

  for (const record of data.marks) {
    if (
      record.marks_obtained < 0 ||
      record.marks_obtained > maxMarks
    ) {
      throw new Error(
        `Marks must be between 0 and ${maxMarks}`
      );
    }
  }

  await examRepository.bulkInsertMarks(data);

  return { message: "Marks entered successfully" };
},
async getStudentResult(studentId: number, examId: number) {

  if (!studentId || !examId) {
    throw new Error("Student ID and Exam ID are required");
  }

  const summary =
    await examRepository.getStudentExamResult(studentId, examId);

  const totalObtained = Number(summary?.total_obtained || 0);
  const totalMax = Number(summary?.total_max || 0);

  const percentage = totalMax
    ? Math.round((totalObtained / totalMax) * 100)
    : 0;

  // Simple grade logic
  let grade = "F";
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 50) grade = "D";

  const result = percentage >= 40 ? "PASS" : "FAIL";

  return {
    student_id: studentId,
    exam_id: examId,
    total_obtained: totalObtained,
    total_max: totalMax,
    percentage,
    grade,
    result
  };
}
};