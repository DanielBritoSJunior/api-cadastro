import express from 'express'; // res = response, req = request
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import cors from 'cors';


const prisma = new PrismaClient();

const app = express();
app.use(express.json())
app.use(cors())

// CRUD - CREATE, READ, UPDATE, DELETE

app.post('/usuarios', async (req, res) => { // rota para criar usuarios
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
                }
    })
    
    res.status(201).json(req.body) // status 201 = criado
})

app.get('/usuarios', async (req, res) => { // rota para listar usuarios
    
    const users = await prisma.user.findMany()

    res.status(200).json(users) // status 200 = ok
})

app.put('/usuarios/:id', async (req, res) => { // rota para modificar usuarios
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
                }
    })
    
    res.status(201).json(req.body) // status 201 = criado
})

app.delete('/usuarios/:id', async (req, res) => { // rota para deletar usuarios
    
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    
    res.status(204).json(req.body) // status 201 = criado
})






app.listen(3000)

// USUARIO E SENHA - BANCO DE DADOS MONGODB
// USUARIO = daniel / SENHA = y2Au6XVlMR0T6M5L