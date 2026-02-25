export interface MarkAttendanceDTO {
  student_id: number;
  class_id: number;
  date: string;
  status: "present" | "absent";
}
export interface BulkAttendanceDTO {
  class_id: number;
  date: string;
  attendance: {
    student_id: number;
    status: "present" | "absent";
  }[];
}