import { put } from '@vercel/blob';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Hanya menerima POST' });
    }

    try {
        const filename = req.query.filename || 'file';
        
        const blob = await put(filename, req, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN
        });
        
        return res.status(200).json({ url: blob.url });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
