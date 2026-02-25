export interface CreateExamDTO {
  name: string;
  class_id: number;
  exam_date: string;
}

export interface CreateSubjectDTO {
  name: string;
  class_id: number;
}

export interface BulkMarksDTO {
  exam_id: number;
  subject_id: number;
  marks: {
    student_id: number;
    marks_obtained: number;
  }[];
}