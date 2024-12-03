"use client";
import { FileInputButton, FileCard, ExtFile } from "@files-ui/react";
import {useState} from "react";


interface ClassifierResponse {
    animal: string;
    confidence: number;
}

export default function Home() {
    const [files, setFiles] = useState<ExtFile[]>([]);
    const [classifying, setClassifying] = useState<ClassifierResponse|undefined>(undefined);
    const updateFiles = (incomingFiles:ExtFile[]) => {
        setFiles(incomingFiles);
    };
    const removeFile = (id: number | string | undefined) => {
        setFiles(files.filter((x) => x.id !== id));
    };
    const handleFinishUpload=(uploadedFiles:ExtFile[])=>{
        console.log("Upload has finished", uploadedFiles);
        const uploadedFile = uploadedFiles[0];
        const response = uploadedFile.serverResponse?.payload.classification_message;
        setClassifying(response);
    }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <h1 className="text-4xl font-bold text-center sm:text-left">Animal Classifier</h1>
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-2">
                    Upload image .
                </li>
                <li>App verifies whether the animal is dangerous or not.</li>
            </ol>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    gap: "10px",
                    flexWrap: "wrap",
                    width: "100%",
                }}
            >
                <FileInputButton
                    onChange={updateFiles}
                    value={files}
                    accept={"image/*"}
                    maxFileSize={28 * 1024 * 1024}
                    maxFiles={2}
                    actionButtons={{
                        position: "after",
                        uploadButton: {},
                        abortButton: {},
                    }}
                    uploadConfig={{
                        url: "/api/upload",
                        method: "POST",
                        headers: {
                            Authorization:
                                "bearer HTIBI/IBYG/&GU&/GV%&G/&IC%&V/Ibi76bfh8g67gg68g67i6g7G&58768&/(&/(FR&G/&H%&/",
                        },
                        cleanOnUpload: true,
                    }}
                    onUploadFinish={handleFinishUpload}
                    behaviour="replace"
                />
                {files.length > 0 && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: "5px",
                            minWidth: "50%"
                        }}
                    >
                        {files.map((file: ExtFile) => (
                            <FileCard key={file.id} {...file} onDelete={removeFile} info preview/>
                        ))}
                    </div>
                )}
                {
                    classifying && <div className="text-center">{classifying.animal}</div>
                }
            </div>
        </main>
    </div>
  );
}
