import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import { host, user, database, password, port } from '../../__credentials/credentials.json';
import fs from 'fs/promises';
import path from 'path';

const pool = new Pool({
    host: host,
    user: user,
    database: database,
    password: password,
    port: port
});



export async function POST(request) {
   
    const data = await request.formData();
    const name = data.get('name')
    const longDesc = data.get('long_desc')
    const imageFile = data.get('image')
    const shortDesc = data.get('short_desc')
    const customer = data.get('client')
    const team = data.get('assignee')

    const client = await pool.connect();

    const sqlQuery = `
        INSERT INTO public.features (name, long_desc, image_path, short_desc, client, assigned)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING id
    `;
    
    const values = [name, longDesc, null, shortDesc, customer, team];

    try {
        const result = await client.query(sqlQuery, values);
        const insertedId = result.rows[0].id;

        if (imageFile) {
            const imageExtension = path.extname(imageFile.name);
            console.log(imageExtension)
            const insertedImageFilename = `${insertedId}${imageExtension}`;
            const imagePath = path.join(process.cwd(), 'public',insertedImageFilename);
            const dbPath = `/${insertedId}${imageExtension}`
            await fs.mkdir(path.dirname(imagePath), { recursive: true });
            
            const imageBuffer = await imageFile.arrayBuffer();           
            await fs.writeFile(imagePath, Buffer.from(imageBuffer));
    
            const normalizedImagePath = path.normalize(imagePath).replace(/\\/g, '/');
            
            
            const updateImagePathQuery = `
                UPDATE public.features
                SET image_path = $1
                WHERE id = $2
            `;

            const updatedValues = [dbPath, insertedId];

            await client.query(updateImagePathQuery, updatedValues)

        }

        client.release();
        return NextResponse.json({ status: 'success' });

        
    } catch (error) {
        console.error('Error executing query:', error);
        client.release();
        return NextResponse.json({ status: 'error' });
    }

    
};
