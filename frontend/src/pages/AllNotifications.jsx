import {
  Container,
  Typography,
  CircularProgress,
  Pagination,
} from "@mui/material";

import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";

import {
  fetchNotifications,
} from "../api/notificationApi";

import { Log } from "../middleware/logger";

function AllNotifications() {

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [type, setType] =
    useState("");

  const [viewed, setViewed] =
    useState({});

  async function loadNotifications() {

    try {

      setLoading(true);

      await Log(
        "frontend",
        "info",
        "page",
        "Loading all notifications page"
      );

      const data =
        await fetchNotifications(
          page,
          10,
          type
        );

      setNotifications(data);

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
  }, [page, type]);

  function handleViewed(id) {

    setViewed((prev) => ({
      ...prev,
      [id]: true,
    }));
  }

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
          All Notifications
        </Typography>

        <FilterBar
          type={type}
          setType={setType}
        />

        {loading ? (

          <CircularProgress />

        ) : (

          notifications.map((notification) => (

            <NotificationCard
              key={notification.ID}
              notification={notification}
              viewed={
                viewed[notification.ID]
              }
              onClick={() =>
                handleViewed(
                  notification.ID
                )
              }
            />

          ))
        )}

        <Pagination
          count={10}
          page={page}
          onChange={(e, value) =>
            setPage(value)
          }
          sx={{
            marginTop: 4,
            marginBottom: 4,
          }}
        />

      </Container>
    </>
  );
}

export default AllNotifications;
