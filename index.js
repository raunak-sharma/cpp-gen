const fs = require('fs');
const inquirer = require('inquirer');

const snip = require('./snippets.js/headerFile');

const questions = [
    {
        type : 'input',
        name : 'dir',
        message : '\nEnter a Contest Name (Contest Code preffered 😵) : '
    },
    {
        type : 'input',
        name : 'quesNo',
        message : '\nHow many questions ? : '
    }
];

let currDir = "", noOfQues;

inquirer.prompt(questions)
.then(answers => {

    currDir += answers['dir'];
    noOfQues = answers['quesNo'];

    console.log(`\n\nSearching for similar contests 🔎\n`);


    fs.mkdir(currDir, function (err) {
        if(err) {
            if(err.code == "EEXIST") {
                console.log(`\nDude, the directory already exists 😂 !\n\n`);
            }
            else {
                console.log(`\nSorry, the error is : ${err.message} 🤒\n`);
            }
        }
    
        else {
            console.log(`GO, GO, GO ! Contest FOLDER Created. 🤙🍕\n`);
        }
    });


    for(let i = 1; i <= noOfQues; i++) {
        fs.appendFileSync( currDir + '/' + i + '.cpp', snip.snip, function (err) {
            if(err) {
                if(err.code == "EEXIST") {
                    console.log(`\nDude, the files exist 😂😂 !\n\n`);
                }
                else {
                    console.log(`\nSorry, the errors are : ${err.message} 🤒\n`);
                }
            }
        
            else {
                console.log(`GO, GO, GO ! Contest FILES CREATED. 🤙🍕\n`);
            }
        });
   }

})
.catch(err => {
    console.log(`Error exists : ${err.message}\n`);
});
