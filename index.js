/*

    THE FOLLOWING CODE DOES THE JOB, BUT IS ASYNCHRONOUS.
    THIS WILL HAVE TO BE CHANGED TO A SYNCHRONOUS VERSION.

*/

const fs = require('fs');
const inquirer = require('inquirer');

const snip = require('./snippets/headerFile');

const questions = [
    {
        type : 'input',
        name : 'dir',
        message : '\n\nHi 🙋‍! Enter Contest Code :> '
    },
    {
        type : 'input',
        name : 'quesNo',
        message : '\nHow many questions ? 👨‍💻 :> '
    }
];

let currDir = "", noOfQues;

//process.exit(1);

inquirer.prompt(questions)
.then(answers => {


    currDir += answers['dir'];
    noOfQues = answers['quesNo'];

    console.log(`\n\nSearching for similar contests 🔎....\n`);

    let should = true;

    fs.mkdir(currDir, function (err) {
        if(err) {
            should = false;
        }
    
        else {
            console.log(`Great ! No contests exists. ${currDir} folder created 🤙🍕\n`);
        }
    });


    if(should) {
        console.log(`\nCreating C++ files with the templates ✍🏼....\n`);
        for(let i = 1; i <= noOfQues; i++) {
            fs.appendFile( currDir + '/' + i + '.cpp', snip.snip, function (err, res) {
                if(err) {
                    console.log(`\nSorry, the errors are : ${err.message} 🤒\n`);
                }
    
                else {
                    console.log(`File ${i}.cpp created 🔥`);
                    if(i == noOfQues) {
                        console.log(`\nIf you like it, drop a ⭐️ @ ( https://github.com/raunak-sharma/cpp-gen/ )\n\nWish you all the ✔️✔️✔️'s in the world !\nBye !\n`);
                    }
                }
            });
        }
    }

})
.catch(err => {
    if(err.code == "EEXIST") {
        console.log(`\nDude, the directory already exists 😂 !\n\n`);
    }
    else {
        console.log(`\nSorry, the error is : ${err.message} 🤒\n`);
    }
});
