const child_process = require('child_process');

// function that execute the command
function executeCommand(command){
    child_process.exec(command, (err, stderr, stdout)=>{
        // Checks if the commands fail
        if(err){
            console.log(`Error: ${err.message}`);
            return;
        }
        // Prints the standar err
        if(stderr){
            console.log(`${stderr}`);
        }
        console.log(stdout);
    });
}



module.exports = {
    status  : () => { executeCommand('git status') },
    help    : () => {
        console.log(`
            ====== Simplegit ======
            how to use it:
            $ simplegit [flags[...]]
            FLAGS:
            -h, --help    |--> help, shows the info about how the script works
            -s, --status  |--> status, shows the git status of the current repository
        `);
    },
    add     : (file) => { 
        if(file !== 'all'){
            executeCommand(`git add ${file}`);
        }else{
            executeCommand(`git add -A`);   
        }
    },
    commit  : (message) => { 
        if (message !== 'commit'){
            executeCommand(`git commit -m "${message}"`);
        }else{
            executeCommand('git commit -m "commit"');
        }
    },
    push    : () => { executeCommand('git push'); },
    log     : () => { executeCommand('git log --oneline --decorate --all --graph') }
}