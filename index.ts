#! /usr/bin/env node

import inquirer from 'inquirer'


class student {
    id:string;
    name:string;
    coursesEnrolled:string[];
    feesAmount:number;


    constructor(id:string,name:string,coursesEnrolled:string[],feesAmount:number){
        this.id = id
        this.name = name
        this.coursesEnrolled = coursesEnrolled
        this.feesAmount = feesAmount
    }
}

let baseId = 12345
let studentId:string = '';
let continueEnrollment = true;

let students:student[] = []


do{
    let action = await inquirer.prompt({
        type:"list",
        name:"ans",
        message:"Please select an option:",
        choices: ["Enroll a Student","Show student status"]
    })

    if(action.ans === "Enroll a Student"){
        let studentName = await inquirer.prompt({
            type:"input",
            name:"ans",
            message:"Please Enter your name"
        })
        let trimStudentName = (studentName.ans).trim().toLowerCase()
        let studentNameCheck = students.map(obj =>  obj.name)

        if(studentNameCheck.includes(trimStudentName) === false){
            if(trimStudentName !== ""){
                baseId++
                studentId = "STID" + baseId
    
    
                console.log("Your accout has been created")
                console.log(`Welcome ${trimStudentName}!`)

                let course = await inquirer.prompt({
                    type:"list",
                    name:"ans",
                    message:"Please select a course",
                    choices:["Web Development","Digital Marketing","Cyber Secutity"]



                })

                let courseFees = 0;
                switch(course.ans){
                    case "Web Development" :
                    courseFees = 3000;
                    break;

                    case "Digital Marketing" :
                        courseFees = 2000;
                        break;

                        case "Cyber Secutity" :
                            courseFees = 5000;
                            break;
                }

                let courseConfirm = await inquirer.prompt({
                    type:"confirm",
                    name:"ans",
                    message:"Do you want to enroll in this course"
                })

                if(courseConfirm.ans === true){
                    let Student = new student(studentId,trimStudentName,[course.ans],courseFees)
                    students.push(Student)

                    console.log("You have enrolled in this Course");
                    
                }

    
    
            }else{
                console.log("Invalid Name");
                
            }
            
        }else{
            console.log("This name is already exists");
            
        
    }

}

else if(action.ans === "Show student status"){
    if(students.length !== 0){
        let studentNamesCheck = students.map(e => e.name)

        let studentSelected = await inquirer.prompt({
            type:"list",
            name:"ans",
            message:"Please select name",
            choices:studentNamesCheck
        })

        let foundStudent = students.find(Student => Student.name === studentSelected.ans )

        console.log("Student Information");
        console.log(foundStudent);
        console.log("\n");
        
        
        
    }else{
        console.log("Record is empty");
        
    }
}

let userConfirm = await inquirer.prompt({
    type:"confirm",
    name:"ans",
    message:"Do you want to continue?"
})

if(userConfirm.ans === false){
    continueEnrollment = false
}

}while(continueEnrollment)    