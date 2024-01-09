"use client";

import { useState } from "react";
import { storage } from "@/firebase/firebase.config";
import UploadFilesServices from "@/services/UploadFiles.services";

export default function Upload() {
    const [file, setFile] = useState<File | null>();
    const [info, setInfo] = useState("");
    const [error, setError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    async function handleFileUpload() {
        console.log(file);
        if (!file) {
            setInfo("Select a file first to upload it!");
            setError(true);
            setIsLoading(false);
            return;
        }
        setInfo(
            "Uploading File, please don't close this windows till the operations is finished"
        );
        setError(false);
        setIsLoading(true);

        const { success, msg } = await UploadFilesServices.uploadFileToStorage(
            file
        );

        setInfo(msg);
        setError(!success);
        setIsLoading(false);
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="text-xl font-mono font-bold underline">
                Upload new file to shared folders
            </div>
            <div className="form-container my-6 flex flex-col items-center justify-center">
                <div className="file-upload-container my-6">
                    <div className="title py-2 italic font-semibold">
                        Select a file from your device to upload
                    </div>
                    <label htmlFor="file-upload"></label>
                    <input
                        type="file"
                        name="file-upload"
                        onChange={(e) => setFile(e.target.files?.item(0))}
                    />
                </div>
                <div className="button-container">
                    <div></div>

                    {isLoading ? (
                        <div className="w-6 h-6 border-4 border-y-slate-400 border-x-slate-600 rounded-full animate-spin"></div>
                    ) : (
                        <button
                            disabled={isLoading}
                            onClick={handleFileUpload}
                            className="mx-auto py-2 px-4 bg-slate-200/90 rounded-xl shadow-xl active:bg-slate-300 active:translate-y-0.5"
                        >
                            Upload
                        </button>
                    )}
                </div>
            </div>
            <div
                className={
                    "info-container text-center italic font-bold" +
                    (error ? " text-red-600" : " text-green-400")
                }
            >
                {info}
            </div>
        </main>
    );
}
