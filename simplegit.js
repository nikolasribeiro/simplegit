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
const FLAGS = {
    '-a': commands.add,
    '-s': commands.status,
    '-h': commands.help
}


// Checks if user puts arguments
if(arguments.length !== 0){
    
    // Loop over every argument get from terminal
    arguments.forEach((arg, index) => {
        
        if(arg.includes('-') || arg.includes('--')){

            switch (true) {

                case (arg.includes('h') || arg.includes('help')):
                    commands.help();
                    break;

                case (arg.includes('s') || arg.includes('status')):
                    commands.status();
                    break;

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

                case (arg.includes('c') ||arg.includes('commit')):
                    
                    if(arguments[index+1] === undefined){
                        commands.commit('commit');
                    }else{
                        commands.commit(arguments[index+1]);
                    }
                    break;
                
                case (arg.includes('p') ||arg.includes('push')):
                    commands.push('commit');
                    break;
                
                case (arg.includes('l') ||arg.includes('log')):
                    commands.log();
                    break;
            }
        }
    });

}else{
    commands.status();
    console.log('if you want to know the commands, you can use: simplegit -h');
}


