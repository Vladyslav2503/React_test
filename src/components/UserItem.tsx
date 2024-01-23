import { FC } from 'react';
import { IUser } from "../models/IUser";
import styled from 'styled-components';
import { Box } from '@mui/material';

const StyledUser = styled(Box)`
    padding: 20px;
    border: 1px solid orange;
    margin-top: 15px;
    width: 50%;
`

interface UserItemProps {
    user: IUser;
}

const UserItem: FC<UserItemProps> = ({ user }) => {



    return (
        <StyledUser >
            {user.id}. {user.name}  {user.lastName}, {user.email}
        </StyledUser>
    );
};

export default UserItem;