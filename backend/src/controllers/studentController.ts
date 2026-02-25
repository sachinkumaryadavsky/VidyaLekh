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
},

async getStudentById(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;

    const student = await studentService.getStudentById(Number(id));

    reply.send(student);
  } catch (error: any) {
    reply.status(400).send({
      error: error.message
    });
  }
},
async updateStudent(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const body = request.body as any;

    const result = await studentService.updateStudent(Number(id), body);

    reply.send(result);
  } catch (error: any) {
    reply.status(400).send({
      error: error.message
    });
  }
},
async updateStudentStatus(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const { status } = request.body as any;

    const result = await studentService.updateStudentStatus(
      Number(id),
      status
    );

    reply.send(result);
  } catch (error: any) {
    reply.status(400).send({
      error: error.message
    });
  }
}

};