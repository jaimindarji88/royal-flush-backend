const shell = require('shelljs');
const path = require('path');


const child = shell.exec(
    './pokerstove/build/bin/ps-eval AcAs Kh4d --board 5c8s9hJdJs'
)

child.stdout;