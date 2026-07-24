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