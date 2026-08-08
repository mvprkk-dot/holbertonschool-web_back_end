const fs = require('fs');

const readDatabase = (path) => new Promise((resolve, reject) => {
  if (!path) {
    reject(new Error('Cannot load the database'));
    return;
  }

  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const fileLines = data
      .toString('utf-8')
      .trim()
      .split('\n');

    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1];

      if (!Object.keys(studentGroups).includes(field)) {
        studentGroups[field] = [];
      }

      // firstname özü propNames[0] olduğu üçün onu birbaşa götürürük
      const firstname = studentPropValues[0];
      studentGroups[field].push(firstname);
    }

    resolve(studentGroups);
  });
});

module.exports = readDatabase;
