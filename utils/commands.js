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
    status   : () => { executeCommand('git status') },
    help     : () => {
        console.log(`
            .============================================= SIMPLEGIT =============================================. 
                how to use it:          
                $ simplegit [flags[...]]          
                FLAGS:                    
                -h, --help      |--> help, shows the info about how the script works

                -s, --status    |--> status, shows the git status of the current repository

                -a, --add       |--> add, Adds the current changes to commit later, is necessary to use
                                     --all if you want to add for commit all the changes or --file if 
                                     you want to add only one file for commit.
                -c, --commit    |--> commit, Commit all the changes that you previously added

                -p, --push      |--> push, Push all the commits to the remote repository

                -l, --log       |--> Log, shows the history of changes and commits in a nice looking way,
                                     also you get the commit ID if you want to checkout to a specific commit
                -Ch,--Checkout  |--> Checkout, move to another branch or previous commit

                -DOITALL        |--> DOITALL, custom command that mades for you git status, git add -A, git commit 
                                     and git push. If you want a specific commit message, you need to do: 
                                        $ simplegit -DOITALL "YOUR COMMIT MESSAGE HERE"
                                     if you dont put a specific commit message, by default, the commit message
                                     will be 'commit'
                -b, --blame     |--> Blame, shows you who change a file
            .======================================================================================================.
        `);
    }, 
    add      : (file) => { 
        if(file !== 'all'){
            executeCommand(`git add ${file}`);
        }else{
            executeCommand(`git add -A`);   
        }
    },
    commit   : (message) => { 
        if (message !== 'commit'){
            executeCommand(`git commit -m "${message}"`);
        }else{
            executeCommand('git commit -m "commit"');
        }
    },
    push     : () => { executeCommand('git push'); },
    log      : () => { executeCommand('git log --oneline --decorate --all --graph') },
    checkout : (target) => { executeCommand(`git checkout ${target}`) },
    blame    : (file) => { file !== '' ? executeCommand(`git blame ${file}`) : console.log() },
    branch   : (name) => { name !== '' ? executeCommand(`git branch ${name}`): console.log()}

}