import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Configuration - Set your start and end dates here
const CONFIG = {
  startDate: moment("2025-11-08"), // Start date
  endDate: moment("2025-11-11"), // End date
  commitCount: 100, // Number of commits to create
};

const markCommit = (x, y) => {
  const date = moment(CONFIG.startDate).add(x, "w").add(y, "d").format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  let date = moment(CONFIG.startDate).add(x, "w").add(y, "d");

  // Ensure date is within the configured range
  if (date.isAfter(CONFIG.endDate)) {
    date = moment(CONFIG.endDate);
  }
  if (date.isBefore(CONFIG.startDate)) {
    date = moment(CONFIG.startDate);
  }

  date = date.format();
  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(CONFIG.commitCount);
