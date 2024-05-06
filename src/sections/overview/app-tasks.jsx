import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import Iconify from 'src/components/iconify';

function AppTasks({ title, list }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);

    const handleClickMenu = (event, task) => {
        setAnchorEl(event.currentTarget);
        setCurrentTask(task);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setCurrentTask(null);
    };

    const handleEdit = () => {
        // Tambahkan fungsi edit di sini
        console.log(`Edit task: ${currentTask.id}`);
        handleCloseMenu();
    };

    const handleDelete = () => {
        // Tambahkan fungsi delete di sini
        console.log(`Delete task: ${currentTask.id}`);
        handleCloseMenu();
    };

    return (
        <Card>
            <CardHeader title={title} />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Priority Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.number}</TableCell>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={(event) => handleClickMenu(event, task)}>
                                        <Iconify icon="eva:more-vertical-fill" />
                                    </IconButton>

                                    <Popover
                                        open={Boolean(anchorEl)}
                                        anchorEl={anchorEl}
                                        onClose={handleCloseMenu}
                                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    >
                                        <MenuItem onClick={handleEdit}>
                                            <Iconify icon="solar:pen-bold" sx={{ mr: 2 }} />
                                            Edit
                                        </MenuItem>
                                        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                                            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
                                            Delete
                                        </MenuItem>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}

AppTasks.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
};

export default AppTasks;
