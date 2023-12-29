import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import {adminSessionChecker} from '../sessionCheck/route'

let dataValid = false

const pool = new Pool({
    host: process.env.DATABASE_HOST_NAME,
    user: process.env.DATABASE_USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT

})



export async function POST(request, res) {
    
   
    const data = await request.formData();
    
    
    
    const name = await data.get('name')
    const longDesc = await data.get('long_desc')
    const imageFile = await data.get('image')
    const shortDesc = await data.get('short_desc')
    const customer = await data.get('client')
    const team = await data.get('assignee')
    const checkData = {
        session: await data.get("session"),
        user: parseInt(await data.get("userId")),
        admin: parseInt(await data.get("admin"))

    }
    
    const dataCheck = async (name, longDesc, shortDesc, customer, team) => {
        if (name === null || name === undefined || name === '' ||
            longDesc === null || longDesc === undefined || longDesc === '' ||
            shortDesc === null || shortDesc === undefined || shortDesc === '' ||
            customer === null || customer === undefined || customer === '' ||
            team === null || team === undefined || team === '') {
            return false;
        } else {
            return true;
        }
    }

    

    const dataValid = await dataCheck(name, longDesc, shortDesc, customer, team)
    console.log("datavalid "+dataValid)
    

    
    const auth = await adminSessionChecker(checkData, res)
     if (auth === false) {
        return NextResponse.json({message: "unauthorized"}, {status: 401})
    } else if(dataValid === false) {
        return NextResponse.json({message: "You need to fill all required fields"}, {status: 400})
        
     }

    else if (auth && dataValid) {
       
     
     
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
    } 

    
};
