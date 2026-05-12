function HabitCard({ habit, onComplete, onDelete }) {
  return (
    <div className="habit-card">
      <h4>{habit.title}</h4>

      <p>{habit.description}</p>

      <p>Frequency: {habit.frequency}</p>

      <p>Current Streak: {habit.streak}</p>

      <p>Longest Streak: {habit.longestStreak}</p>

      <div className="habit-actions">
        <button onClick={() => onComplete(habit._id)}>
          Complete Today
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(habit._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default HabitCard;