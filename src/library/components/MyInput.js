import { TextField } from '@skynexui/components';
import myColors from './../../helpers/colors.json';

export default function MyInput(props) {
    return (
        <TextField
            value={props.username}
            placeholder="Entre com o seu usuário do GitHub"
            onChange={function (event) {
                const valor = event.target.value;
                props.setUsername(valor);
            }}
            fullWidth
            textFieldColors={
                {
                    neutral: {
                        textColor: myColors.theme.colors.neutrals[200],
                        mainColor: myColors.theme.colors.neutrals[900],
                        mainColorHighlight: myColors.theme.colors.primary[500],
                        backgroundColor: myColors.theme.colors.neutrals[800],
                    },
                }
            }
        />
    );
}