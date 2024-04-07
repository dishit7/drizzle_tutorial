import "dotenv/config";
import { db } from "./drizzle/db";
import { UserTable } from "./drizzle/schema";

async function main() {
  await db.delete(UserTable)
  const userData = {
    name: "Kyle",
    age: 25,
    email: "test@twst.com"
  };
  console.log("UserData before insert:", userData ); // Log before insert
     debugger;
  const user1 = await db.insert(UserTable).values([{
    name:"Sally",
    age:32,
    email:"hi@hi.com"
  },{
    name: "Kyle",
    age: 25,
    email: "test@twst.com"
  },])
    .returning({
      id: UserTable.id,
    });
  console.log("Inserted user:", user1); // Log inserted user
}
main();
