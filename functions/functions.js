import inquirer from "inquirer";
import { studentData } from "../database/database.js";
//Function for creating Prompt 
export const makePrompt = async (name, message, type = "input", choices) => {
    let question = {
        name: name,
        type: type,
        message: message,
        ...(choices && { choices: choices })
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
                message: "Generate a unique ID?",
                name: "generateID",
                type: "confirm",
            },
        ]);
        if (studentInfo.generateID) {
            studentInfo.ID = generateID();
            console.log(` Your unique ID is: ${studentInfo.ID}`);
        }
        else {
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
        message: "Do you really want to delete this student?"
    });
    if (confirmDelete.confirm) {
        let { studentID } = await inquirer.prompt({
            name: "studentID",
            type: "number",
            message: "Enter the student ID to delete"
        });
        let studentToDeleteIndex = studentData.findIndex(student => student.ID === studentID);
        console.log(`the student with the following data was deleted`);
        let deletedStudent = studentData.splice(studentToDeleteIndex, 1);
        console.log(deletedStudent);
    }
    else {
        console.log("Deletion cancelled");
    }
};
//////////////////////////////////////
/////////////////////////////////////
// Function to show student status
export let showStatus = async () => {
    let { ID } = await inquirer.prompt({
        name: "ID",
        type: "number",
        message: "Enter the student ID to check status"
    });
    let student = studentData.find(student => student.ID === ID);
    if (student) {
        console.log(`Student Name: ${student.name}`);
        console.log(`Age: ${student.age}`);
        console.log(`ID: ${student.ID}`);
        console.log(`Fee Status: ${student.fee}`);
        console.log(`Due Fee: ${student.dueFee}`);
    }
    else {
        console.log("Student not found!");
    }
};
// Function to update student information
// export let updateStudent = async () => {
//   let { ID } = await inquirer.prompt({
//     name: "ID",
//     type: "number",
//     message: "Enter the student ID to update information"
//   });
//   let index = studentData.findIndex(student => student.ID === ID);
//   if (index !== -1) {
//     let updates = await inquirer.prompt([
//       {
//         name: "name",
//         type: "input",
//         message: "Enter the new name (press enter to skip)"
//       },
//       {
//         name: "age",
//         type: "input",
//         message: "Enter the new age (press enter to skip)"
//       }
//       // Add more prompts if you want to update other fields
//     ]);
//     studentData[index] = {
//       ...studentData[index],
//       ...(updates.name && { name: updates.name }),
//       ...(updates.age && { age: updates.age })
//       // Add more fields here if necessary
//     };
//     console.log(`Student information updated for ID: ${ID}`);
//   } else {
//     console.log("Student not found!");
//   }
// };
// Function to enroll in a course
// export let enrollInCourse = async () => {
//   let { ID } = await inquirer.prompt({
//     name: "ID",
//     type: "number",
//     message: "Enter the student ID to enroll in a course"
//   });
//   let student = studentData.find(student => student.ID === ID);
//   if (student) {
//     let { course } = await inquirer.prompt({
//       name: "course",
//       type: "input",
//       message: "Enter the course name to enroll"
//     });
//     // Assuming you have a property 'courses' in your Student interface
//     student.courses = student.courses || [];
//     student.courses.push(course);
//     console.log(`Student ID: ${ID} enrolled in course: ${course}`);
//   } else {
//     console.log("Student not found!");
//   }
// };
// // Update the main function to include the new options
// let main = async function () {
//   // ... existing code
//   else if (Userchoice === "Show student status") {
//     await showStatus();
//   }
//   else if (Userchoice === "Update student information") {
//     await updateStudent();
//   }
//   else if (Userchoice === "Enroll in a course") {
//     await enrollInCourse();
//   }
//   // ... rest of the main function
// };
// main();
//enroll in a cource
export let enrollment = async () => {
    let confirmID = await inquirer.prompt({
        name: "ID",
        type: "input",
        message: "Enter student ID",
    });
    let studentID = studentData.find(student => student.ID === confirmID.ID);
    if (studentID) {
        let courses = await inquirer.prompt({
            name: "course",
            type: "list",
            choices: ["HTML", "CSS", "JavaScript", "Typescript", "Next.js"],
            message: "Select the courses you want to enroll",
        });
        studentData[studentID].courses = courses.course;
        console.log(`Student succesfully enrolled`);
    }
    else {
        console.log("Invalid ID");
    }
};
