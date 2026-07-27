const PRIORITY_WEIGHTS = {
  high: 3,
  medium: 2,
  low: 1
};

export function sortTodosByPriority(todos) {
  return [...todos].sort((a, b) => {
    const weightA = PRIORITY_WEIGHTS[a.priority?.toLowerCase()] || 0;
    const weightB = PRIORITY_WEIGHTS[b.priority?.toLowerCase()] || 0;

    // Descending order: higher weight comes first
    return weightB - weightA;
  });
}

export function getLocalDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays); // Adds offsetDays (e.g., 0 for today, 7 for 7 days ahead)

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`; // "YYYY-MM-DD"
}