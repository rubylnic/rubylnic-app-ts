import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import EditForm from 'src/features/Form/components/EditForm'

type Props = {
    modalInfo: {},//FIXME:
    isModalOpen: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    id: string | string[] | undefined,
}

function ModalEditInfo({ modalInfo, isModalOpen, setModalOpen, id }: Props) {
    return (
        <Dialog open={isModalOpen} onClose={() => { setModalOpen(false) }}>
            <DialogTitle>{`Edit ${modalInfo?.label?.toLowerCase()}`}</DialogTitle>
            <DialogContent>
                <EditForm id={id} formInfo={modalInfo} setModalOpen={setModalOpen} />
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={() => { setModalOpen(false) }}>Edit</Button> */}
                <Button onClick={() => { setModalOpen(false) }}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalEditInfo