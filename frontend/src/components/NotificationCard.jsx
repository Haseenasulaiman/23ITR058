import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

function NotificationCard({
  notification,
  viewed,
  onClick,
}) {

  const getColor = () => {

    switch (notification.Type) {

      case "Placement":
        return "success";

      case "Result":
        return "primary";

      default:
        return "warning";
    }
  };

  return (

    <Card
      onClick={onClick}
      sx={{
        marginBottom: 2,
        cursor: "pointer",
        opacity: viewed ? 0.7 : 1,
        border: viewed
          ? "1px solid #ccc"
          : "2px solid #1976d2",
      }}
    >

      <CardContent>

        <Chip
          label={notification.Type}
          color={getColor()}
          sx={{ marginBottom: 1 }}
        />

        <Typography variant="h6">
          {notification.Message}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {notification.Timestamp}
        </Typography>

      </CardContent>

    </Card>
  );
}

export default NotificationCard;
