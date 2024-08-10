import { DeleteForever, Edit } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Button, CardActions, IconButton, Modal, TextField, Typography } from "@mui/material";
import * as React from "react";
import { Context } from "../../../Context";
import { LocalDate, LocalTime } from "../../Features/DateAndTime";
import styles from "./NewCardDesign.module.css";


export default function NewCardDesign({ data }) {

    let { notesData, setNotesData, axios, ActivateToast, theme, apiLink } =
        React.useContext(Context);
    const [open, setOpen] = React.useState(false);

    const handleDeleteCard = () => {
        console.log(data._id);
        axios
            .delete(`${apiLink}notes/${data._id}`)
            .then(() => {
                setNotesData(notesData.filter((note) => note._id !== data._id));
                ActivateToast("Toast Successfully Deleted", "success");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={styles.book}>
            <Box style={{overflowY:"scroll", marginTop: '16px', marginLeft: '30px', textAlign: 'left', paddingLeft: '10px',width:"100%"}}>
                {data.content}
            </Box>
            <Box style={{ position: 'absolute', bottom: 0, right: 0, background:"rgba(200, 235, 145,0.5)" }}>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={async () => {
                            // setFavorite(!favorite)
                            await axios.patch(`${apiLink}notes/${data._id}`, {
                                favorite: !data.favorite,
                            });
                            // data.favorite=!favorite
                            let temp = [...notesData];
                            for (let i = 0; i < temp.length; i++) {
                                if (temp[i]._id == data._id) {
                                    temp[i].favorite = !temp[i].favorite;
                                    // temp[i]=data
                                }
                            }
                            let newArr = [
                                ...temp.sort((a, b) => {
                                    console.log(a, b);
                                    return Number(b.favorite) - Number(a.favorite);
                                }),
                            ];
                            setNotesData(newArr);
                        }}
                    >
                        <FavoriteIcon
                            sx={{ color: data.favorite ? "red" : "rgb(112, 112, 112)" }}
                        />
                    </IconButton>
                    <IconButton aria-label="share" onClick={handleDeleteCard}>
                        <DeleteForever />
                    </IconButton>
                    <IconButton
                        aria-label="edit"
                        onClick={() => {
                            console.log(data)
                            setOpen(true);
                        }}
                    >
                        <Edit />
                    </IconButton>
                    <EditModal open={open} data={data} setOpen={setOpen} />
                </CardActions>
            </Box>
            <div className={styles.cover}>
                <div className={styles.coverContent} style={{ textAlign: 'center', margin: "0 20px",flex:1 }} >
                <Typography fontWeight={700}>{data.topic}</Typography>
                    <br /> <br />
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography
                        variant="body2"
                        fontSize={"12px"}
                        fontWeight={"700"}
                        color="text.secondary"
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        {data.date}
                    </Typography>
                    <Typography
                        variant="body2"
                        fontSize={"12px"}
                        fontWeight={"700"}
                        color="text.secondary"
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        {data.time}
                    </Typography>
                    </Box>
                </div>
            </div>
        </div>
    );
}

function EditModal({ open, setOpen, data }) {
    let { axios, apiLink, notesData, ActivateToast, setNotesData } = React.useContext(Context);
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };
    let id = data._id
    const handleClose = () => setOpen(false);
    async function edit(e) {
        e.preventDefault();
        let data = new FormData(e.currentTarget);
        let obj = {
            topic: data.get("Heading"),
            content: data.get("Content"),
            date: LocalDate(),
            time: LocalTime(),
        };
        console.log(obj);
        axios
            .patch(`${apiLink}notes/${id}`, {
                topic: data.get("Heading"),
                content: data.get("Content"),
                date: LocalDate(),
                time: LocalTime(),
            })
            .then((res) => {
                ActivateToast("Note Edited Successfully", "success")
                setNotesData(prev => {
                    return prev.map((el) => {
                        if (el._id == id) {
                            console.log("found")
                            return {
                                ...data,
                                ...obj
                            }
                        } else {
                            console.log("not found")
                            return el
                        }
                    })
                })
                console.log(notesData)
                console.log(res)
            }
            )
            .catch((err) => {
                console.log(err);
            });
        setOpen(false);
    }

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component={"form"} onSubmit={edit}>
                    <TextField
                        fullWidth
                        name="Heading"
                        label={"Heading"}
                        defaultValue={data.topic}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        multiline
                        rows={5}
                        name="Content"
                        label={"Content"}
                        defaultValue={data.content}
                    />
                    <br />
                    <Button variant="outlined" type="submit">
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}