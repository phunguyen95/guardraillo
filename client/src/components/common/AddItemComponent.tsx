import { Box, Typography } from "@material-ui/core"
import { memo } from "react"
import AddIcon from '@material-ui/icons/Add';
interface AddItemComponent {
    handleChange: () => void,
    buttonText: string,
}
const AddItemComponent = memo(({ handleChange, buttonText }:AddItemComponent) => {

    return <Box style={{ cursor: "pointer", padding: "10px", display: "flex", alignItems: "center", minWidth: "400px" }} onClick={handleChange}>
        <AddIcon fontSize={"large"} />
        <Typography variant={"h6"} style={{ fontWeight: "700" }}>{buttonText}</Typography>
    </Box>
})

export default AddItemComponent