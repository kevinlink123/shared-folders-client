"use client";

import UploadFilesServices from "@/services/UploadFiles.services";
import { fileData } from "@/types/filesData.types";
import { useEffect, useState } from "react";

export default function Home() {
    const [urls, setUrls] = useState<fileData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const filesUrls = await UploadFilesServices.getAllFiles();
            setUrls(filesUrls);
        }
        fetchData();
    }, []);

    function handleDownload(url: string) {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        // Simula un clic en el enlace para iniciar la descarga
        link.click();
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="font-bold font-mono text-3xl">Shared Files</div>
            <div className="file-grid-container w-1/2 my-10 border-2 rounded-lg">
                <div className="grid-header py-2 px-1 text-xl bg-gray-50 border-b-2">
                    Files:
                </div>
                <div className="grid-content min-h-32 flex flex-col justify-center items-center">
                    {urls.length === 0 && (
                        <div className="w-6 h-6 animate-spin rounded-full border-4 border-x-slate-200 border-y-slate-300"></div>
                    )}
                    {urls.map((url) => {
                        return (
                            <div
                                key={url.publicUrl}
                                className="flex w-full items-center justify-between py-10 px-4 border-b-2"
                            >
                                <div>{url.name}</div>
                                <button
                                    className="py-2 px-4 bg-slate-200/90 rounded-xl shadow-xl active:bg-slate-300 active:translate-y-0.5"
                                    onClick={() => {
                                        handleDownload(url.publicUrl);
                                    }}
                                >
                                    Download
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
