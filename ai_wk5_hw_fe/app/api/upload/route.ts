import {NextRequest, NextResponse} from "next/server";
import fs from 'fs';
import path from 'path';
import axios from "axios";

export async function POST(request: NextRequest){
    const data = await request.formData();

    try {
        const file = data.get("file");

        if (!file) {
            return NextResponse.json({ success: false, message: "No file uploaded." });
        }

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ success: false, message: "Invalid file upload" });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filepath = path.join(process.cwd(), 'public', 'uploads', file.name);
        fs.writeFileSync(filepath, buffer);

        try {
            const response = await axios.post('http://127.0.0.1:8000/classify-animal', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            return NextResponse.json({
                success: true,
                message: `File was uploaded successfully,`,
                classification_message: response.data
            });
        } catch (error) {
            return NextResponse.json({
                success: true,
                message: `File was uploaded successfully,`,
                classification_message:  error
            });
        }
    } catch (e) {
        return NextResponse.json({
            success: false,
            payload: {},
            message: `File upload failed ${e}`,
        });
    }
}
