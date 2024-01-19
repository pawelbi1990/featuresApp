import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import {adminSessionChecker} from '../sessionCheck/route'
import {pool} from '../route'

let dataValid = false

// const pool = new Pool({
//     host: process.env.DATABASE_HOST_NAME,
//     user: process.env.DATABASE_USER_NAME,
//     database: process.env.DATABASE_NAME,
//     password: process.env.DATABASE_PASSWORD,
//     port: process.env.DATABASE_PORT

// })



export async function POST(request, res) {
    const data = await request.formData();
    const clientList = []
    const frontTaskData = {
        clientId: await data.get("clientId"),

    }
    const checkData = {
        session: await data.get("session"),
        user: parseInt(await data.get("userId")),
        admin: parseInt(await data.get("admin"))

    }

    const dataCheck = async (clientId) => {
        if (clientId === null || clientId === undefined || clientId === '') {
            return false;
        } else {
            return true;
        }
    }

    const queryLoop = async (array, client) => {
        for (const tableName of array) {
            let sqlQuery = `
                INSERT INTO ${tableName} (name)
                VALUES ($1)
                returning ID
                `;
            console.log(sqlQuery);
            
            const values = [tableName];
    
            try {
                const result = await client.query(sqlQuery, values);
                console.log(`Inserted into ${tableName}. ID: ${result.rows[0].id}`);
                
            } catch (error) {
                console.error(`Error inserting into ${tableName}: ${error.message}`);
            }
        }
    };
    

    

    dataValid = await dataCheck(frontTaskData.clientId)
    
    let clientArray = await frontTaskData.clientId.split(',').map(Number);
    const mapping = {
        123: "public.betfan",
        121: "public.croco",
        106: "public.eb",
        143: "public.etoto",
        119: "public.forbet",
        133: "public.fuksiarz",
        98: "public.merrybet",
        112: "public.premierbetzone",
        165: "public.premierlotto",
        116: "public.totalbet"
    }
    const mappedArray = await clientArray.map(value => mapping[value])
    
    
   
    
    const auth = await adminSessionChecker(checkData, res)
     if (auth === false) {
        return NextResponse.json({message: "unauthorized"}, {status: 401})
    } else if(dataValid === false) {
        return NextResponse.json({message: "You need to fill all required fields"}, {status: 400})
        
     } else if (auth && dataValid) {
        const client = await pool.connect()
    const result = await queryLoop(mappedArray, client)
    client.release()
    console.log(result)
        return NextResponse.json({message: "Success"}, {status:200})
     }

    else if (auth) {
       
     
     
    // const client = await pool.connect();
    

    
     
    // const sqlQuery = `
    //     INSERT INTO public.features (name, long_desc, image_path, short_desc, client, assigned)
    //     VALUES ($1,$2,$3,$4,$5,$6)
    //     RETURNING id
    // `;
    
    

//     try {
//         const result = await client.query(sqlQuery, values);
//         const insertedId = result.rows[0].id;

//         if (imageFile) {
//             const imageExtension = path.extname(imageFile.name);
            
//             const insertedImageFilename = `${insertedId}${imageExtension}`;
//             const imagePath = path.join(process.cwd(), 'public',insertedImageFilename);
//             const dbPath = `/${insertedId}${imageExtension}`
//             await fs.mkdir(path.dirname(imagePath), { recursive: true });
            
//             const imageBuffer = await imageFile.arrayBuffer();           
//             await fs.writeFile(imagePath, Buffer.from(imageBuffer));
    
//             const normalizedImagePath = path.normalize(imagePath).replace(/\\/g, '/');
            
            
//             const updateImagePathQuery = `
//                 UPDATE public.features
//                 SET image_path = $1
//                 WHERE id = $2
//             `;

//             const updatedValues = [dbPath, insertedId];

//             await client.query(updateImagePathQuery, updatedValues)

//         }

//         client.release();
//         return NextResponse.json({ status: 'success' });

        
//     } catch (error) {
//         console.error('Error executing query:', error);
//         client.release();
//         return NextResponse.json({ status: 'error' });
    
// }
    } 

    
};
