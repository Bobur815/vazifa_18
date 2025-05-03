import { json } from "express";
import db from "../config/db.js";
import path from "path"
import { error } from "console";

const GET = async (req,res) => {
    try {
        let {page} = req.query;

        let sql_query = `select * from students`;

        // pagination berilganda limit va offset qo'shish:
        if(page){
            let start = (page-1) * 10;
            sql_query += ` limit 10 offset ${start}`;
        }

        let students = await db.query(sql_query);
        res.status(200).json({
            status:200,
           succes: true,
           data: students[0] 
        })
    } catch (error) {
        res.status(400).json({
            status:400,
            succes:false,
            message:error.message
        })
    }
}

const GET_SINGLE = async (req,res) => {
    try {
        let {student_id} = req.params;

        if (!student_id || isNaN(student_id)) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid student ID",
            });
        }

        let [student] = await db.query("call get_student_by_id(?)",[student_id]);
        res.status(200).json({
            status:200,
            succes:true,
            data: student[0]
        })

    } catch (error) {
        res.status(400).json({
            status:400,
            succes:false,
            message:error.message
        })
    }
}

const GET_SEARCH = async (req,res) => {
    try {
        let {id,name,age,email} = req.query;

        let set_queries = [];
        let set_values = [];
        

        if(id){
            set_queries.push("id=?");
            set_values.push(id);
        }
        if(name){
            set_queries.push("name like ?");
            set_values.push(`%${name}%`);
        }
        if(age){
            set_queries.push("age = ?");
            set_values.push(age);
        }
        if(email){
            set_queries.push("email like ?");
            set_values.push(`%${email}%`);
        }

        if(set_queries.length ===0){
            return res.status(400).json({
                status:400,
                success:false,
                message:"Enter at least one search query"
            });
        }

        let sql_query = ` select * from students where ${set_queries.join(" and ")}`;

        let students = await db.query(sql_query,set_values);

        res.status(200).json({
            status: 200,
            success: true,
            data: students[0]
        });

    } catch (error) {
        res.status(400).json({
            status:400,
            succes:false,
            message:error.message
        })
    }
}

const POST = async (req,res) => {
    try {
        let {name,age,email} = req.body;
        await db.query('insert into students (name,age,email) values (?,?,?)',[name,age,email]);
        res.status(201).json({
            status:201,
            success:true
        });

    } catch (error) {
        res.status(400).json({
            status:400,
            succes:false,
            message:error.message
        })
    }
}

const DELETE = async (req,res) => {
    try {
        let {student_id} = req.params;
        await db.query('call delete_student_by_id(?)',[student_id]);
        res.status(200).json({
            status:200,
            success:true,
            message: "Student successfully deleted"
        });

    } catch (error) {
        res.status(400).json({
            status:400,
            succes:false,
            message:error.message
        })
    }
}

const PUT = async (req,res) => {
    try {
        let {id,name,age,email} = req.body;
        await db.query('call update_student_by_id(?,?,?,?)',[id,name,age,email]);
        res.status(200).json({
            status:200,
            success:true,
            message: "Student successfully updated"
        });

    } catch (error) {
        res.status(400).json({
            status:400,
            succes:false,
            message:error.message
        });
    }
}

const PROFILE_IMG = async (req,res) => {
    try {
        let {img} = req.files;
        let fileName = new Date().getTime() + "." + img.name;
        
        img.mv(path.join(process.cwd(), 'src', 'uploads', fileName), (error) => {
            if (error) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: error.message
                });
            }

            return res.status(201).json({
                status: 201,
                success: true,
                message: "Image uploaded successfully"
            });
        });
    } catch (error) {
        res.status(400).json({
            status:400,
            succes:false,
            message:error.message
        });
    }
}


export default {
    GET,
    GET_SEARCH,
    GET_SINGLE,
    POST,
    DELETE,
    PUT,
    PROFILE_IMG
}