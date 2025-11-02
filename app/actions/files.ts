
'use server';

import { createClient } from "@/lib/server";


/**
 * Upload a browser File to Supabase Storage.
 * - file: File from the client (e.g. <input type="file">)
 * - bucket: storage bucket name (required)
 * - folder: optional folder inside the bucket
 * - makePublic: if true returns a public URL; otherwise returns a signed URL valid for expiresIn seconds
 */
export async function uploadFileToSupabase(
    file: File,
    {
        bucket = 'reciepts',
        folder = '',
        makePublic = false,
        expiresIn = 60 * 60, // 1 hour signed url
    }: {
        bucket?: string;
        folder?: string;
        makePublic?: boolean;
        expiresIn?: number;
    }
) {
    if (!bucket) throw new Error('bucket is required');
    const supabase = await createClient();

    // generate filename
    const originalExt = file.name.split('.').pop() || '';
    const filename = `${crypto.randomUUID()}.${originalExt}`;
    const path = folder ? `${folder.replace(/\/+$/, '')}/${filename}` : filename;

    // convert File -> Buffer (works in Node/Next server actions)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, buffer, {
            contentType: file.type || undefined,
            cacheControl: '3600',
            upsert: false,
        });

    if (uploadError) throw uploadError;

    if (makePublic) {
        const { data } = supabase.storage.from(bucket).getPublicUrl(uploadData.path);
        return { path: uploadData.path, publicUrl: data.publicUrl };
    } else {
        const { data: signedData, error: signedError } = await supabase.storage
            .from(bucket)
            .createSignedUrl(uploadData.path, expiresIn);
        if (signedError) throw signedError;
        return signedData.signedUrl
    }
}

/**
 * Delete a file by path from a bucket
 */
export async function deleteFileFromSupabase(bucket: string, path: string) {
    const supabase = await createClient();
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw error;
    return { deleted: true };
}