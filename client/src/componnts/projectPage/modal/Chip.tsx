import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';

interface Props {
  data: {
    name: string;
    _id: string; 
  }[];
  // onData:Function
}

interface ChipData {
  name: string;
  _id: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5), 
}));

export default function ChipsArray({data}: Props) {

  const [chipData, setChipData] = React.useState<ChipData[]>(data);

  const handleDelete = (chipToDelete: ChipData) => {
    setChipData(chips => 
      chips.filter(chip => chip._id !== chipToDelete._id)
    );
  };
  // onData(chipData)
  return (
    <Paper sx={{ 
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap', 
      listStyle: 'none',
      p: 0.5,
      m: 0
    }}
    component="ul"
    >
      {chipData.map(item => {
        let icon;

        if (item.name === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={item._id}>
            <Chip 
              icon={icon}
              label={item.name}
              onDelete={() => handleDelete(item)} 
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}