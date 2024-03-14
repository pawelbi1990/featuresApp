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
    let result;
    let insertedId;
    const data = await request.formData();
    const clientList = []
    const frontTaskData = {
        clientId: await data.get("clientId"),
        long_desc: await data.get("long_desc"),
        short_desc: await data.get("short_desc"),
        name: await data.get("name"),
        image_file: await data.get('image'),
        assigned: await data.get("assigned"),
        template_id: await data.get("template_id")
        


    }

    const backendTaskData = {

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

    const queryLoop = async (array, client, imageFile) => {
        for (const tableName of array) {
            
            let sqlQuery = `
            INSERT into ${tableName} (name, short_desc, long_desc, assigned)
            VALUES ($1, $2, $3, $4)
            RETURNING id
                `;
           
            console.log(sqlQuery);
            
            const values = [frontTaskData.name, frontTaskData.short_desc, frontTaskData.long_desc, frontTaskData.assigned];
    
            try {
                const result = await client.query(sqlQuery, values);
                console.log(`Inserted into ${tableName}. ID: ${result.rows[0].id}`);
                
                if (imageFile) {
                    insertedId = await result.rows[0].id;
                    const imageExtension = path.extname(imageFile.name);
                    
                    const insertedImageFilename = `${insertedId}${imageExtension}`;
                    const imagePath = path.join(process.cwd(), 'public',insertedImageFilename);
                    const dbPath = `/${insertedId}${imageExtension}`
                    await fs.mkdir(path.dirname(imagePath), { recursive: true });
                    
                    const imageBuffer = await imageFile.arrayBuffer();           
                    await fs.writeFile(imagePath, Buffer.from(imageBuffer));
            
                    const normalizedImagePath = path.normalize(imagePath).replace(/\\/g, '/');
                    
                    
                    
                    const updateImagePathQuery = `
                        UPDATE ${tableName}
                        SET image_path = $1
                        WHERE id = $2
                    `;
        
                    const updatedValues = [dbPath, insertedId];
        
                    await client.query(updateImagePathQuery, updatedValues)
                }
                
            } catch (error) {
                console.error(`Error inserting into ${tableName}: ${error.message}`);
            } finally {
                return true
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
        
     } else if (auth) {
        
        const client = await pool.connect()
        result = await queryLoop(mappedArray, client, frontTaskData.image_file)
        if (result === true) {
            await client.release()
        }
        
       

        }
        
        console.log(result)
        return NextResponse.json({message: "Success"}, {status:200})
     

    

    
};
