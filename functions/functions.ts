import inquirer from "inquirer";
import { studentData } from "../database/database.js";

//Function for creating Prompt

type Prompt = {
  name: string;
  type: string;
  message: string;
  choices?: string[];
};

export const makePrompt = async (
  name: string,
  message: string,
  type: string = "input",
  choices?: any[]
) => {
  let question: Prompt = {
    name: name,
    type: type,
    message: message,
    choices: choices,
  };

  // here goes obj addition logic and array push logic

  studentData.push(question);

  let prompt = await inquirer.prompt([question]);
  console.log(prompt);
};


//function for student addmission

export let admitStudent = async () => {
  while (true) {
    let studentInfo = await inquirer.prompt([
      {
        message: "What is your name?",
        name: "name",
        type: "input",
      },
      {
        message: "What is your age?",
        name: "age",
        type: "input",
      },
      {
        message: "Which course do you want to enroll in?",
        name: "courses",
        type: "list",
        choices: ["Next.js", "Javascript", "Typescript", "HTML", "CSS"],
      },
      {
        message: "Generate a unique ID?",
        name: "generateID",
        type: "confirm",
      },
    ]);

    if (studentInfo.generateID) {
      studentInfo.ID = generateID();
      console.log(` Your unique ID is: ${studentInfo.ID}`);
    } else {
      console.log("ID is Obligatory!");
      return; // Exit the function if ID is not generated
    }

    studentData.push(studentInfo);

    let repeatprogramme = await inquirer.prompt({
      name: "repeat",
      type: "confirm",
      message: "Admit more students?",
    });

    if (!repeatprogramme.repeat) {
      console.log("All students are admitted");
      console.log(studentData);

      break;
    }
  }
};


//function for Generating unique student ID

export function generateID() {
  let ID = Math.floor(Math.random() * 90000) + 10000;
  return ID;
}

//delete student function

export let deleteStudent = async () => {
  let confirmDelete = await inquirer.prompt({
    name: "confirm",
    type: "confirm",
    message: "Do you really want to delete this student?",
  });

  if (confirmDelete.confirm) {
    let { studentID } = await inquirer.prompt({
      name: "studentID",
      type: "number",
      message: "Enter the student ID to delete",
    });

    let studentToDeleteIndex = studentData.findIndex(
      (student) => student.ID === studentID
    );

    console.log(`the student with the following data was deleted`);

    let deletedStudent = studentData.splice(studentToDeleteIndex, 1);

    console.log(deletedStudent);
  } else {
    console.log("Deletion cancelled");
  }
};


// Function to show student status
export let showStatus = async () => {
  let { ID } = await inquirer.prompt({
    name: "ID",
    type: "number",
    message: "Enter the student ID to check status",
  });

  let student = studentData.find((student) => student.ID === ID);
  if (student) {
    console.log(`Student Name: ${student.name}`);
    console.log(`Age: ${student.age}`);
    console.log(`ID: ${student.ID}`);
    console.log(`Course Enrolled: ${student.courses}`);
    console.log(`Fee Status: ${student.feePaid}`);
    console.log(`Due Fee: ${student.dueFee}`);
  } else {
    console.log("Student not found!");
  }
};

// ...
// enroll in a course
export let enrollment = async () => {
  let confirmID = await inquirer.prompt({
    name: "studentID",
    type: "number",
    message: "Enter student ID",
  });

  let student = studentData.find(
    (student) => student.ID === confirmID.studentID
  );

  if (student) {
    // Ensure student.courses is an array
    if (!Array.isArray(student.courses)) {
      student.courses = [];
    }

    let { course } = await inquirer.prompt({
      name: "course",
      type: "list",
      choices: ["HTML", "CSS", "JavaScript", "Typescript", "Next.js"],
      message: "Select the courses you want to enroll",
    });

    student.courses.push(course);

    console.log(`Student successfully enrolled in ${course}`);
  } else {
    console.log("Invalid ID");
  }
};
