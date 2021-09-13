import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())

    app.get('/chat/:nmsala', async (req, resp) => {
        try{
            
            let sala = await db.tb_sala.findOne({where: {nm_sala: req.params.nmsala}})
            let mensagens = await
            db.tb_chat.findAll({
                where: {
                    id_sala: sala.id_sala
                },
                include: ['tb_usuario', 'tb_sala'],
            });

            resp.send(mensagens);
        } catch (e) {
            resp.send(e.toString())
        }
    })

    app.post('/chat', async (req, resp) => {
        
        try {
            let chat = req.body;

            let sala = await db.tb_sala.findOne({ where: { nm_sala: chat.sala.nome } });
            let user = await db.tb_usuario.findOne({ where: { nm_usuario: chat.usuario.nome } })
        
            let chatPost = {
                id_sala: sala.id_sala,
                id_usuario: user.id_usuario,
                ds_mensagem: chat.mensagem,
                dt_mensagem: new Date()
            }

            if(chat.mensagem == '' || !chat.mensagem)
                return resp.send({erro: "O campo está vazio"})

            else{
                let r = await db.tb_chat.create(chatPost);
                resp.send(r)
                }
        } catch (e) {
            resp.send(e.toString())
        }
    })

    app.post('/user', async (req, resp) => {
        let nick = req.body;

        let cadUser = {
            nm_usuario: nick.usuario.nome
        }

        let r = await db.tb_usuario.create(cadUser)

       resp.send(r)
    })

    app.get('/user', async(req, resp) => {
        let r = await db.tb_usuario.findAll()
        resp.send(r)

    })

    app.post('/sala', async(req, resp) => {
        
        try{

            let sala = req.body;
            let salaInser = {
                nm_sala: sala.nome
            }

            let r = await db.tb_sala.create(salaInser)
            resp.send(r)
        } catch (e){
            resp.send(e.toString())
        }
    })

    app.put('/user', async (req, resp) => {
        let id = req.query.id;
        let nome = req.body.nome
        let r = await db.tb_usuario.update({nm_usuario: nome}, {where: {id_usuario: id}})
        resp.send(r)
        resp.statusMessage(200)
    })
    
    app.listen(process.env.PORT,
        x => console.log(`Server up at port ${process.env.PORT}`))