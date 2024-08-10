import { Box, Switch, Typography } from "@mui/material";
import { useState } from "react";

export default function SwitchComponent({keyName,displayName,permissionName,state,setState, disabled, initialValue}){
    const [checked, setChecked] = useState(initialValue);

    const handleChange = (event) => {
      let temp = state?.[keyName]
      console.log(temp)
      temp[displayName]=event.target.checked
      setState((prev)=>({...prev,[keyName]:temp}))
        setChecked(event.target.checked);

        // setState((prev) => ({ ...prev, [keyName]:{...prev.keyName,[displayName]: event.target.checked }}));
      };
    return <Box display={"flex"} width={"90%"} alignItems={"center"} justifyContent={"space-between"}>
    <Typography>{displayName}</Typography>
    <Switch
    name={displayName}
checked={checked}
onChange={handleChange}
inputProps={{ 'aria-label': 'controlled' }}
/>
</Box>
}