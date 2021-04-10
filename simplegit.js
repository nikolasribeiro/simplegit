#!/usr/bin/env node
/**
 * SimpleGit is a simple layer to use git on Linux
 * Author: Nicolas Ribeiro
 */
const commands = require('./utils/commands');
const process = require('process');

/*
Splice method set the start of the list, in this case, just ommit the first 2 elements
from terminal arguments
*/
const arguments = process.argv.splice(2);

 
// Checks if user puts arguments
if(arguments.length !== 0){
    
    // Loop over every argument get from terminal
    arguments.forEach((arg, index) => {
        
        if(arg.includes('-') || arg.includes('--')){

            switch (true) {

                // Help command
                case (arg.includes('h') || arg.includes('help')):
                    commands.help();
                    break;

                // git status command
                case (arg.includes('s') || arg.includes('status')):
                    commands.status();
                    break;

                // git add command
                case (arg.includes('a') || arg.includes('add')):

                    // checks if the flags with double dash exist
                    if (arguments[index].includes('--all')){
                        commands.add('all');
                        break;
                    }
                    else if (arguments[index+1].includes('--file')){
                        commands.add(arguments[index+2]);
                        break;
                    }
                    break;

                // git commit command
                case (arg.includes('c') ||arg.includes('commit')):
                    
                    if(arguments[index+1] === undefined){
                        commands.commit('commit');
                    }else{
                        commands.commit(arguments[index+1]);
                    }
                    break;
                
                // git push command
                case (arg.includes('p') ||arg.includes('push')):
                    commands.push('commit');
                    break;
                
                // git log command
                case (arg.includes('l') ||arg.includes('log')):
                    commands.log();
                    break;

                // git checkout command
                case (arg.includes('Ch') ||arg.includes('checkout')):

                    if(arguments[index+1] === undefined){
                        return;
                    }else{
                        commands.checkout(arguments[index+1]);
                    }
                    break;
                
                /*
                    DOITALL is a custom command that made your you
                    the git status, git add -A, git commit with a
                    custom text if you want it and push
                */
                case (arg.includes('DOITALL')):
                    commands.status();
                    commands.add('all');
                    if(arguments[index+1] === undefined){
                        commands.commit('commit');
                    }else{
                        commands.commit(arguments[index+1]);
                    }
                    commands.push();
                    break;

                case (arg.includes('b') ||arg.includes('blame')):
                    if(arguments[index+1] === undefined){
                        console.log("You need to add a target file to blame");
                    }else{
                        commands.blame(arguments[index+1]);
                    }
                    break;


                default:
                    console.log('Command error: -h or --help for more info');
                    break;
            }
        }
    });
 

}else{
    commands.status();
    console.log('if you want to know the commands, you can use: simplegit -h');
}


