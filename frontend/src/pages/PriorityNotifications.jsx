import {
  Container,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";

import FilterBar from "../components/FilterBar";

import PriorityCard from "../components/priorityCard";

import {
  fetchNotifications,
} from "../api/notificationApi";

import {
  getTopNotifications,
} from "../utils/priorityUtils";

import { Log } from "../middleware/logger";

function PriorityNotifications() {

  const [notifications, setNotifications] =
    useState([]);

  const [priorityNotifications,
    setPriorityNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [type, setType] =
    useState("");

  const [topN, setTopN] =
    useState(10);

  async function loadNotifications() {

    try {

      setLoading(true);

      await Log(
        "frontend",
        "info",
        "page",
        "Loading priority notifications"
      );

      const data =
        await fetchNotifications(
          1,
          50,
          type
        );

      setNotifications(data);

      const topNotifications =
        getTopNotifications(
          data,
          topN
        );

      setPriorityNotifications(
        topNotifications
      );

      await Log(
        "frontend",
        "info",
        "utils",
        "Priority notifications calculated"
      );

    } catch (error) {

      await Log(
        "frontend",
        "error",
        "page",
        error.message
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    loadNotifications();

  }, [type, topN]);

  return (

    <>
      <Navbar />

      <Container
        maxWidth="md"
        sx={{ marginTop: 4 }}
      >

        <Typography
          variant="h4"
          gutterBottom
        >
          Priority Inbox
        </Typography>

        <FilterBar
          type={type}
          setType={setType}
        />

        <FormControl
          fullWidth
          sx={{ marginBottom: 3 }}
        >

          <InputLabel>
            Top Notifications
          </InputLabel>

          <Select
            value={topN}
            label="Top Notifications"
            onChange={(e) =>
              setTopN(e.target.value)
            }
          >

            <MenuItem value={5}>
              Top 5
            </MenuItem>

            <MenuItem value={10}>
              Top 10
            </MenuItem>

            <MenuItem value={15}>
              Top 15
            </MenuItem>

            <MenuItem value={20}>
              Top 20
            </MenuItem>

          </Select>

        </FormControl>

        {loading ? (

          <CircularProgress />

        ) : (

          priorityNotifications.map(
            (notification) => (

              <PriorityCard
                key={notification.ID}
                notification={
                  notification
                }
              />
            )
          )
        )}

      </Container>
    </>
  );
}

export default PriorityNotifications;
