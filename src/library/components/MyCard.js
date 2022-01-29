import { Box } from "@skynexui/components";
import myColors from './../../helpers/colors.json';

export function MyCardLogin(props) {
    return (
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
                backgroundColor: myColors.theme.colors.neutrals[500],
            }}
        >
            {props.children}
        </Box>
    );
}

export function MyCardPhoto(props) {
    return (
        <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: myColors.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: myColors.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
            }}
        >
            {props.children}
        </Box>
    );
}