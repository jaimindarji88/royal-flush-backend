# Royal Flush

Meant to be used as a starting point to create a poker app. Has super fast evaluations(using Pokerstove) and is abstracted to Node.js. I'm using nit, a forked version of pokerstove that is more recently maintained.

## Usage

<code>
git clone https://github.com/jaimindarji88/royal-flush-backend.git

cd royal-flush-backend

npm i
</code>

To be able to build nit/pokerstove, you must have

<code>
cmake >= 3.1
</code>

Now you can run

<code>
npm run build-nit
</code>

Boost is downloaded by this script and the nit library will be packaged to be used with the Node.js addon api, which is used in royal-flush.

## Issues

Create an issue in the issues tab, and I'll get to it ASAP, or create a pull request for the issue.
