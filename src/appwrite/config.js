import conf from './config';
import { Client, ID, Database, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.database = new Database(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, {
                title,
                content,
                featuredImage,
                status,
                userId,
            });

        } catch (error) {
            console.log("Appwrite Services :: createPost Error", error);
        }

    }

    async updatePost(slug, {title, content, featuredImage, status, userId }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, {
                title,
                content,
                featuredImage,
                status,
                userId,
            });

        } catch (error) {
            console.log("Appwrite Services :: updatePost Error", error);
            
        }

    }

    async deletePost(slug) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug)
                return true;

        } catch (error) {
            console.log("Appwrite Services :: deletePost Erroe",error);
            return false;
            
        }

    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug);

        } catch (error) {
            console.log("Appwrite Services :: getPost Error", error);
        }

    }

    async getPosts(queries = [Query.equals('status', 'active')]) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId),
                queries;


        } catch (error) {
            console.log("Appwrite Services :: getPosts Error", error);
            return false
        }

    }

    // File upload services
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file)

        } catch (error) {
            console.log("AuthService :: uploadFile Error", error);
            return false;
        }

    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId)
                return true;

        } catch (error) {
            console.log("AuthService :: deleteFile Error", error);
            return false;
        }

    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId);
            
    }
}

const service = new Service();

export default service;