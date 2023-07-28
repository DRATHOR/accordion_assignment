import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "../../src/App.css";

export default function BasicAccordion({ item, spanElement, getListOfData ,child}) {
  return (
    <div>
      <Accordion
        sx={{ boxShadow: "none", background: "#1B1B1B", color: "#FDFDFD" }}
      >
        <AccordionSummary
          expandIcon={
            spanElement &&
            spanElement.length > 0 && (
              <ExpandMoreIcon sx={{ color: "#CECECE" }} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            background: "#121212",
            border: "1px solid #2E2E2E",
            borderRadius: "8px",
            paddingLeft:`${child?"40px":"20px"}`
          }}
        >
          <div className="details">
            <div className="details_info">
              <Typography variant="subtitle2">
                {item.req_info.req_method}
                {item.req_info.req_path}
              </Typography>
              <Typography variant="subtitle2" sx={{display:"flex",alignItems:"center"}}>
                {item.source}
                <ArrowForwardIcon fontSize="x-small" sx={{margin:"0px 5px"}} />
                {item.destination}
              </Typography>
            </div>
            <Box>
              <Stack direction="row" spacing={1}>
                {item.req_info.error ? (
                  <Badge
                    color="error"
                    badgeContent=" "
                    variant="dot"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <Chip
                      label={item.req_info.latency}
                      variant="outlined"
                      sx={{
                        color: "#FDFDFD",
                        border: "1px solid #464646",
                        width: "90px",
                        marginRight: `${
                          spanElement && spanElement.length > 0 ? 0 : "20px"
                        }`,
                      }}
                    />
                  </Badge>
                ) : (
                  <Chip
                    label={item.req_info.latency}
                    variant="outlined"
                    sx={{
                      color: "#FDFDFD",
                      border: "1px solid #464646",
                      width: "90px",
                      marginRight: `${
                        spanElement && spanElement.length > 0 ? 0 : "20px"
                      }`,
                    }}
                  />
                )}
              </Stack>
            </Box>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          {spanElement &&
            spanElement.map((item,index) => (
              <BasicAccordion
                key={item.trace_id + "_" + item.span_id + "_" + item.source}
                item={item}
                spanElement={getListOfData(item.span_id)}
                getListOfData={getListOfData}
                child
              />
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
