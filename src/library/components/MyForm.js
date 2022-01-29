import { Box } from "@skynexui/components";

export default function MyForm(props) {
    return (
        <Box
            as="form"
            onSubmit={function (event) {
                event.preventDefault();
                if (props.username.trim() != '') {
                    props.router.push(`/chat?username=${props.username}`);
                }
            }}
            styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px'
            }}
        >
            {props.children}
        </Box>
    );
}