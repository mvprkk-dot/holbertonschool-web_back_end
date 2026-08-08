const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(request, response) {
    const dbPath = process.argv[2];

    readDatabase(dbPath)
      .then((studentGroups) => {
        const responseParts = ['This is the list of our students'];
        const fields = Object.keys(studentGroups).sort((a, b) => a.localeCompare(b));

        for (const field of fields) {
          const names = studentGroups[field];
          responseParts.push(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
        }

        response.status(200).send(responseParts.join('\n'));
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const dbPath = process.argv[2];
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(dbPath)
      .then((studentGroups) => {
        const names = studentGroups[major] || [];
        response.status(200).send(`List: ${names.join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}

module.exports = StudentsController;
