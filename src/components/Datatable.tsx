import * as React from 'react';
import Button from './Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Popper from '@mui/material/Popper';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { 
     DataGrid,
     GridColDef,
     GridRowModesModel,
     GridRowsProp,
     GridRowModes,
     GridRowId,
     GridToolbarContainer,
     GridRowModel,
     GridSlotProps,
     GridEventListener,
     GridRowEditStopReasons, 
     GridActionsCellItem,
     GridRenderCellParams} from '@mui/x-data-grid';
import {
    randomId
} from '@mui/x-data-grid-generator';


interface GridCellExpandProps {
    value: string;
    width: number;
  }



const initialRows: GridRowsProp = [
    {
        id: randomId(),
        name: 'Iron Man',
        height: "5'9",
        weight: "175lbs",
        strength: "87%",
        ability: "Electrical Body Armor, Super-Genius, World-wide Communications System",
        weakness: "Women, Alcoholism, Technology",
        origin: "Tales of Suspence #39, 1963",
        birthplace: "Manhattan, New York",
    },
    {
        id: randomId(),
        name: 'Super Man',
        height: "6'0",
        weight: "200lbs",
        strength: "90%",
        ability: "X-ray/Heat vision, Regenerative Healing, Flight, Superhuman speed/strength",
        weakness: "Kryptonite",
        origin: "Action Comics, June 1938",
        birthplace: "Smallville, Kansas",
    },
    {
        id: randomId(),
        name: 'Spider Man',
        height: "5'9",
        weight: "167lbs",
        strength: "75%",
        ability: "Webs, Spider-Sense, enhanced strength, wall-crawling, reflexes, endurance",
        weakness: "Aunt May, Tall Buildings, Anti-Venom",
        origin: "The Silver Age of Comic Books, August 1962",
        birthplace: "Queens, New York",
    },
    {
        id: randomId(),
        name: 'Thor',
        height: "6'3",
        weight: "195lbs",
        strength: "95%",
        ability: "Hammer, Weather Manipulation",
        weakness: "Magical Weaponry, High-Level Spells, Brothery Love",
        origin: "Journey into Mystery, August 1962",
        birthplace: "Norway",
    },
    {
        id: randomId(),
        name: 'Wolverine',
        height: "6'3",
        weight: "300lbs",
        strength: "90%",
        ability: "Regenerative Healing, Extrasensory preception, Adamantium Claws, Superhuman speed, Superhuman agility/reflexes",
        weakness: "Magnets, Lack of super strength, water",
        origin: "Marvel Comics, November 2001",
        birthplace: "Alberta, Canada",
    },
]

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
        setRowModesModel: (
            newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
        ) => void;
    }
}

