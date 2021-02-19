import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './SendMessage.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '70%',
        },
    },
}));

export default function SendForm(props) {

    const { chatId, user, onSubmit } = props;
    const classes = useStyles();
    const [message, setMessage] = React.useState('');

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'author-field':
                setAuthor(event.target.value);
                break;
            case 'message-field':
                setMessage(event.target.value);
                break;
        }
    };

    const handleSubmit = (event) => {
        setMessage('');
        onSubmit({ author: 'me', message }, chatId);
    };


    return (
        <div className="sendform-wrapper">
            <form className={classes.root} noValidate autoComplete="off">
                <div className="form-item">
                    <TextField
                        id="message-field"
                        label="Message"
                        value={message}
                        multiline
                        onChange={handleChange}
                    />
                    <Button onClick={handleSubmit}>Отправить</Button>
                </div>
            </form>
        </div>
    );
}
