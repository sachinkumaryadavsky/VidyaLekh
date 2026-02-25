import { FastifyInstance } from "fastify";
import { studentController } from "../controllers/studentController";
import { attendanceController } from "../controllers/attendanceController";
import { examController } from "../controllers/examController";


export async function Routes(app: FastifyInstance) {

  app.post("/students", studentController.createStudent);
  app.get("/students", studentController.getStudents);
  app.get("/students/:id", studentController.getStudentById);
  app.put("/students/:id", studentController.updateStudent);
  app.patch("/students/:id/status", studentController.updateStudentStatus);
  
  //attendance
  app.post("/attendance", attendanceController.markAttendance);
  app.get("/attendance", attendanceController.getAttendance);
  app.post("/attendance/bulk", attendanceController.bulkMarkAttendance);
  app.get(
  "/attendance/student/:studentId",
  attendanceController.getAttendanceHistory
);
app.get(
  "/attendance/student/:studentId/summary",
  attendanceController.getAttendanceSummary
);
app.get(
  "/attendance/class/:classId/summary",
  attendanceController.getClassAttendanceSummary
);
app.get(
  "/attendance/class/:classId/defaulters",
  attendanceController.getDefaulters
);
app.get(
  "/dashboard/attendance",
  attendanceController.getAttendanceDashboard
);

//exam

  app.post("/exams", examController.createExam);
  app.post("/subjects", examController.createSubject);
  app.post("/marks/bulk", examController.bulkEnterMarks);
  app.get(
  "/results/student/:studentId/exam/:examId",
  examController.getStudentResult
);
}