const fs = require('fs');

const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath) || !fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  const content = fs.readFileSync(dataPath, 'utf-8');
  const lines = content.split('\n').filter((line) => line.trim().length > 0);

  if (lines.length <= 1) {
    console.log('Number of students: 0');
    return;
  }

  const studentLines = lines.slice(1);
  console.log(`Number of students: ${studentLines.length}`);

  const fields = {};

  studentLines.forEach((line) => {
    const studentData = line.split(',');
    const firstname = studentData[0];
    const field = studentData[3];

    if (firstname && field) {
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    }
  });

  Object.keys(fields).forEach((field) => {
    console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
  });
};

module.exports = countStudents;
