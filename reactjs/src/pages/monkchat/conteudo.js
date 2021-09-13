
import { ContainerConteudo } from './conteudo.styled'
import { ChatButton, ChatInput, ChatTextArea } from '../../components/outros/inputs'
import Api from '../../services/api';
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

const api = new Api()
export default function Conteudo() {

    const [chat, setChat] = useState([]);
    const [sala, setSala] = useState('')
    const [usuario, setUsuario] = useState('')
    const [mensagem, setMensagem] = useState('')

    const ref = useRef(null)

    const atualizar = async () => {
        ref.current.continuousStart()
        const mensagens = await api.listarMensagens(sala);
        setChat(mensagens)
        ref.current.complete()
    }

    const enviar = async () => {
        const r = await api.enviarmensagem(sala, usuario, mensagem)
        console.log(r)
        if(!sala || sala === '')
        toast.error("Sala inválida")

        if(!usuario || usuario === '')
            toast.error("Insira um usuário")

        if(!mensagem || mensagem === '' )
        toast.error('Campo vazio')

        else {
            toast.success('Mensagem enviada com sucesso')
        }

        atualizar();
    }

    const criarUsuário = async() => {
        const r = await api.criarUsuario(usuario)
        console.log(r)
    }

    return (
        <ContainerConteudo>
            <ToastContainer/>
            <LoadingBar color="red"ref={ref}/> 
            <div className="container-form">
                <div className="box-sala">
                    <div>
                        <div className="label">Sala</div>
                        <ChatInput value={sala} onChange={e => setSala(e.target.value)}/>
                    </div>
                    <div>
                        <div className="label">Nick</div>
                        <ChatInput onClick={criarUsuário} value={usuario} onChange={e => setUsuario(e.target.value)}/>
                    </div>
                    <div>
                        <ChatButton> Criar </ChatButton>
                        <ChatButton> Entrar </ChatButton>
                    </div>
                </div>
                <div className="box-mensagem">
                    <div className="label">Mensagem</div>
                    <ChatTextArea value={mensagem} onChange={e => setMensagem(e.target.value)}/>
                    <ChatButton id="ev" onClick={enviar} className="btn-enviar"> Enviar </ChatButton>
                </div>
            </div>
            
            <div className="container-chat">
                <img onClick={atualizar} className="chat-atualizar" src="/assets/images/atualizar.png" alt="" />
                <div className="chat">

                    {chat.map(x =>
                        <div className="chat-message">
                           <div>({new Date(x.dt_mensagem).toLocaleTimeString()})</div>
                            <div><b>{x.tb_usuario.nm_usuario}</b> fala para <b>Todos</b>:</div>
                            <div>{x.ds_mensagem}</div>
                        </div>
                    )}
                </div>
            </div>
        </ContainerConteudo>
    )
}