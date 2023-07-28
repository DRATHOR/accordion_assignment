import React, { useEffect, useState } from "react";
import BasicAccordion from "../Components/BasicAccordion";
import axios from "axios";
import { Typography, Grid, Box, Container } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Home = () => {
  const [orderData, setOrderData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .get("https://mocki.io/v1/40059489-6a19-4ca7-a41c-1c5c920e312c")
      .then((res) => {
        setOrderData(res?.data?.spans);
        setOrders(res?.data?.spans?.filter((items) => !items.parent_span_id));
        setErrors(res?.data?.spans?.filter((items) => items.req_info.error));
      });
  }, [orderData]);

  const getChildListData = (span_id) => {
    return orderData.filter((elements) => span_id === elements.parent_span_id);
  };
  const getListOfData = (trace_id, span_id) => {
    return orderData.filter(
      (elements) =>
        trace_id === elements.trace_id && span_id === elements.parent_span_id
    );
  };
  return (
    <Box p={3} sx={{ background: "#1B1B1B", color: "#FDFDFD" }}>
      {orders?.map((item, index) => {
        return (
          <React.Fragment>
            <Box mb={2} key={item.trace_id+"_"+item.span_id}>
              <Box mb={2}>
                <Typography variant="h5" sx={{ marginBottom: "5px" }}>
                  {item.trace_id}
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={`${ orderData.filter(
                        (error_element) =>
                          error_element.trace_id === item.trace_id
                      ).length} Spans`}
                      sx={{
                        background: "#424242",
                        color: "#FDFDFD",
                        padding:"0 5px"
                      }}
                      size="small"
                    />
                    <Chip
                      label={`${
                        errors.filter(
                          (error_element) =>
                            error_element.trace_id === item.trace_id
                        ).length
                      } Error`}
                      color="error"
                      sx={{ padding: "0 5px" }}
                      size="small"
                    />
                  </Stack>
                </Stack>
              </Box>

              <BasicAccordion
                
                item={item}
                spanElement={getListOfData(item.trace_id, item.span_id)}
                getListOfData={getChildListData}
                
              />
            </Box>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default Home;
