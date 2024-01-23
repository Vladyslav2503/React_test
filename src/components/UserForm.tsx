import { FormEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Alert from '@mui/material/Alert';
import { userAPI } from '../services/UserServices';
import UserItem from './UserItem';
import { IUser } from '../models/IUser';
import { Box } from '@mui/material';

const StyledUserForm = styled(Box)`
  max-width: 400px;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledUserList = styled (Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 25px;
  }
`;

const StyledSubmitButton = styled(Button)`
  && {
    width: 100%;
    margin-top: 15px;
  }
`;

const UserForm = () => {
    const [userName, setUserName] = useState("");
    const [lastUserName, setLastUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { data: users, error, isLoading, refetch } = userAPI.useFetchAllUsersQuery(0);
    const [createUser, {}] = userAPI.useCreateUserMutation();

    const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const name = userName;
            const lastName = lastUserName;
            const email = userEmail;
            const id = Date.now();
            console.log('Дані для відправки на сервер:', { name, lastName, email, id });
            await createUser({ name, lastName, email, id } as IUser);
            await refetch();
            setSuccessMessage('Користувач успішно доданий!');
            setUserName("");
            setLastUserName("");
            setUserEmail("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <StyledUserForm>
                <StyledForm onSubmit={handleCreate}>
                    <StyledTextField
                        label={`Ім'я`}
                        variant="outlined"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <StyledTextField
                        label="Прізвище"
                        variant="outlined"
                        required
                        value={lastUserName}
                        onChange={(e) => setLastUserName(e.target.value)}
                    />
                    <StyledTextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />

                    <StyledSubmitButton type="submit" variant="contained" color="primary">
                        Submit
                    </StyledSubmitButton>
                </StyledForm>
            </StyledUserForm>

            {isLoading && <h1>Триває загрузка...</h1>}
            {error && <h1>Виникла помилка при загрузці</h1>}
            
            {successMessage && (
                <Alert severity="success" onClose={() => setSuccessMessage('')}>
                    {successMessage}
                </Alert>
            )}

            <StyledUserList>
                {users && users.map(user =>
                    <UserItem key={user.id} user={user} />
                )}
            </StyledUserList>
        </>
    );
};

export default UserForm;
