#!/usr/bin/env node

const fs = require('fs');
const message = fs.readFileSync(process.argv[2], 'utf8').trim();
const msgRegexp = /(^Task|Defect|Hotfix)(\/)(IN-)([0-9]{1,7})(:{1,1})(\s)(.*)$/;
const isMessageCorrect = msgRegexp.test(message);

if (!isMessageCorrect) {
  console.log(
    `
    [POLICY] Your message is not formatted correctly!
    Message format must be like:
    Task/IN-9999: Task description
    Where task can be a type of: Task | Defect | Hotfix
    `
  );
  process.exit(1)
}
