
import inquirer from "inquirer";
import { studentData,Student } from "../database/database.js";

//Pay fee function 

export const payFee = async function() {
  
  let studentOrdinal = "student";
  let singular_plural:string = "is"; 

if(studentData.length > 1 || studentData.length === 0  ){
    studentOrdinal = "students";
    singular_plural = "are";

}else{
  singular_plural = "is"
}

console.log(`There ${singular_plural} ${studentData.length} ${studentOrdinal}`);

if(studentData.length !== 0){

  
const answer = await inquirer.prompt([
  {
    name:"confirm",
    type:"confirm",
    message:"Do you want to pay student fee?",
    //when fee is paid, prompt wont ask for fee 
  }
  
]);

if(answer.confirm === false){

  console.log(`Thanks for Visiting!`);
}else{

  let payment = await inquirer.prompt([
     {
    message: `
    Do you want to pay fee for the student?
    course fee is  $${courseFee}
    Your Bank Balance is $${studentBalance}`,
    name: "courseFee",
    type: "list",
    choices:["Yes","No","Pay custom amount"]
  },
  {
    message: `
    Enter the Student ID to pay : $${courseFee}
    Your Bank Balance is $${studentBalance}`,
    name: "studentID",
    type: "number",
    when: (answers) => answers.courseFee === "Yes"
  }

]);


let studentToPay:any = studentData.find(student => student.ID === payment.studentID );

if(payment.courseFee === "Yes"){


  if(studentBalance >= courseFee){
  console.log(`Course fee has been paid! 
  Your remaining balance is $${studentBalance -= courseFee} `);
  studentToPay.dueFee -= courseFee;
  studentToPay.feePaid = true;
  }else{
    console.log("Insufficient balance");
    
  }
}else{
  
  console.log(`Your credit amount is $${studentToPay.dueFee} `);  
}

}
  
}


}



//random student balance 
let studentBalance = Math.floor(Math.random()*3000 + 2000);
let courseFee = Math.floor(Math.random()*300 + 200);


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
        message: `
        Do you want to pay fee for the course?
        course fee is  $${courseFee}
        Your Bank Balance is $${studentBalance}`,
        name: "courseFee",
        type: "list",
        choices:["Yeah sure","Maybe later"]
      },
      {
        message: `
        Enter the fee for the course: $${courseFee}
        Your Bank Balance is $${studentBalance}`,
        name: "courseFee",
        type: "number",
        when: (answers) => answers.courseFee === "Yeah sure"
      },
    ]);

    if(studentInfo.courseFee === "Yeah sure"){
      if(studentBalance >= courseFee){
      console.log(`Course fee has been paid! 
      Your remaining balance is ${studentBalance -= courseFee} `);
      studentInfo.feePaid = true;
      }else{
        console.log("Insufficient balance");
        
      }
    }else{
      studentInfo.dueFee = courseFee;
      studentInfo.feePaid = false;
      console.log(`Your credit amount is $${studentInfo.dueFee} `);  
    }

    // Generate a unique ID for the student
    studentInfo.ID = generateID();
    console.log(`Your unique ID is: ${studentInfo.ID}`);

    // Converting age and dueFee to numbers
    studentInfo.age = Number(studentInfo.age);
    studentInfo.dueFee = Number(studentInfo.dueFee) || 0; 

    // Initializing courses as an array with the selected course
    studentInfo.courses = [studentInfo.courses];

    // Pushing the new student into the studentData array in database
    studentData.push(studentInfo as Student);

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
  } else {
    console.log("Invalid ID");
  }
};