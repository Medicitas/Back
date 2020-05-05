
import dbQuery from '../db/dev/dbQuery';

import { // funciones usadas en este controlador 
  hashPassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
} from '../helpers/validations';

import {
  errorMessage, successMessage, status,
} from '../helpers/status';

/**
   * Crear un administrador
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const createAdmin = async (req, res) => {
  const { 
    email, name, last_name, password,rol_id,user_id
  } = req.body;
  //var rol_id= req.body.rol_id;

  if (rol_id != 1) {
    errorMessage.error = 'Sorry You are unauthorized to create an admin';
    return res.status(status.bad).send(errorMessage);
    
  }
  
  if (isEmpty(email) || isEmpty(name) || isEmpty(last_name) || isEmpty(password)) {
    errorMessage.error = 'Email, password, name and last name field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  
  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email';
    return res.status(status.bad).send(errorMessage);
  }
  
  if (!validatePassword(password)) {
    errorMessage.error = 'Password must be more than four(4) characters';
    return res.status(status.bad).send(errorMessage);
  }
  
  const hashedPassword = hashPassword(password); 
  const createUserQuery = `INSERT INTO
      "public"."User"(email, name, last_name, password, rol_id,user_id)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;

  const values = [
    email,
    name,
    last_name,
    hashedPassword,
    rol_id,
    user_id,
    
  ];
 

  try {
    const { rows } = await dbQuery.query(createUserQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.rol_id, dbResponse.name, dbResponse.last_name);
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.created).send(successMessage);
    
  } catch (error) {console.log("catch");
    console.log(error);
    /*if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'Admin with that EMAIL already exist';
      return res.status(status.conflict).send(errorMessage);
    }*/
  } console.log("sali");
  return res.status(status.conflict).send("errorMessage");
};

/**
   * ver todos los usuarios
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Users array
   */
  const getAllUsers = async (req, res) => {
    const getAllUsersQuery = 'SELECT * FROM "public"."User" ORDER BY user_id ASC';
    try {
      const { rows } = await dbQuery.query(getAllUsersQuery);
      const dbResponse = rows;
      if (dbResponse[0] === undefined) {
        errorMessage.error = 'There are no users';
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'An error Occured';
      return res.status(status.error).send(errorMessage);
    }
  };

/**
 * Delete User
 * @param {object} req 
 * @param {object} res 
 * @returns {object} Deletete user
 **/
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { rol_id } = req.body;

  const { rol_id } = req.user;
  if (rol_id != 1) {
    errorMessage.error = 'Sorry You are unauthorized to delete an user';
    return res.status(status.bad).send(errorMessage);
  }
  const findUserQuery = 'SELECT * FROM users WHERE id=$1';
  try {
    const { rows } = await dbQuery.query(findUserQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User Cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }
    const deleteUserQuery = `DELETE FROM "public"."User" WHERE id=$1 returning *`;
    const response = await dbQuery.query(deleteUserQuery, [id]);
    const dbResult = response.rows[0];
    delete dbResult.password;
    successMessage.data = dbResult;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};


/**
 * Update A User to Admin
 * @param {object} req 
 * @param {object} res 
 * @returns {object} updated user
 **
const updateUserToAdmin = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  const { is_admin } = req.user;
  if (!is_admin === true) {
    errorMessage.error = 'Sorry You are unauthorized to make a user an admin';
    return res.status(status.bad).send(errorMessage);
  }
  if (isAdmin === '') {
    errorMessage.error = 'Admin Status is needed';
    return res.status(status.bad).send(errorMessage);
  }
  const findUserQuery = 'SELECT * FROM users WHERE id=$1';
  const updateUser = `UPDATE users
        SET is_admin=$1 WHERE id=$2 returning *`;
  try {
    const { rows } = await dbQuery.query(findUserQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User Cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }
    const values = [
      isAdmin,
      id,
    ];
    const response = await dbQuery.query(updateUser, values);
    const dbResult = response.rows[0];
    delete dbResult.password;
    successMessage.data = dbResult;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};*/

export {
  createAdmin,
  getAllUsers,
  deleteUser,
};