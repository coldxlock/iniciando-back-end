import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
/*
  [x] Recebimento das informações
  [/] Tratativa de erros/excessões
  [/] Acesso ao repositório

*/

interface Request {
  date: Date;
  provider_id: string;
}

/*
  Dependency Inversion (SOLID)
*/

class CreateAppointmentService {
  private appointmentsRepository : AppointmentsRepository;

 

  public async execute({date,provider_id}: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error('Já existe agendamento para esse horário.');
      // return response
      // .status(400)
      // .json({message:'Já existe agendamento para esse horário.'});
    }
    

    const appointment = appointmentsRepository.create({
      provider_id,
      date : appointmentDate
    });
    
    await appointmentsRepository.save(appointment);

    return appointment;

  }
}

export default CreateAppointmentService;