function EditToolbar(props: GridSlotProps['toolbar']) {
    const { setRows, setRowModesModel} = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [
            ...oldRows,
            { id, name: '', height: '', weight: '', strength: '', ability: '', weakness: '', origin: '', birthplace: '', isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: {mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }))
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
            Add Figure
            </Button>
        </GridToolbarContainer>
        );
    }

    export default function FullFeaturedCrudGrid() {
        const [rows, setRows] = React.useState(initialRows);
        const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

        const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
            if (params.reason === GridRowEditStopReasons.rowFocusOut) {
                event.defaultMuiPrevented = true;
            }
        };

        const handleEditClick = (id: GridRowId) => () => {
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        };

        const handleSaveClick = (id: GridRowId) => () => {
            setRowModesModel({ ...setRowModesModel, [id]: { mode: GridRowModes.View } });
        };

        const handleDeleteClick = (id: GridRowId) => () => {
            setRows(rows.filter((row) => row.id !== id));
        };

        const handleCancelClick = (id: GridRowId) => () => {
          setRowModesModel({
            ...setRowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

const processRowUpdate = (newRow: GridRowModel) => {
  const updatedRow = { ...newRow, isNew: false };
  setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  return updatedRow;
};

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

      
      function isOverflown(element: Element): boolean {
        return (
          element.scrollHeight > element.clientHeight ||
          element.scrollWidth > element.clientWidth
        );
      }
      
      const GridCellExpand = React.memo(function GridCellExpand(
        props: GridCellExpandProps,
      ) {
        const { width, value } = props;
        const wrapper = React.useRef<HTMLDivElement | null>(null);
        const cellDiv = React.useRef(null);
        const cellValue = React.useRef(null);
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const [showFullCell, setShowFullCell] = React.useState(false);
        const [showPopper, setShowPopper] = React.useState(false);
      
        const handleMouseEnter = () => {
          const isCurrentlyOverflown = isOverflown(cellValue.current!);
          setShowPopper(isCurrentlyOverflown);
          setAnchorEl(cellDiv.current);
          setShowFullCell(true);
        };
      
        const handleMouseLeave = () => {
          setShowFullCell(false);
        };
      
        React.useEffect(() => {
          if (!showFullCell) {
            return undefined;
          }
      
          function handleKeyDown(nativeEvent: KeyboardEvent) {
            if (nativeEvent.key === 'Escape') {
              setShowFullCell(false);
            }
          }
      
          document.addEventListener('keydown', handleKeyDown);
      
          return () => {
            document.removeEventListener('keydown', handleKeyDown);
          };
        }, [setShowFullCell, showFullCell]);

    return (
        <Box
          ref={wrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            alignItems: 'center',
            lineHeight: '24px',
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
          }}
        >
          <Box
            ref={cellDiv}
            sx={{
              height: '100%',
              width,
              display: 'block',
              position: 'absolute',
              top: 0,
            }}
          />
          <Box
            ref={cellValue}
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {value}
          </Box>
          {showPopper && (
            <Popper
              open={showFullCell && anchorEl !== null}
              anchorEl={anchorEl}
              style={{ width, marginLeft: -17 }}
            >
              <Paper
                elevation={1}
                style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
              >
                <Typography variant="body2" style={{ padding: 8 }}>
                  {value}
                </Typography>
              </Paper>
            </Popper>
          )}
        </Box>
      );
    });

    function renderCellExpand(params: GridRenderCellParams<any, string>) {
        return (
            <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
        )
    }


    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', headerClassName: 'super-app-theme--header', width: 180, editable: true, renderCell: renderCellExpand },
        { field: 'height', headerName: 'Height', headerClassName: 'super-app-theme--header', width: 80, editable: true, renderCell: renderCellExpand },
        { field: 'weight', headerName: 'Weight', headerClassName: 'super-app-theme--header', width: 80, editable: true, renderCell: renderCellExpand },
        { field: 'strength', headerName: 'Strength', headerClassName: 'super-app-theme--header', width: 80, editable: true, renderCell: renderCellExpand },
        { field: 'ability', headerName: 'Ability', headerClassName: 'super-app-theme--header', width: 180, editable: true, renderCell: renderCellExpand },
        { field: 'weakness', headerName: 'Weakness', headerClassName: 'super-app-theme--header', width: 180, editable: true, renderCell: renderCellExpand },
        { field: 'origin', headerName: 'Origin', headerClassName: 'super-app-theme--header', width: 180, editable: true, renderCell: renderCellExpand },
        { 
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          width: 100,
          headerClassName: 'super-app-theme--header', 
          cellClassName: 'actions',
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    sx={{ color: 'primary.main' }}
                    onClick={handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<CancelIcon />}
                    label='Cancel'
                    onClick={handleCancelClick(id)}
                    color='inherit'
                  />,
                ];
              }

              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className='textPrimary'
                  onClick={handleEditClick(id)}
                  color='inherit'
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color='inherit'
                />,
              ];
            },
        },
    ];



        return (
           <Box sx={{ height: 400, width: "100%", '& .super-app-theme--header': {
            backgroundColor: 'rgba(255, 7, 0, 0.55)',
           }, boxShadow: 3, borderRadius: 5,
            border: 3, borderColor: 'red', }}>
                <DataGrid
                rows={rows} 
                columns={columns} 
                pageSizeOptions={[5]}
                editMode='row'
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{ toolbar: EditToolbar }}
                slotProps={{
                    toolbar: {setRows, setRowModesModel}}}
              />
            </Box>
        );
    }