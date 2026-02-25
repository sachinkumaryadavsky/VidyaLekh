import { FastifyRequest, FastifyReply } from "fastify";
import { examService } from "../services/examService";
import { CreateExamDTO,CreateSubjectDTO,BulkMarksDTO} from "../types/examTypes";

export const examController = {

  async createExam(
    request: FastifyRequest<{ Body: CreateExamDTO }>,
    reply: FastifyReply
  ) {
    try {
      const result = await examService.createExam(request.body);
      reply.status(201).send(result);
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  },
  async createSubject(
  request: FastifyRequest<{ Body: CreateSubjectDTO }>,
  reply: FastifyReply
) {
  try {
    const result = await examService.createSubject(request.body);
    reply.status(201).send(result);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
},
async bulkEnterMarks(
  request: FastifyRequest<{ Body: BulkMarksDTO }>,
  reply: FastifyReply
) {
  try {
    const result = await examService.bulkEnterMarks(request.body);
    reply.send(result);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
},
async getStudentResult(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { studentId, examId } = request.params as any;

    const result =
      await examService.getStudentResult(
        Number(studentId),
        Number(examId)
      );

    reply.send(result);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
}

};