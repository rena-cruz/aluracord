import { Box } from "@skynexui/components";

export default function MyBackground(props) {
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: 'url(https://wallpapercave.com/wp/wp5723757.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            }}
        >
            {props.children}            
        </Box>
    );
}