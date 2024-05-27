
// This will store all student records status and Data

//voyager shahab

import inquirer from "inquirer";
export interface Student {
    name?: string;
    age?:number;
    ID?: number;
    courses:any[];
    feePaid?:true;
    dueFee?:number;

};


export const studentData:Student[] = []; 


