import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

import {
  calculatePriorityScore,
} from "../utils/priorityUtils";

function PriorityCard({
  notification,
}) {

  const score =
    calculatePriorityScore(
      notification
    );

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
      sx={{
        marginBottom: 2,
        border:
          "2px solid #1976d2",
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

        <Typography
          sx={{ marginTop: 1 }}
          fontWeight="bold"
        >
          Priority Score:
          {" "}
          {score.toFixed(4)}
        </Typography>

      </CardContent>

    </Card>
  );
}

export default PriorityCard;