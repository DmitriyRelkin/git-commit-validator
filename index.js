const path = require('path');
const fs = require('fs');
const process = require('process');


if (fs.existsSync('../../.git')) {
  prepareGitHook();
  replaceGitHook();
}


function replaceGitHook() {
  var newGitHook;
  const changedCommitFileFormat = '../../.git/hooks/commit-msg';

  fs.readFile('./git-commit-validator.js', (err, data) => {
    console.log('Take data from git-commit-validator');
    if (err) throw err;
    newGitHook = data;

    writeFile(changedCommitFileFormat, newGitHook, (err) => {
      console.log('Changing standart git hook')
      if (err) throw err;
      console.log('The git hook has been saved!');
    });
  });
}

// RENAME
function prepareGitHook() {
  const msgCommitFile = '../../.git/hooks/commit-msg.sample';
  const changedCommitFileFormat = '../../.git/hooks/commit-msg';
  console.log('Preparing git hook');

  if (fs.existsSync(msgCommitFile)) {
    fs.rename(msgCommitFile, changedCommitFileFormat, (err) => {
      if (err) throw err;
    console.log('Preparing complete!');
  });
  }
}

// TODO: Need to add the check if git hook not available