const fs = require('fs');

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim().length > 0);
    const studentLines = lines.slice(1);

    const output = [];
    output.push(`Number of students: ${studentLines.length}`);

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
      output.push(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
    });

    resolve(output);
  });
});

module.exports = countStudents;
