var fs = require("fs");
const busboy = require("busboy");
const path = require("path");

async function view(req, res) {
  let filename = "";
  const bb = busboy({ headers: req.headers });
  bb.on("file", (name, file, info) => {
    filename = info.filename;
    const saveTo = path.join(__dirname + "/entities/", filename);
    file.pipe(fs.createWriteStream(saveTo));
  });
  bb.on("close", async () => {
    await generate();
    
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`upload success: ${filename}`);
  });
  req.pipe(bb);
}

async function generate() {
  const nameBkp = "TesteBkp";
  const resultBkp = await execShellCommand(`NAME_BKP=${nameBkp} npm run builder:backup-name-bkp`);
  console.info({resultBkp});
  const resultGenerate = await execShellCommand(`npm run builder:generate`);
  console.info({resultGenerate});
  const resultBuild = await execShellCommand(`npm run builder:build`);
  console.info({resultBuild});
}


function execShellCommand(cmd) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
   exec(cmd, (error, stdout, stderr) => {
    if (error) {
     console.info("console.warn", {error, stderr});
     resolve(false);
    }
    resolve(stdout? stdout : stderr);
   });
  });
 }


exports.view = view;
