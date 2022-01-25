//Skynex
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';

//Roteamento do Next
import { useRouter } from 'next/router';

//Import das cores padrão
import appConfig from './config.json';

function Titulo(props) {
    //Tag. Pega o que vem da Props, caso contrário, usa h1
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
        </>
    );
}

// Componente React
//function HomePage() {
// JSX
//    return (
//        <div>
//            <GlobalStyle />
//            <Titulo Tag="h2">Bem-vindo de volta!</Titulo>
//            <h2>Discord - Alura Matrix</h2>
//        </div>
//    )
//}

//export default HomePage

export default function PaginaInicial() {
    //Pega a imagem e o nickname do GitHub. É estado!
    const [username, setUsername] = React.useState('rena-cruz');

    //Roteamento
    const roteamento = useRouter(); 

    const imageError = 'https://cdn-icons.flaticon.com/png/512/4675/premium/4675250.png?token=exp=1643143907~hmac=d33376e971a68bd0b85abe5c7fae6906';

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    //backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://wallpapercave.com/wp/wp5723757.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[500],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();
                            console.log('Alguém submeteu o form');
                            roteamento.push('/chat');
                            //window.location.href = '/chat';
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Bem-vindo!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        {/*<input
                            type= "text"
                            value= {username}
                            onChange= {function (event){
                                console.log('usuario digitou', event.target.value);
                                //Onde ta o valor?
                                const valor = event.target.value;                               
                                //trocar o valor da variavel
                                //atraves do React e avise quem precisa
                                setUsername(valor);
                            }}
                        />*/}

                      
                        <TextField
                            value={username}
                            onChange={function (event){
                                console.log('usuario digitou', event.target.value);
                                //Onde ta o valor?
                                const valor = event.target.value;                               
                                //trocar o valor da variavel
                                //atraves do React e avise quem precisa
                                setUsername(valor);
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={
                                username.length > 2
                                    ? `https://github.com/${username}.png`
                                    : imageError
                            }
                        />

                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}