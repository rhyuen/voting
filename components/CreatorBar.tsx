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
        <section className="form-group form-group--right">
            <Modal visible={modalVisible} handleConfirm={handleDelete} handleClose={() => setModalVisible(false)} />

            <button className="test" onClick={handleUpdate}>
                <img src="/images/delete.png" alt='blah' />
            </button>
            <style jsx>
                {`
                    .test{
                        border: none;
                        background: white;
                    }
                   img{
                        height: 2.5rem;
                        width: 2.5rem;
                        padding: .5rem;
                        background: white;
                        border-radius: 50%;   
                        transition: background .2s ease-in-out;              
                   }
                   img:after{
                       padding-bottom: 100%;
                       content: "";
                       display: block;
                       border-radius: 50%;
                   }
                   img:hover{
                        background: rgba(0,0,0,0.1);   
                   }
                `}
            </style>

        </section>
    )
}

export default CreatorBar;