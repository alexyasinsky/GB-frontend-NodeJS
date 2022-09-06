import fs from 'fs';
import readline from 'readline';

generateRequestFileWithSizeInMb(10);

const ips = [
  '9.0.0.0',
  '128.0.0.0',
  '89.0.0.0',
  '34.0.0.0'
]

const fileName = './requests.log';

filterFileByIps(fileName, ips);

async function filterFileByIps(file, ipsArray) {
  const fileStream = fs.createReadStream(file, 'utf8');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (let line of rl) {
    ipsArray.forEach(ip => {
      writeIpLogFile(ip, line);
    })
    
  }
}


function writeIpLogFile(ip, line) {
  const regexp = new RegExp(`^${ip}\\s`, 'i');
  if (regexp.test(line)) {
    line += '\n';
    fs.writeFile(`./ip-${ip}.log`, line, {flag: 'a'}, err => {
       err && console.log('error: ', err);
    });
  }
}

function generateRequestFileWithSizeInMb(targetSize) {
  const request = generateRequestString();
  fs.writeFileSync('./requests.log', request, {flag: 'a'});
  const fileWithOneStringSize = fs.statSync('./requests.log').size;
  const targetSizeInBytes = targetSize * 1024 * 1024;
  for (let i = 0; i < targetSizeInBytes / fileWithOneStringSize; i++) {
    const request = generateRequestString();
    fs.writeFileSync('./requests.log', request, {flag: 'a'});
  }
}

function generateRequestString() {
  const ip1 = Math.floor(Math.random( ) * 256);
  const ip2 = 0;
  const ip3 = 0;
  const ip4 = 0;
  return `${ip1}.${ip2}.${ip3}.${ip4} - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"\n`;
}