import axios from "axios";

const api = new axios.create({
    baseURL: 'http://localhost:3030'
})

export default class Api {
    async listarMensagens(idSala) {
        let r = await api.get(`/chat/${idSala}`);
        return r.data
    }

    async enviarmensagem(nmSala, nmUser, msg) {
        let chat = {
            "sala" : {
                "nome" : nmSala
            },
            "usuario" :{
                "nome": nmUser
            },
            "mensagem" : msg
        }

        let r = await api.post('/chat', chat)
        
        return r.data
    }

    async criarUsuario(nomeUsu) {
        let user = {
            usuario: {
                nome: nomeUsu
            }
        }

        let r = await api.post('/user', user)
        return r.data
    }
}