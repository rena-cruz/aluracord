import { Image } from '@skynexui/components';

export default function MyImage(props) {
    const imageError = 'https://images.vexels.com/media/users/3/147102/isolated/lists/082213cb0f9eabb7e6715f59ef7d322a-icone-de-perfil-do-instagram.png'
    return (
        <Image
            styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                height: 'auto'
            }}
            src={
                props.username.length > 2
                    ? `https://github.com/${props.username}.png`
                    : imageError
            }
        />
    );
}