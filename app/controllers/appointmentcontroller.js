import dbQuery from '../db/dev/dbQuery';

import {
  empty,
} from '../helpers/validations';


import {
  errorMessage, successMessage, status,
} from '../helpers/status';


/**
   * Add A Appointment Crear una nueva cita
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const addAppointment = async (req, res) => {
  const {
    scheduled_time, medic_id, patient_id,
  } = req.body;


  if (empty(scheduled_time) || empty(medic_id) || empty (patient_id) ) {
    errorMessage.error = 'All fields are required';
    return res.status(status.bad).send(errorMessage);
  }
  const createAppointmentQuery = `INSERT INTO
          "public"."Appointment"(scheduled_time, medic_id, patient_id,appointment_id)
          VALUES($1, $2, $3)
          returning *`;
  const values = [
    scheduled_time,
    medic_id,
    patient_id,
    1
  ];
    
  try {
    const { rows } = await dbQuery.query(createAppointmentQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log(error);
    
    errorMessage.error = 'Unable to add Appointment';
    return res.status(status.error).send(errorMessage);
  }
};

/**
   * Get All Appointments
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Appointment array
   */
const getAllAppointments = async (req, res) => {
  const getAllAppointmentQuery = 'SELECT * FROM "public"."Appointment" ORDER BY appointment_id ASC';
  try {
    const { rows } = await dbQuery.query(getAllAppointmentQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = 'There are no appointments';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};


export {
  addAppointment,
  getAllAppointments,
};