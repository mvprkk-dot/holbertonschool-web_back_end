export default function updateStudentGradeByCity(students, city, newGrades = []) {
  if (!Array.isArray(students)) {
    return [];
  }
  
  const grades = Array.isArray(newGrades) ? newGrades : [];
  
  return students
    .filter((student) => student.location === city)
    .map((student) => {
      const studentGrade = grades.filter((grade) => grade.studentId === student.id);
        
      return {
        ...student,
        grade: studentGrade.length > 0 ? studentGrade[0].grade : 'N/A',
      };
    });
}
