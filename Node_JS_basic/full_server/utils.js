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

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const firstname = studentRecord[0];
      const field = studentRecord[studentRecord.length - 1];

      if (!Object.keys(studentGroups).includes(field)) {
        studentGroups[field] = [];
      }

      studentGroups[field].push(firstname);
    }

    resolve(studentGroups);
  });
});

module.exports = readDatabase;
