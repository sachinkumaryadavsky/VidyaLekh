import { FastifyInstance } from "fastify";
import { studentController } from "../controllers/studentController";

export async function Routes(app: FastifyInstance) {

  app.post("/students", studentController.createStudent);
  app.get("/students", studentController.getStudents);
  app.get("/students/:id", studentController.getStudentById);
  app.put("/students/:id", studentController.updateStudent);

}