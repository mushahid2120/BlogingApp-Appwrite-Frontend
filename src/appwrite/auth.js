import { Client, Account, Databases, ID } from "appwrite";

class Auth{
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint("https://nyc.cloud.appwrite.io/v1")
      .setProject("68ebca92001545f93334");

    this.account = new Account(this.client);
  }

  async UserLogin({ email, password }) {
    try {
      const sesssionId = await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
      return { isSuccess: true, error: "" };
    } catch (error) {
      return { isSuccess: false, error: error.message };
    }
  }

  async UserSignUp({ name, email, password }) {
    try {
      const user = await this.account.create({
        userId: ID.unique(),
        name: name,
        email: email,
        password: password,
      });
      return this.UserLogin({email,password})

    } catch (error) {
      console.dir(error);
      return { isSuccess: false, error: error.message };
    }
  }

  async UserLogout() {
    try {
      await this.account.deleteSession("current");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async isSessionActive() {
    try {
      const resp=await this.account.get()
      return true;
    } catch (error) {
      return false;
    }
  }
}

 const userAuth=new Auth()
 export default userAuth


// export const client = new Client()
//   .setEndpoint("https://nyc.cloud.appwrite.io/v1")
//   .setProject("68ebca92001545f93334");

// export const account = new Account(client);

// export async function UserLogin({ email, password }) {
//   try {
//     const sesssionId=await account.createEmailPasswordSession({
//       email: email,
//       password: password,
//     });
//     return {isSuccess: true,error: ''}
//   } catch (error) {
//     console.dir(error);
//     return {isSuccess: false,error: error.message}
//   }
// }

// export async function UserSignUp({ name, email, password }) {
//   try {
//     const user = await account.create({
//       userId: ID.unique(),
//       name: name,
//       email: email,
//       password: password,
//     });
//     return {isSuccess: true,error: ''}
//   } catch (error) {
//     console.dir(error);
//     return {isSuccess: false,error: error.message}
//   }
// }

// export async function UserLogout(){
//   try {
//     await account.deleteSession('current');
//     return true
//   } catch (error) {
//     console.log(error)
//     return false;
//   }
// }

// export async function isSessionActive() {
//   try {
//     const session = await account.getSession('current');
//     return true;
//   } catch (error) {
//     return false;
//   }
// }
