import { useState, FunctionComponent } from "react";
import { useRouter } from "next/router";
import Modal from "./Modal";
import { deleteUserCreatedPoll } from "../services/polls";

interface Props {
    pollID: string;
}

const CreatorBar: FunctionComponent<Props> = ({ pollID }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const router = useRouter();

    const handleDelete = () => {

        deleteUserCreatedPoll(pollID)
            .then(() => {
                console.log("successful delete");
                router.push("/");
            }).catch(e => {
                console.log("delete error");
                console.log(e);
            });
    }

    const handleUpdate = (): void => {
        setModalVisible(true);
    }


    return (
        <div>
            <Modal visible={modalVisible} handleConfirm={handleDelete} handleClose={() => setModalVisible(false)} />
            <button type="button" onClick={handleDelete}>Delete</button>
            <button type="button" onClick={handleUpdate}>Update</button>
        </div>
    )
}

export default CreatorBar;