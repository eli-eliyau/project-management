import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import heLocale from "date-fns/locale/he";

interface Props {
  label: string;
  onDate: Function;
  name: string;
}

const InputDate = ({ label, onDate, name }: Props) => {
  const [value, setValue] = useState<Date | null>(null);
  onDate(`${name}`, value);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={heLocale}>
      <DatePicker
        inputFormat="dd/MM/yyyy"
        label={`${label}`}
        value={value}
        onChange={(value) => setValue(value)}
        renderInput={(props) => <TextField variant="standard" {...props} />}
        InputProps={{
          style: {
            borderBottom: `1px solid #1259e6`,
          },
          disableUnderline: true,
        }}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
