const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function calculatePriorityScore(
  notification
) {

  const weight =
    weights[notification.Type] || 0;

  const ageInHours =
    (
      Date.now() -
      new Date(
        notification.Timestamp
      ).getTime()
    ) /
    (1000 * 60 * 60);

  const recencyScore =
    1 / (ageInHours + 1);

  return weight + recencyScore;
}

export function getTopNotifications(
  notifications,
  topN = 10
) {

  return [...notifications]
    .sort((a, b) => {

      return (
        calculatePriorityScore(b) -
        calculatePriorityScore(a)
      );
    })
    .slice(0, topN);
}
