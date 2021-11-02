import React, { useCallback } from 'react'
import ButtonContainer from '../common/ButtonContainer';

import { useDispatch } from "react-redux"
import { ApiAction } from '../../utils/apiActions';
import { toast } from 'react-toastify';
import {addRepos} from '../../store/dispatcher'
import RepoModel from '../Repo/RepoModel';
function CreateBoard() {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch()

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);



    const handleCreateRepo = useCallback(async ({ titleError, title, color }) => {
        if (titleError !== "") {
            return
        }

        const { statusCode, data } = await ApiAction.postRequest("/repo", { name: title, bgColor: color.color })

        if (statusCode === 400 || statusCode === 500) {
            toast.error(data)
        }
        const res = JSON.parse(data)
        console.log('res',res);

        toast(res.message)
        addRepos(dispatch, res.repo)

    }, [dispatch])

    return (
        <>
            <ButtonContainer customButtonStyle={styles.button} title={"Create"} onClick={handleOpen} />
            <RepoModel open={open} handleClose={handleClose} handleSubmit={handleCreateRepo} />
        </>
    )
}

export default CreateBoard


const styles = {

    button: {
        height: "36px",
        borderRadius: "12px",
        marginRight: "20px"
    },

};
