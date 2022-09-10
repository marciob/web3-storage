import process from "process";
import minimist from "minimist";
import { Web3Storage, getFilesFromPath } from "web3.storage";

async function main() {
  //it creates a token
  const args = minimist(process.argv.slice(2));
  const token = args.token;

  //it verifies if there is a token
  if (!token) {
    return console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
  }

  //it verifies if there is a valid path
  if (args._.length < 1) {
    return console.error("Please supply the path to a file or directory");
  }

  //it creates an instance of a new connection to Web3storage API
  const storage = new Web3Storage({ token });
  //it creates an array of files to be uploaded to IPFS
  const files = [];

  //loop into all the files
  for (const path of args._) {
    const pathFiles = await getFilesFromPath(path);
    files.push(...pathFiles);
  }

  console.log(`Uploading ${files.length} files`);
  //it stores the file to IPFS
  const cid = await storage.put(files);
  console.log("Content added with CID:", cid);
}

main();
