import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors('http://localhost:5173'))

const users = [];

app.post('/usuarios', async (req, res) =>{

    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body);
})

app.get('/usuarios', async (req, res) => {

    let users = [];

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                id: req.params.id,
                name: req.query.name,
                age: req.query.age,
                email: req.query.email
            }
        })

    }else{
        users = await prisma.user.findMany();
    }

    res.status(200).json(users);
})

app.put('/usuarios/:id', async (req, res) =>{

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body);
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: 'Usuário deletado com sucesso!'})
})

app.listen(3000);

/*
    O objetivo é criar nossa APIde usuários :D

    -Criar um usuário
    -Listar todos os usuários
    -Editar um usuário
    -Deletar um usuário
*/


/*app.post('/usuarios')
app.put('/usuarios')
app.delete('/usuarios')*/

/*
    1) Tipo de Rota / Método HTTP
    2) Endereço (www.example/users/)
*/