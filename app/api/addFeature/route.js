
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import {adminSessionChecker} from '../sessionCheck/route'
import {Pool} from "pg";
let pool;
if (!pool) {
    pool = new Pool()
}

let dataValid = false





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
    // console.log(frontTaskData)

    const clientIdArray = frontTaskData.clientId.split(",")

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

    const queryLoop = async (array, client, imageFile, clientId, clientName) => {
        for (let i=0;i<array.length;i++) {
            for (let item of clientId) {
                console.log(item)
            }

            let sqlQuery = `
            INSERT into ${array[i]} (name, short_desc, long_desc, assigned, client, clientname)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
                `;

            console.log(sqlQuery);

            const values = [frontTaskData.name, frontTaskData.short_desc, frontTaskData.long_desc, frontTaskData.assigned, clientId[i], clientName[i]];

            try {
                const result = await pool.query(sqlQuery, values);
                // console.log(`Inserted into ${tableName}. ID: ${result.rows[0].id}`);

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
                        UPDATE ${array[i]}
                        SET image_path = $1
                        WHERE id = $2
                    `;

                    const updatedValues = [dbPath, insertedId];

                    await pool.query(updateImagePathQuery, updatedValues)
                }

            } catch (error) {
                console.error(`Error inserting into  ${error.message}`);
            }
        }
        return true
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
        116: "public.totalbet",
        126: "public.testclient"
    }
    const mappedArray = await clientArray.map(value => mapping[value])
    const mappedArrayTextAfterDot = await mappedArray.map(value => value.substring(value.indexOf('.') + 1));
    console.log(mappedArrayTextAfterDot)

    // for (const i of mappedArray) {
    //     console.log("Klienct "+i)
    // }




    const auth = await adminSessionChecker(checkData, res)
     if (auth === false) {
        return NextResponse.json({message: "unauthorized"}, {status: 401})
    } else if(dataValid === false) {
        return NextResponse.json({message: "You need to fill all required fields"}, {status: 400})

     } else if (auth) {

        
        result = await queryLoop(mappedArray, client, frontTaskData.image_file, clientIdArray, mappedArrayTextAfterDot)
        



        }

        // console.log(result)
        return NextResponse.json({message: "Success"}, {status:200})





};
