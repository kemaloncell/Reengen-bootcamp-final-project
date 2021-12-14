const client = require("../../config/db");

// Get all factories
const getAllFactoryName = (request, response) => {
  client.query("SELECT * FROM factory_name", (err, res) => {
    if (!err) {
      dateConverter(res.rows, res.rows.length);
      response.status(200).json({ factoryData: res.rows });
    } else {
      throw err;
    }
  });
};

// Update factories
const updateFactoryName = (request, response) => {
  const { unit_using, date_range, usage, usage_fee, discounted_price } = request.body;

  client.query("UPDATE factory_name SET unit_using = $1, date_range = $2, usage=$3, usage_fee = $4, discounted_price=$5 WHERE unit_using = $1", [unit_using, date_range, usage, usage_fee, discounted_price], (err, res) => {
    if (!err) {
      response.status(200).json(`factory data updated`);
    } else {
      throw err;
    }
  });
};

// Delete factories
const deleteFactoryName = (request, response) => {
  const { unit_using } = request.body.unit_using;
  client.query("DELETE FROM factory_name WHERE unit_using = $1", [unit_using], (err, res) => {
    if (!err) {
      response.status(200).send("factory deleted");
    } else {
      throw err;
    }
  });
};

// Get Factory Column
const getFactoryNameColumn = (request, response) => {
  client.query("SELECT column_name FROM information_schema.columns WHERE table_name='factory_name'", (err, res) => {
    if (!err) {
      response.status(200).send({ columns: res.rows });
    } else {
      throw err;
    }
  });
};

// Create Factory Column
const createFactoryNameColumn = (request, response) => {
  const { column_name, column_type } = request.body;
  client.query(`ALTER TABLE factory_name ADD ${column_name} ${column_type} `, (err, res) => {
    if (!err) {
      response.status(200).send("Column created");
    } else {
      throw err;
    }
  });
};

// Delete Factory Column
const deleteFactoryNameColumn = (request, response) => {
  const { column_name } = request.body.column_name;
  client.query(`ALTER TABLE factory_name DROP COLUMN ${column_name} `, (err, res) => {
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
    const _date_range = result_rows[i].date_range.replace("[", "").replace(")", "");
    result_rows[i].date_range = _date_range;
  }
}

module.exports = { getAllFactoryName, updateFactoryName, deleteFactoryName, getFactoryNameColumn, createFactoryNameColumn, deleteFactoryNameColumn };
