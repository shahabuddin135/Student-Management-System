// #!/usr/bin/env node

import inquirer from "inquirer";
import { studentData } from "../database/database.js";
import { admitStudent, showStatus } from "../functions/functions.js";
import { makePrompt } from "../functions/functions.js";
import { generateID } from "../functions/functions.js";
import { deleteStudent } from "../functions/functions.js";
import { enrollment } from "../functions/functions.js";


 let main = async function () {
  let { Userchoice } = await inquirer.prompt({
      name: "Userchoice",
      type: "list",
      choices: ["Pay fee", "Admit student", "Show student status","Delete student", "Enroll in a course", "Exit"],
      message: "What would you like to do?"
  });
  if (Userchoice === "Admit student") {
      
    await admitStudent();
    await main();
  }
  else if (Userchoice === "Delete student") {
     await deleteStudent();
     await main();
  }else if(Userchoice === "Show student status"){
    await showStatus();
    await main();
  }else if(Userchoice === "Enroll in a course"){
    await enrollment();
    await  main();
  }
};

main();



