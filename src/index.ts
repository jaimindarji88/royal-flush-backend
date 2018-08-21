import shelljs from 'shelljs';

const child = shelljs.exec(
  './pokerstove/build/bin/ps-eval AcAs Kh4d --board 5c8s9hJdJs',
);
