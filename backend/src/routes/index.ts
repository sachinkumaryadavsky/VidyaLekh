import { FastifyInstance } from "fastify";
import { studentController } from "../controllers/studentController";
import { attendanceController } from "../controllers/attendanceController";


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
}