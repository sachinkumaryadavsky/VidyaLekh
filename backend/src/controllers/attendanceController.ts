import { FastifyRequest, FastifyReply } from "fastify";
import { attendanceService } from "../services/attendanceService";

export const attendanceController = {

  async markAttendance(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await attendanceService.markAttendance(request.body as any);
      reply.send(result);
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  },

  async getAttendance(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { class_id, date } = request.query as any;

      const result = await attendanceService.getAttendance(
        Number(class_id),
        date
      );

      reply.send(result);
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  },
  async bulkMarkAttendance(request: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await attendanceService.bulkMarkAttendance(
      request.body as any
    );
    reply.send(result);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
},async getAttendanceHistory(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { studentId } = request.params as any;

    const result = await attendanceService.getAttendanceHistory(
      Number(studentId)
    );

    reply.send(result);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
},
async getAttendanceSummary(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { studentId } = request.params as any;

    const result = await attendanceService.getAttendanceSummary(
      Number(studentId)
    );

    reply.send(result);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
},

async getClassAttendanceSummary(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { classId } = request.params as any;
    const { date } = request.query as any;

    const result = await attendanceService.getClassAttendanceSummary(
      Number(classId),
      date
    );

    reply.send(result);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
}

};