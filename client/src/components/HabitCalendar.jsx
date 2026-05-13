function HabitCalendar({ completedDates = [], onToggleDate }) {
  const last14Days = [];

  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    last14Days.push(date);
  }

  const isCompleted = (date) => {
    return completedDates.some((completedDate) => {
      const d = new Date(completedDate);
      d.setHours(0, 0, 0, 0);

      return d.getTime() === date.getTime();
    });
  };

  return (
    <div className="mt-5">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-bold text-slate-700">Completion Calendar</h4>

        <span className="rounded-xl bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
          Last 14 Days
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {last14Days.map((date, index) => {
          const completed = isCompleted(date);

          return (
            <button
              key={index}
              type="button"
              onClick={() => onToggleDate(date)}
              title={date.toDateString()}
              className={`flex h-14 w-14 flex-col items-center justify-center rounded-2xl text-xs font-bold transition hover:scale-110 ${
                completed
                  ? "bg-gradient-to-br from-violet-500 to-pink-400 text-white shadow-lg shadow-purple-200"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              <span>
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span>{date.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HabitCalendar;