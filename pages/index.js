import React from 'react';
import { useRouter } from 'next/router';
import {
    MyBackground, MyButton, MyCardLogin, MyCardPhoto,
    MyForm, MyImage, MyInput, MyText,
    MyTitle
} from './../src/library/RCruz';

export default function PaginaInicial() {
    const router = useRouter();
    const [username, setUsername] = React.useState('');

    return (
        <MyBackground>
            <MyCardLogin>
                <MyForm username={username} router={router}>
                    <MyTitle tag="h2">Bem-vindo (a)!</MyTitle>
                    <MyInput username={username} setUsername={setUsername} />
                    <MyButton />
                </MyForm>
                <MyCardPhoto>
                    <MyImage username={username} />
                    <MyText> {username} </MyText>
                </MyCardPhoto>
            </MyCardLogin>
        </MyBackground>
    );
}