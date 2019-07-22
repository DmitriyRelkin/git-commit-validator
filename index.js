const path = require('path');
const fs = require('fs');
const process = require('process');

const GIT_DIRECTORY = '../../.git';
const ORIGINAL_GIT_HOOK_FILE = '../../.git/hooks/commit-msg.sample';
const PREPARED_GIT_HOOK_FILE = '../../.git/hooks/commit-msg';
const NEW_GIT_HOOK = './validate-commit-msg.js';

if (fs.existsSync(GIT_DIRECTORY)) {
  prepareGitHook();
  replaceGitHook();
}

function replaceGitHook() {
  var readedGitHookData;
  if (fs.existsSync(ORIGINAL_GIT_HOOK_FILE)) {
    fs.readFile(NEW_GIT_HOOK, (err, data) => {
      if (err) throw err;
      fs.writeFile(PREPARED_GIT_HOOK_FILE, data, (err) => {
        console.log('Adding new git hook...')
        if (err) throw err;
        console.log('Git hook has been added! =)');
      });
    });
  }
}

function prepareGitHook() {
  console.log('Preparing new git hook...');
  if (fs.existsSync(ORIGINAL_GIT_HOOK_FILE)) {
    fs.rename(ORIGINAL_GIT_HOOK_FILE, PREPARED_GIT_HOOK_FILE, (err) => {
      if (err) throw err;
      console.log('Preparing complete!');
    });
  } else {
    console.log(
    `
    Unfortunately, git-hook-msg will not be installed,
    because not found original git hook file. =(
    
    `
    );
  }
}