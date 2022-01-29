import { Button } from '@skynexui/components';
import myColors from './../../helpers/colors.json';

export default function MyButton(props) {
    return (
        <Button
            type='submit'
            label='Entrar'
            fullWidth
            buttonColors={{
                contrastColor: myColors.theme.colors.neutrals["000"],
                mainColor: myColors.theme.colors.primary[500],
                mainColorLight: myColors.theme.colors.primary[400],
                mainColorStrong: myColors.theme.colors.primary[600],
            }}
        />
    );
}