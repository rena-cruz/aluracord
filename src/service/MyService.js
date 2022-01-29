import { createClient } from '@supabase/supabase-js';

function createClientDataBase() {
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
}

function listenMessageRealTime(dataBase, addMessage) {
    return dataBase
        .from('message')
        .on('INSERT', (respostaLive) => {
            addMessage(respostaLive.new);
        })
        .subscribe();
}

export const MyService = {
    listenMessageRealTime,
    createClientDataBase
};