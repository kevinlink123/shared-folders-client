import { storage } from "@/firebase/firebase.config";
import { fileData } from "@/types/filesData.types";
import axios from "axios";
import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable,
} from "firebase/storage";

class UploadFilesService {
    private readonly baseUrl = "https://shared-folders.onrender.com";

    async getAllFiles() {
        try {
            const res = await fetch(`${this.baseUrl}/storage`);
            const data: fileData[] = await res.json();
            console.log(res);
            return data;

        } catch(e: any) {
            console.log(e);
            return [];
        }
    }

    async uploadFileToStorage(file: File) {
        const formData = new FormData();

        formData.append("file", file);
        console.log("shushushu")
        try {
            const res = await fetch(`${this.baseUrl}/storage/upload`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            console.log("Request exitosa");
            return {
                success: true,
                msg: "File uploaded succesfully!"
            }
        } catch (e: any) {
            console.log(e);
            return {
                success: false,
                msg: "Error while trying to upload the file"
            }
        }
    }
}
export default new UploadFilesService();
