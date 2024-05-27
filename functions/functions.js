import inquirer from "inquirer";
import { studentData } from "../database/database.js";
// Function to generate unique student ID
export function generateID() {
    let ID = Math.floor(Math.random() * 90000) + 10000;
    return ID;
}
// Function for student admission
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
                choices: ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js"],
            },
            {
                message: "Have you paid the fee?",
                name: "feePaid",
                type: "confirm",
            },
            {
                message: "Enter the due fee amount:",
                name: "dueFee",
                type: "number",
                when: (answers) => !answers.feePaid, // Ask this only if the fee is not paid
            },
        ]);
        // Generate a unique ID for the student
        studentInfo.ID = generateID();
        console.log(`Your unique ID is: ${studentInfo.ID}`);
        // Convert age and dueFee to numbers
        studentInfo.age = Number(studentInfo.age);
        studentInfo.dueFee = Number(studentInfo.dueFee) || 0; // Default to 0 if not provided
        // Initialize courses as an array with the selected course
        studentInfo.courses = [studentInfo.courses];
        // Push the new student into the studentData array
        studentData.push(studentInfo);
        let repeatProgramme = await inquirer.prompt({
            name: "repeat",
            type: "confirm",
            message: "Admit more students?",
        });
        if (!repeatProgramme.repeat) {
            console.log("All students are admitted");
            console.log(studentData);
            break;
        }
    }
};
// ... (rest of your code)
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
        let studentToDeleteIndex = studentData.findIndex((student) => student.ID === studentID);
        console.log(`the student with the following data was deleted`);
        let deletedStudent = studentData.splice(studentToDeleteIndex, 1);
        console.log(deletedStudent);
    }
    else {
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
    }
    else {
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
    let student = studentData.find((student) => student.ID === confirmID.studentID);
    if (student) {
        // Ensure student.courses is an array
        if (!student.courses) {
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
    }
    else {
        console.log("Invalid ID");
    }
};
