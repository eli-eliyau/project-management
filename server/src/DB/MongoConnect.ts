import mongoose from "mongoose"

require('dotenv').config('../../.env')

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(`${process.env.CONNECT_DB}`
    );
    console.log("connected mongoDB");
  } catch (err) {
    console.log(err);
  }
}
