import { Text } from '@skynexui/components';
import myColors from './../../helpers/colors.json';

export function MyTitle(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
              ${Tag} {
                  color: ${myColors.theme.colors.neutrals['000']};
                  font-size: 24px;
                  font-weight: 600;
                  margin-bottom: 32px;
              }
              `}</style>
        </>
    );
}

export function MyText(props) {
    return (
        <Text
            variant="body4"
            styleSheet={{
                color: myColors.theme.colors.neutrals[200],
                backgroundColor: myColors.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
            }}
        >
            {props.children}
        </Text>
    );
}