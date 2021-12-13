const express = require("express");
const router = express.Router();
const client = require("../../config/db");

// Get all factories
const getAllFactory = (request, response) => {
  client.query("SELECT * FROM factory_list", (err, res) => {
    if (!err) {
      dateConverter(res.rows, res.rows.length);
      response.status(200).json({ factories: res.rows });
    } else {
      throw err;
    }
  });
};

// Get factory
const getFactory = (request, response) => {
  const { company_name } = request.body;
  client.query("SELECT * FROM factory_list WHERE company_name = $1 ", [company_name], (err, res) => {
    if (!err) {
      response.status(200).json(res.rows);
    } else {
      throw err;
    }
  });
};

// Create factories
const createFactory = (request, response) => {
  const { company_name, start_date, end_date, employees_number, special_member } = request.body;

  client.query("INSERT INTO factory_list VALUES ($1, $2, $3, $4, $5)", [company_name, start_date, end_date, employees_number, special_member], (err, res) => {
    if (!err) {
      response.status(200).json(`user ${company_name} ${employees_number}, created`);
    } else {
      throw err;
    }
  });
};

// Update factories
const updateFactory = (request, response) => {
  const { company_name, start_date, end_date, employees_number, special_member } = request.body;

  client.query("UPDATE factory_list SET company_name = $1, start_date = $2, end_date=$3, employees_number = $4, special_member=$5 WHERE company_name = $1", [company_name, start_date, end_date, employees_number, special_member], (err, res) => {
    if (!err) {
      response.status(200).json(`user ${company_name} ${employees_number}, updated`);
    } else {
      throw err;
    }
  });
};

// Delete factories
const deleteFactory = (request, response) => {
  const { company_name } = request.body.company_name;
  client.query("DELETE FROM factory_list WHERE company_name = $1", [company_name], (err, res) => {
    if (!err) {
      response.status(200).send("factory deleted");
    } else {
      throw err;
    }
  });
};

// Get Factory Column
const getFactoryColumn = (request, response) => {
  client.query("SELECT column_name FROM information_schema.columns WHERE table_name='factory_list'", (err, res) => {
    if (!err) {
      response.status(200).send({ columns: res.rows });
    } else {
      throw err;
    }
  });
};

// Create Factory Column
const createFactoryColumn = (request, response) => {
  const { column_name, column_type } = request.body;

  client.query(`ALTER TABLE factory_list ADD ${column_name} ${column_type} `, (err, res) => {
    if (!err) {
      response.status(200).send("Column created");
    } else {
      throw err;
    }
  });
};

// Delete Factory Column
const deleteFactoryColumn = (request, response) => {
  const { column_name } = request.body.column_name;

  client.query(`ALTER TABLE factory_list DROP COLUMN ${column_name} `, (err, res) => {
    if (!err) {
      response.status(200).send("Column deleted");
    } else {
      throw err;
    }
  });
};

// convert to date format
function dateConverter(result_rows, result_length) {
  for (let i = 0; i < result_length; i++) {
    const _startDate = new Date(`${result_rows[i].start_date}`).toISOString().split("T")[0];
    const _endDate = new Date(`${result_rows[i].end_date}`).toISOString().split("T")[0];
    result_rows[i].start_date = _startDate;
    result_rows[i].end_date = _endDate;
  }
}

module.exports = { getAllFactory, createFactory, updateFactory, getFactory, deleteFactory, getFactoryColumn, createFactoryColumn, deleteFactoryColumn };
