import { FastifyRequest, FastifyReply } from "fastify";
import { studentService } from "../services/studentService";

export const studentController = {

  async createStudent(request: FastifyRequest, reply: FastifyReply) {
    try {
      await studentService.createStudent(request.body as any);
      reply.send({ message: "Student created successfully" });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  },

 async getStudents(request: FastifyRequest, reply: FastifyReply) {
  try {
    const students = await studentService.getStudents();
    reply.send(students);
  } catch (error: any) {
    reply.status(500).send({
      error: error.message
    });
  }
}

};