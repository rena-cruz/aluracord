import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import myColors from './../src/helpers/colors.json';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import { createClient } from '@supabase/supabase-js';


const  supabaseClient  =  createClient ( process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY )

function listenMessageRealTime(addMessage) {
    return supabaseClient
        .from('message')
        .on('INSERT', (respostaLive) => {
            addMessage(respostaLive.new);
        })
        .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('message')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setMessageList(data);
            });
        const subscription = listenMessageRealTime((newMessage) => {
            setMessageList((valorAtualDaLista) => {
                return [
                    newMessage,
                    ...valorAtualDaLista,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    function handleNewMessage(newMessage) {
        const message = {
            de: usuarioLogado,
            texto: newMessage,
        };

        supabaseClient
            .from('message')
            .insert([message])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
            });
        setMessage('');
    }

    function handleDeleteMessage(event) {
        const messageId = Number(event.target.dataset.id)
        const messageListFiltered = messageList.filter((messageFiltered) => {
            return messageFiltered.id != messageId
        })
        setMessageList(messageListFiltered)

        supabaseClient
            .from('message')
            .delete()
            .match({ id: messageId })
            .then(({ data }) => {
                console.log('Apagando mensagem: ', data);
            });
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: myColors.theme.colors.primary[500],
                backgroundImage: `url(https://wallpapercave.com/wp/wp5723757.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: myColors.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: myColors.theme.colors.neutrals[900],
                    height: '80%',
                    maxWidth: '85%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '60%',
                        backgroundColor: myColors.theme.colors.neutrals[800],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={messageList} handleDelete={handleDeleteMessage} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(event) => {
                                setMessage(event.target.value)
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNewMessage(message);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: myColors.theme.colors.neutrals[300],
                                marginRight: '12px',
                                color: myColors.theme.colors.neutrals[200],
                            }}

                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handleNewMessage(':sticker: ' + sticker);
                            }}
                        />
                        <Button
                            onClick={() => handleNewMessage(message)}
                            label='▶'
                            styleSheet={{
                                borderRadius: '50%',
                                minWidth: '40px',
                                minHeight: '40px',
                                fontSize: '20px',
                                marginBottom: '8px',
                                lineHeight: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'

                            }}
                            buttonColors={{
                                contrastColor: myColors.theme.colors.neutrals["000"],
                                mainColor: myColors.theme.colors.primary[500],
                                mainColorLight: myColors.theme.colors.primary[400],
                                mainColorStrong: myColors.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: myColors.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((messageItem) => {

                return (
                    <Text
                        key={messageItem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: myColors.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${messageItem.de}.png`}
                            />
                            <Box
                                styleSheet={{
                                    display: 'inline-block'
                                }}
                            >
                                <Text tag="strong">
                                    {messageItem.de}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        //marginLeft: '8px',
                                        color: myColors.theme.colors.neutrals[200],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>
                            <Text
                                onClick={props.handleDelete}
                                styleSheet={{
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                    color: myColors.theme.colors.neutrals[200],
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                tag="span"
                                data-id={messageItem.id}
                            >
                                X
                            </Text>
                        </Box>
                        {messageItem.texto.startsWith(':sticker:')
                            ? (
                                <Image
                                    src={messageItem.texto.replace(':sticker:', '')}
                                    styleSheet={{ height: '150px' }} 
                                />
                            )
                            : (
                                messageItem.texto
                            )}
                    </Text>
                );
            })}
        </Box>
    )
}