import { Client, ID, TablesDB, Storage,Databases } from "appwrite";

class AppwriteService {
  client = new Client();
  tablesDB;
  databaseId = "68ebdc2a002d051ac810";
  tableId = "blogtable";
  bucketId = "68f31e6e00335af3f75b";
  storage;
  databases;

  constructor() {
    this.client
      .setEndpoint("https://nyc.cloud.appwrite.io/v1")
      .setProject("68ebca92001545f93334");

    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
    this.databases= new Databases(this.client)
  }

  async addData({ title, content, access, file }) {
    try {
      const imageref = await this.uploadImage(file[0]);
      const result = await this.tablesDB.createRow({
        databaseId: this.databaseId,
        tableId: this.tableId,
        rowId: ID.unique(),
        data: {
          title: title,
          content: content,
          access: access,
          file: imageref.$id,
        },
      });

      console.log(imageref);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadImage(image) {
    console.log(image);
    try {
      const response = await this.storage.createFile({
        bucketId: this.bucketId,
        fileId: ID.unique(),
        file: image,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllBlogs() {
    try {
      const result = await this.databases.listDocuments({
        databaseId: this.databaseId,
        collectionId: this.tableId,
      });
      return result
    } catch (error) {
      console.log(error)
    }
  }

    getFile(fileId){
    try {
      const response=this.storage.getFileView(this.bucketId, fileId)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

const databaseService = new AppwriteService();

export default databaseService;
